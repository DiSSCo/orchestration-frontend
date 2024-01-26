/* Import Dependencies */
import { Formik, Form, Field, FieldArray } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import InsertMAS from 'api/mas/InsertMAS';
import PatchMAS from 'api/mas/PatchMAS';


/* Props Typing */
interface Props {
    modalToggle: boolean,
    ToggleModal: Function,
    UpdateMachineAnnotationServices: Function
};


const MASModal = (props: Props) => {
    const { modalToggle, ToggleModal, UpdateMachineAnnotationServices } = props;

    /* Base variables */
    const editTarget = useAppSelector(getEditTarget);

    const harmonisedAttributes = { ...HarmonisedAttributes };

    const initialValues = {
        name: editTarget.MAS ? editTarget.MAS.name : '',
        containerImage: editTarget.MAS?.containerImage ? editTarget.MAS.containerImage : '',
        containerTag: editTarget.MAS?.containerTag ? editTarget.MAS.containerTag : '',
        targetDigitalObjectFilters: editTarget.MAS?.targetDigitalObjectFilters ? editTarget.MAS.targetDigitalObjectFilters : {},
        targetDigitalObjectFiltersOptions: "",
        topicName: editTarget.MAS?.topicName ? editTarget.MAS.topicName : '',
        serviceDescription: editTarget.MAS?.serviceDescription ? editTarget.MAS.serviceDescription : '',
        serviceState: editTarget.MAS?.serviceState ? editTarget.MAS.serviceState : '',
        sourceCodeRepository: editTarget.MAS?.sourceCodeRepository ? editTarget.MAS.sourceCodeRepository : '',
        serviceAvailability: editTarget.MAS?.serviceAvailability ? editTarget.MAS.serviceAvailability : '',
        codeMaintainer: editTarget.MAS?.codeMaintainer ? editTarget.MAS.codeMaintainer : '',
        codeLicense: editTarget.MAS?.codeLicense ? editTarget.MAS.codeLicense : '',
        dependencies: editTarget.MAS?.dependencies ? editTarget.MAS.dependencies : [],
        supportContact: editTarget.MAS?.supportContact ? editTarget.MAS.supportContact : '',
        slaDocumentation: editTarget.MAS?.slaDocumentation ? editTarget.MAS.slaDocumentation : '',
        maxReplicas: editTarget.MAS?.maxReplicas ? editTarget.MAS.maxReplicas : 1
    };

    /* Function for submitting the form */
    const SubmitForm = async (form: Dict) => {
        const MASRecord = {
            data: {
                type: "machineAnnotationService",
                attributes: {
                    name: form.name,
                    containerImage: form.containerImage,
                    containerTag: form.containerTag,
                    targetDigitalObjectFilters: form.targetDigitalObjectFilters,
                    topicName: form.topicName,
                    serviceDescription: form.serviceDescription,
                    serviceState: form.serviceState,
                    sourceCodeRepository: form.sourceCodeRepository,
                    serviceAvailability: form.serviceAvailability,
                    codeMaintainer: form.codeMaintainer,
                    codeLicense: form.codeLicense,
                    dependencies: form.dependencies,
                    supportContact: form.supportContact,
                    slaDocumentation: form.slaDocumentation,
                    maxReplicas: form.maxReplicas
                }
            }
        };

        /* If edit target is not empty, patch instead of insert */
        if (editTarget.MAS) {
            PatchMAS(MASRecord, editTarget.MAS.id, KeycloakService.GetToken()).then((MAS) => {
                UpdateMachineAnnotationServices(MAS?.id, MAS);
            }).catch(error => {
                console.warn(error);
            });
        } else {
            InsertMAS(MASRecord, KeycloakService.GetToken()).then((MAS) => {
                UpdateMachineAnnotationServices(MAS?.id, MAS);
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Close MAS Modal */
        ToggleModal();
    }

    return (
        <Modal show={modalToggle} >
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={async (form: any) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    SubmitForm(form);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="h-100">
                        <Row className="h-100">
                            <Col className="h-100">
                                <Modal.Header className="modalHeader pb-0">
                                    <Row className="w-100">
                                        <Col>
                                            <p className="fw-lightBold">
                                                {Object.keys(editTarget).length > 0 ?
                                                    'Edit Machine annotation service' : 'Add new Machine annotation service'
                                                }
                                            </p>
                                        </Col>
                                        <Col className="col-md-auto pe-0">
                                            <FontAwesomeIcon icon={faX}
                                                className="c-pointer"
                                                onClick={() => ToggleModal()}
                                            />
                                        </Col>
                                    </Row>
                                </Modal.Header>
                                <Modal.Body className={`${styles.formModalBody} bg-white`}>
                                    <div className="h-100 d-flex flex-column">
                                        {/* Form Fields */}
                                        <Row className="mb-3 flex-grow-1 overflow-scroll">
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Name: </p>
                                                        <Field name="name" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Container Image: </p>
                                                        <Field name="containerImage" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Container Tag: </p>
                                                        <Field name="containerTag" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <Row>
                                                            <Col>
                                                                <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Target Digital Object Filters: </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mb-2">
                                                            <Col>
                                                                {Object.keys(values.targetDigitalObjectFilters).map((objectFilter) => {
                                                                    const objectFilterValues: [] = values.targetDigitalObjectFilters[
                                                                        objectFilter as keyof typeof values.targetDigitalObjectFilters
                                                                    ];

                                                                    return (
                                                                        <div key={objectFilter} className={`${styles.formFieldArrayOption} px-3 py-2`}>
                                                                            <FieldArray name={`targetDigitalObjectFilters.${objectFilter}`}>
                                                                                {({ push, remove }) => (
                                                                                    <div>
                                                                                        <Row>
                                                                                            <Col>
                                                                                                <p className={`${styles.formFieldArrayOptionTitle} fw-lightBold`}>
                                                                                                    {objectFilter}
                                                                                                </p>
                                                                                            </Col>
                                                                                            <Col className="col-md-auto pe-0">
                                                                                                <button type="button" className={styles.formArrayAddButton}
                                                                                                    onClick={() => push("")}
                                                                                                >
                                                                                                    Add value
                                                                                                </button>
                                                                                            </Col>
                                                                                            <Col className="col-md-auto">
                                                                                                <button type="button"
                                                                                                    className={styles.formArrayRemoveButton}
                                                                                                    onClick={() => {
                                                                                                        const copyObjectFilters = { ...values.targetDigitalObjectFilters };

                                                                                                        delete copyObjectFilters[
                                                                                                            objectFilter as keyof typeof copyObjectFilters
                                                                                                        ];

                                                                                                        setFieldValue('targetDigitalObjectFilters', copyObjectFilters);
                                                                                                    }}
                                                                                                >
                                                                                                    Drop filter
                                                                                                </button>
                                                                                            </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                            <Col>
                                                                                                {
                                                                                                    objectFilterValues.map((_objectFilterValue, index: number) => {
                                                                                                        const key = `${objectFilter}_${index}`;

                                                                                                        return (
                                                                                                            <Row key={key}>
                                                                                                                <Col md={{ span: 9 }} className="pe-0">
                                                                                                                    <Field name={`targetDigitalObjectFilters.${objectFilter}.${index}`}
                                                                                                                        className={`${styles.formField} w-100 mb-2`}
                                                                                                                    />
                                                                                                                </Col>
                                                                                                                <Col>
                                                                                                                    <FontAwesomeIcon icon={faX}
                                                                                                                        onClick={() => remove(index)}
                                                                                                                    />
                                                                                                                </Col>
                                                                                                            </Row>

                                                                                                        );
                                                                                                    })
                                                                                                }
                                                                                            </Col>
                                                                                        </Row>

                                                                                    </div>
                                                                                )}
                                                                            </FieldArray>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Field name="targetDigitalObjectFiltersOptions"
                                                                    as="select"
                                                                >
                                                                    <option value="" disabled={true}> Select a harmonised attribute </option>

                                                                    {Object.keys(harmonisedAttributes).map((filterOption) => {
                                                                        if (!(filterOption in values.targetDigitalObjectFilters)) {
                                                                            return <option key={filterOption} value={filterOption}> {filterOption} </option>
                                                                        }
                                                                    })}
                                                                </Field>
                                                            </Col>
                                                            <Col>
                                                                <button type="button" className={styles.formArrayAddButton}
                                                                    onClick={() => {
                                                                        if (values.targetDigitalObjectFiltersOptions !== "") {
                                                                            /* Add filter to Target Digital Object Filters */
                                                                            setFieldValue('targetDigitalObjectFilters', {
                                                                                ...values.targetDigitalObjectFilters,
                                                                                [values.targetDigitalObjectFiltersOptions]: [""]
                                                                            });
                                                                            /* Set options list value to next attribute in array */
                                                                            setFieldValue('targetDigitalObjectFiltersOptions', "");
                                                                        }
                                                                    }}
                                                                >
                                                                    Add filter
                                                                </button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Topic Name: </p>
                                                        <Field name="topicName" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Service Description: </p>
                                                        <Field name="serviceDescription" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Service State: </p>
                                                        <Field name="serviceState" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Source Code Repository: </p>
                                                        <Field name="sourceCodeRepository" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Service Availability: </p>
                                                        <Field name="serviceAvailability" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Code Maintainer: </p>
                                                        <Field name="codeMaintainer" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Code License: </p>
                                                        <Field name="codeLicense" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Dependencies: </p>
                                                        <FieldArray name="dependencies">
                                                            {({ push, remove }) => (
                                                                <>
                                                                    {/* Display all dependencies */}
                                                                    {values.dependencies.map((_dependency: string, index: number) => {
                                                                        const key = `dependency_${index}`;

                                                                        return (
                                                                            <Row key={key} className="pb-2">
                                                                                <Col md={{ span: 9 }} className="pe-1">
                                                                                    <Field name={`dependencies.${index}`}
                                                                                        className={`${styles.formField} w-100`}
                                                                                    />
                                                                                </Col>
                                                                                <Col>
                                                                                    <FontAwesomeIcon icon={faX}
                                                                                        onClick={() => remove(index)}
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                        );
                                                                    })}

                                                                    {/* Button to add a new dependency */}
                                                                    <Row className="mt-2">
                                                                        <Col>
                                                                            <button type="button"
                                                                                className={styles.formArrayAddButton}
                                                                                onClick={() => {
                                                                                    if (values.dependencies.at(-1) || values.dependencies.length === 0) {
                                                                                        push("");
                                                                                    }
                                                                                }}
                                                                            >
                                                                                Add dependency
                                                                            </button>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            )}
                                                        </FieldArray>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Support Contact: </p>
                                                        <Field name="supportContact" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> SLA Documentation: </p>
                                                        <Field name="slaDocumentation" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                                <Row className="mt-3">
                                                    <Col>
                                                        <p className={`${styles.formFieldTitle} mb-1 fw-lightBold`}> Max Replicas: </p>
                                                        <Field name="maxReplicas" type="number" className={`${styles.formField} w-75`} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {/* Action Buttons */}
                                        <Row>
                                            <Col>
                                                <button type="submit"
                                                    className="primaryButton px-3 py-1"
                                                >
                                                    Save
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Modal.Body>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default MASModal;