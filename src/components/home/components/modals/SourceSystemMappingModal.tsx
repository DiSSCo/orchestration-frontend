/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getEditTarget, setEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import AddSourceSystemForm from '../forms/AddSourceSystemForm';
import AddMappingMetaForm from '../forms/AddMappingMetaForm';
import AddMappingForm from '../forms/AddMappingForm';

/* Import API */
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import PatchSourceSystem from 'api/sourceSystem/PatchSourceSystem';
import InsertMapping from 'api/mapping/InsertMapping';
import PatchMapping from 'api/mapping/PatchMapping';


/* Props Typing */
interface Props {
    modalToggle: boolean,
    chosenTab: string,
    ToggleModal: Function,
    UpdateSourceSystems: Function,
    UpdateMappings: Function
};


const SourceSystemMappingModal = (props: Props) => {
    const { modalToggle, chosenTab,
        ToggleModal, UpdateSourceSystems, UpdateMappings } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const editTarget = useAppSelector(getEditTarget);

    /* Function for setting base data standard */
    const [baseStandard, setBaseStandard] = useState<string>('');

    /* Function for destructuring mapping if Edit Target is present */
    const [editMappings, setEditMappings] = useState<Dict>({});

    useEffect(() => {
        if (editTarget?.mapping) {
            /* Destructure Mapping */
            const reformatMappings: Dict = {
                defaults: [],
                mapping: []
            };

            if (editTarget.mapping.fieldMapping.defaults) {
                editTarget.mapping.fieldMapping.defaults.forEach((fieldMapping: Dict) => {
                    reformatMappings.defaults.push({
                        field: Object.keys(fieldMapping)[0],
                        value: Object.values(fieldMapping)[0]
                    });
                })
            }
            if (editTarget.mapping.fieldMapping.mapping) {
                editTarget.mapping.fieldMapping.mapping.forEach((fieldMapping: Dict) => {
                    reformatMappings.mapping.push({
                        field: Object.keys(fieldMapping)[0],
                        value: Object.values(fieldMapping)[0]
                    });
                })
            }

            setEditMappings(reformatMappings);

            /* Enable Mapping to be edited by setting base standard */
            setBaseStandard(editTarget.mapping.sourceDataStandard);
        }
    }, [editTarget]);

    /* Function for toggling a secondary form, for adding a new Mapping when adding a new Source System */
    const [secondaryForm, setSecondaryForm] = useState<boolean>(false);

    useEffect(() => {
        if (chosenTab === 'Mapping' || (editTarget && Object.keys(editTarget).length > 0)) {
            setSecondaryForm(true);
        } else if (secondaryForm === true) {
            setSecondaryForm(false);
        }
    }, [modalToggle]);

    /* Function for checking the form status */
    const CheckOption = (formField: Dict) => {
        /* Checking if new mapping needs to be added */
        if (formField.target.name === 'sourceSystemMappingId' && formField.target.value === 'new') {
            setSecondaryForm(formField.target.value);
        } else if (formField.target.name === 'sourceSystemMappingId' && secondaryForm) {
            setSecondaryForm(false);
        }
    }

    /* Function for submitting the form */
    const SubmitForm = async (form: Dict) => {
        /* First, check if new mapping needs to be added */
        if (form.sourceSystemMappingId === 'new' || chosenTab === 'Mapping' || editTarget?.mapping) {
            const UpdateForm = (mappingId: string) => {
                form.sourceSystemMappingId = mappingId;
            }

            await SubmitMapping(form, (mappingId: string) => UpdateForm(mappingId));
        }

        /* Check if new Source System needs to be added */
        if (chosenTab === 'Source System') {
            SubmitSourceSystem(form);
        }

        /* Close Form Modal */
        ToggleModal();
    }

    /* Function for inserting or patching a Source System */
    const SubmitSourceSystem = (form: Dict) => {
        const sourceSystemRecord = {
            data: {
                type: 'sourceSystem',
                attributes: {
                    name: form.sourceSystemName,
                    endpoint: form.sourceSystemEndpoint,
                    description: form.sourceSystemDescription,
                    mappingId: form.sourceSystemMappingId
                }
            }
        }

        /* If edit target is not empty, patch instead of insert */
        if (editTarget?.sourceSystem) {
            PatchSourceSystem(sourceSystemRecord, editTarget?.sourceSystem.id, KeycloakService.GetToken()).then((sourceSystem) => {
                UpdateSourceSystems(sourceSystem?.id, sourceSystem);
            });
        } else {
            InsertSourceSystem(sourceSystemRecord, KeycloakService.GetToken()).then((sourceSystem) => {
                UpdateSourceSystems(sourceSystem?.id, sourceSystem);
            });
        }
    }

    /* Function for inserting or patching a Mapping */
    const SubmitMapping = async (form: Dict, UpdateForm: Function) => {
        const fieldMapping: Dict[] = [];

        form.mappingFieldMapping.forEach((mapping: Dict) => {
            if (mapping.field) {
                fieldMapping.push({ [mapping.field]: mapping.value });
            }
        });

        const defaults: Dict[] = [];

        form.mappingDefaults.forEach((mapping: Dict) => {
            if (mapping.field) {
                defaults.push({ [mapping.field]: mapping.value });
            }
        });

        const mappingRecord = {
            data: {
                type: "mapping",
                attributes: {
                    name: form.mappingName,
                    description: form.mappingDescription,
                    sourceDataStandard: form.sourceDataStandard,
                    fieldMapping: {
                        mapping: fieldMapping,
                        defaults: defaults
                    }
                }
            }
        }

        /* If edit target is not empty, patch instead of insert */
        if (editTarget?.mapping) {
            await PatchMapping(mappingRecord, editTarget.mapping.id, KeycloakService.GetToken()).then((mapping) => {
                UpdateMappings(mapping?.id, mapping);
            }).catch(error => {
                console.warn(error);
            });
        } else {
            await InsertMapping(mappingRecord, KeycloakService.GetToken()).then((mapping) => {
                if (mapping) {
                    UpdateForm(mapping.id);
                }

                UpdateMappings(mapping?.id, mapping);
            }).catch(error => {
                console.warn(error);
            });
        }
    }

    /* Function for closing the form modal */
    const CloseModal = () => {
        /* Close modal */
        ToggleModal();

        /* Disable secondary form */
        setSecondaryForm(false);

        /* Reset base standard */
        setBaseStandard('');

        /* If edit target is set, reset */
        if (editTarget && Object.keys(editTarget).length > 0) {
            setEditMappings({});
            dispatch(setEditTarget({}));
        }
    }

    return (
        <Modal show={modalToggle} size="xl" className={styles.formModal}>
            <Formik
                initialValues={{
                    sourceSystemName: editTarget?.sourceSystem ? editTarget.sourceSystem.name : '',
                    sourceSystemEndpoint: editTarget?.sourceSystem ? editTarget.sourceSystem.endpoint : '',
                    sourceSystemDescription: editTarget?.sourceSystem ? editTarget.sourceSystem.description : '',
                    sourceSystemMappingId: editTarget?.sourceSystem ? editTarget.sourceSystem.mappingId : '',
                    sourceDataStandard: editTarget?.mapping ? editTarget.mapping.sourceDataStandard : '',
                    mappingName: editTarget?.mapping ? editTarget.mapping.name : '',
                    mappingDescription: editTarget?.mapping ? editTarget.mapping.description : '',
                    mappingDefaults: editMappings?.defaults ? editMappings.defaults : [{
                        field: '',
                        value: '',
                        key: 0
                    }],
                    mappingFieldMapping: editMappings?.mapping ? editMappings.mapping : [{
                        field: '',
                        value: '',
                        key: 0
                    }]
                }}
                enableReinitialize={true}
                onSubmit={async (form: any) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    SubmitForm(form);
                }}
            >
                {({ values }) => (
                    <Form className="h-100" onChange={(formField) => CheckOption(formField)}>
                        <Row className="h-100 justify-content-center">
                            <Col md={{ span: 5 }} className="h-100">
                                <Modal.Header className="modalHeader pb-0">
                                    <Row className="w-100">
                                        <Col>
                                            <p className="fw-lightBold">
                                                {editTarget && Object.keys(editTarget).length > 0 ?
                                                    'Edit Machine annotation service' : 'Add new Machine annotation service'
                                                }
                                            </p>
                                        </Col>
                                        <Col className="col-md-auto pe-0">
                                            <FontAwesomeIcon icon={faX}
                                                className="c-pointer"
                                                onClick={() => CloseModal()}
                                            />
                                        </Col>
                                    </Row>
                                </Modal.Header>

                                <Modal.Body className={`${styles.formModalBody} bg-white`}>
                                    {(chosenTab === 'Source System') ?
                                        <>
                                            <AddSourceSystemForm />
                                            {secondaryForm &&
                                                <div className={`${styles.secondaryForm} px-3 pb-3 mt-3`}>
                                                    <AddMappingMetaForm SetBaseStandard={() => setBaseStandard(values.sourceDataStandard)} />
                                                </div>
                                            }
                                        </>
                                        : <AddMappingMetaForm SetBaseStandard={() => setBaseStandard(values.sourceDataStandard)} />
                                    }

                                    <Row className="mt-4">
                                        <Col>
                                            <button type="submit" className="primaryButton px-3 py-1">
                                                Save
                                            </button>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Col>

                            {secondaryForm &&
                                <Col md={{ span: 6 }} className="h-100 mt-1">
                                    <Modal.Body className={`${styles.formModalBody} ${styles.secondary} bg-white`}>
                                        <AddMappingForm formValues={values} baseStandard={baseStandard} />
                                    </Modal.Body>
                                </Col>
                            }
                        </Row>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default SourceSystemMappingModal;