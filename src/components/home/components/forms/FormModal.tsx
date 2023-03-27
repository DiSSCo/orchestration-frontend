/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import AddSourceSystemForm from './AddSourceSystemForm';
import AddMappingMetaForm from './AddMappingMetaForm';
import AddMappingForm from './AddMappingForm';

/* Import API */
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import InsertMapping from 'api/mapping/InsertMapping';


/* Props Typing */
interface Props {
    modalToggle: boolean,
    chosenTab: string,
    ToggleModal: Function
};


const FormModal = (props: Props) => {
    const { modalToggle, chosenTab, ToggleModal } = props;

    /* Function for toggling a secondary form, for adding a new Mapping when adding a new Source System */
    const [secondaryForm, setSecondaryForm] = useState<boolean>(false);

    useEffect(() => {
        if (chosenTab === 'Mapping') {
            setSecondaryForm(true);
        } else if (secondaryForm === true) {
            setSecondaryForm(false);
        }
    }, [modalToggle]);

    /* Function for setting base data standard */
    const [baseStandard, setBaseStandard] = useState<string>('');

    /* Function for checking form status */
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
        if (form.sourceSystemMappingId === 'new' || chosenTab === 'Mapping') {
            /* Add new mapping */
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
                    type: 'mapping',
                    attributes: {
                        name: form.mappingName,
                        description: form.mappingDescription,
                        mapping: {
                            mapping: fieldMapping,
                            defaults: defaults
                        }
                    }
                }
            }

            await InsertMapping(mappingRecord, KeycloakService.GetToken()).then((mapping) => {
                if (mapping) {
                    form.sourceSystemMappingId = mapping.id;
                }
            });
        }

        /* Check if new Source System needs to be added */
        if (chosenTab === 'Source System') {
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

            InsertSourceSystem(sourceSystemRecord, KeycloakService.GetToken());
        }

        ToggleModal();
    }

    return (
        <Modal show={modalToggle} size="xl" className={styles.formModal}>
            <Formik
                initialValues={{
                    sourceSystemName: '',
                    sourceSystemEndpoint: '',
                    sourceSystemDescription: '',
                    sourceSystemMappingId: '',
                    mappingBaseStandard: '',
                    mappingName: '',
                    mappingDescription: '',
                    mappingDefaults: [{
                        field: '',
                        value: ''
                    }],
                    mappingFieldMapping: [{
                        field: '',
                        value: ''
                    }]
                }}
                onSubmit={async (form: any) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    SubmitForm(form);
                }}
            >
                {({ values }) => (
                    <Form className="h-100" onChange={(formField) => CheckOption(formField)}>
                        <Row className="h-100 justify-content-center">
                            <Col md={{ span: 5 }} className="h-100">
                                <div className="w-100 m-0 p-0 position-relative">
                                    <button type="button"
                                        onClick={() => { ToggleModal(); setSecondaryForm(false); setBaseStandard(''); }}
                                        className={`${styles.formModalHeaderButton} position-absolute px-3 border-0 text-white`}
                                    >
                                        Dismiss
                                    </button>
                                </div>

                                <Modal.Header className={`${styles.formModalHeader} position-relative text-white`}>
                                    <Modal.Title className={styles.formModalHeaderTitle}>
                                        Add new {chosenTab}
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body className={`${styles.formModalBody} bg-white`}>
                                    {(chosenTab === 'Source System') ?
                                        <>
                                            <AddSourceSystemForm />
                                            {secondaryForm &&
                                                <div className="mt-3">
                                                    <AddMappingMetaForm SetBaseStandard={() => setBaseStandard(values.mappingBaseStandard)} />
                                                </div>
                                            }
                                        </>
                                        : <AddMappingMetaForm SetBaseStandard={() => setBaseStandard(values.mappingBaseStandard)} />
                                    }

                                    <Row className="mt-5">
                                        <Col>
                                            <button type="submit" className={`${styles.saveButton} px-3`}>
                                                Save
                                            </button>
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Col>

                            {secondaryForm &&
                                <Col md={{ span: 5 }} className="h-100">
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

export default FormModal;