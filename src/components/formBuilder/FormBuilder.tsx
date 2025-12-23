/* Import Dependencies */
import { useEffect, useState, cloneElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, useFormikContext } from 'formik';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getEditTarget, setEditTarget } from 'redux-store/EditSlice';

/* Import Types */
import { EditTarget, Dict } from 'app/Types';

/* Import Utilities */
import { SubmitSourceSystem, SubmitDataMapping, SubmitMas } from './SubmitFunctions';
import { DefineEditTarget } from 'app/Utilities/FormBuilderUtilities';

/* Import Components */
import SourceSystemForm from 'components/sourceSystem/components/SourceSystemForm';
import DataMappingForm from 'components/dataMapping/components/DataMappingForm';
import MasForm from 'components/mas/components/MasForm';
import FormBase from './FormBase';
import InputField from './formFields/InputField';
import InputTextArea from './formFields/InputTextArea';
import BooleanField from './formFields/BooleanField';
import SelectField from './formFields/SelectField';
import ArrayField from './formFields/ArrayField';
import DataMappingSelect from './formFields/DataMappingSelect';
import DataMappingField from './formFields/DataMappingField';
import MasFiltersField from './formFields/MasFiltersField';
import MultiValueTextField from './formFields/MultiValueTextField';
import { Header } from 'components/elements/Elements';


/* Function to determine the form field by type */
const DetermineFormField = (fieldName: string, visibleName: string, fieldType: string, options?: { name: string, label: string }[], required?: boolean) => {
    switch (fieldType) {
        case 'text':
            return <InputField name={fieldName} visibleName={visibleName} required={required} />;
        case 'textarea':
            return <InputTextArea name={fieldName} visibleName={visibleName} />;
        case 'number':
            return <InputField name={fieldName} visibleName={visibleName} required={required} />;
        case 'boolean':
            return <BooleanField name={fieldName} visibleName={visibleName} />;
        case 'select':
            return <SelectField name={fieldName} visibleName={visibleName} options={options} required={required} />;
        case 'array':
            return <ArrayField name={fieldName} visibleName={visibleName} />;
        case 'dataMappingSelect':
            return <DataMappingSelect required={required} />;
        case 'dataMapping':
            return <DataMappingField name={fieldName} visibleName={visibleName} />;
        case 'masFilters':
            return <MasFiltersField name={fieldName} visibleName={visibleName} />;
        case 'multiValueTextField':
            return <MultiValueTextField name={fieldName} visibleName={visibleName} required={required} />;
        default:
            return;
    }
};

/* Function to re-run Formik validation when the form step changes */
const RevalidateOnPageChange = ({ formPage }: { formPage: number }) => {
    const { validateForm } = useFormikContext<any>();

    useEffect(() => {
        validateForm();
    }, [formPage, validateForm]);

    return null;
};

const FormBuilder = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    /* Base variables */
    const editTarget = useAppSelector(getEditTarget);
    const [formPage, setFormPage] = useState<number>(0);
    const formTemplates: JSX.Element[] = [];
    let initialValues: Dict = {};

    /* OnLoad: check if route is edit and edit target is present and valid */
    useEffect(() => {
        if (location.pathname.includes('edit')) {
            const route = location.pathname.split('/', 2)[1];
            const id = `${location.pathname.split('/', 3)[2]}/${location.pathname.split('/', 4)[3]}`;

            if (!editTarget?.[route as keyof typeof editTarget]) {
                /* Set edit target */
                DefineEditTarget(route, id).then((editTarget) => {
                    dispatch(setEditTarget(editTarget));
                }).catch(error => {
                    console.warn(error);
                });
            }
        } else {
            dispatch(setEditTarget(undefined));
        }
    }, []);

    /* Depict number of form pages */
    let numberOfFormPages: number = 1;

    if ((location.pathname.includes('source-system') || editTarget?.sourceSystem)) {
        numberOfFormPages = 4;
    } else if (location.pathname.includes('data-mapping')) {
        numberOfFormPages = 3;
    }

    /* Define form template based upon location */
    if (location.pathname.includes('source-system')) {
        /* Generate form page for Source System */
        const { formFields, initialValuesFields } = SourceSystemForm(DetermineFormField, editTarget?.sourceSystem);

        /* Push to form template */
        formTemplates.push(
            <FormBase key="sourceSystemFormBase"
                title="Source System"
                formFields={formFields}
                numberOfFormPages={numberOfFormPages}
                currentPage={1}
                NextPage={(numberOfFormPages > 1) ? () => setFormPage(1) : undefined}
            />
        );

        /* Set initial values */
        initialValues = { ...initialValues, ...initialValuesFields };
    }

    if (location.pathname.includes('data-mapping') || (location.pathname.includes('source-system') && !editTarget?.dataMapping)) {
        /* Generate form pages for Mapping */
        const { formFieldsPages, initialValuesFields } = DataMappingForm(DetermineFormField, editTarget?.dataMapping);
        const tabNames = ['Data Mapping', 'Default Mapping', 'Field Mapping'];

        formFieldsPages.forEach((formFields, index) => {
            const currentPage = numberOfFormPages === 4 ? index + 2 : index + 1;

            formTemplates.push(
                <FormBase key="dataMappingFormBase"
                    title={tabNames[index]}
                    formFields={formFields}
                    numberOfFormPages={numberOfFormPages}
                    currentPage={currentPage}
                    NextPage={(index + 1 < numberOfFormPages) ? () => setFormPage(numberOfFormPages === 4 ? index + 2 : index + 1) : undefined}
                    PreviousPage={currentPage > 1 ? () => setFormPage(numberOfFormPages === 4 ? index : index - 1) : undefined}
                />
            );
        });

        /* Set initial values */
        initialValues = { ...initialValues, ...initialValuesFields };
    }

    if (location.pathname.includes('mas')) {
        /* Generate form page for MAS */
        const { formFields, initialValuesFields } = MasForm(DetermineFormField, editTarget?.mas);

        /* Push to form template */
        formTemplates.push(
            <FormBase key="masFormBase"
                title="Machine Annotation Service"
                formFields={formFields}
                numberOfFormPages={numberOfFormPages}
                currentPage={1}
            />
        );

        /* Set initial values */
        initialValues = { ...initialValues, ...initialValuesFields };
    }

    /* Function for submitting form */
    const SubmitForm = async (form: Dict) => {
        /* Submit Mapping */
        if (location.pathname.includes('data-mapping') || form.dataMappingId === 'new' || (!isEmpty(editTarget) && editTarget.dataMapping?.['@id'])) {
            await SubmitDataMapping(form, editTarget as EditTarget).then((dataMapping) => {
                form['ods:dataMappingID'] = dataMapping?.['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), '');
                form.dataMappingId = dataMapping?.['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), '');

                /* If editing a Data Mapping, return to data mapping detail page */
                if (dataMapping && (editTarget?.dataMapping?.['@id'] || location.pathname.includes('data-mapping'))) {
                    navigate(`/data-mapping/${dataMapping?.['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`);
                }
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Submit Source System */
        if (location.pathname.includes('source-system')) {
            await SubmitSourceSystem(form, editTarget as EditTarget).then((sourceSystem) => {
                /* On finish: navigate to detail page of Source System */
                if (sourceSystem) {
                    navigate(`/source-system/${sourceSystem['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`);
                }
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Submit MAS */
        if (location.pathname.includes('mas')) {
            await SubmitMas(form, editTarget as EditTarget).then((mas) => {
                /* On finish: navigate to detail page of MAS */
                if (mas) {
                    navigate(`/mas/${mas['@id']?.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`);
                }
            });
        }
    }

    /* ClassNames */
    const classTabList = classNames({
        'tabsList p-0': true
    });

    const ClassTab = (tab: string, dataMappingId: string) => {
        if ((tab !== 'Source System' && dataMappingId !== 'new' && !location.pathname.includes('data-mapping') && !location.pathname.includes('mas')) && !location.pathname.includes('edit')) {
            return classNames({
                'react-tabs__tab tab bgc-disabled': true,
            });
        } else {
            return classNames({
                'react-tabs__tab tab': true,
            });
        }
    }

    const classTabPanel = classNames({
        'react-tabs__tab-panel flex-grow-1 overflow-hidden': true
    });

    return (
        <div className="h-100 d-flex flex-column overflow-hidden">
            <Header />

            <Container className="flex-grow-1 py-5 overflow-y-hidden">
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    /* Trigger validation immediately on mount */
                    validateOnMount
                    /* Validate the required fields and return errors */
                    validate={(values) => {
                        const errors: Dict = {};
                        if (location.pathname.includes('source-system') && formPage === 0) {
                            if (!values.sourceSystemName) {
                                errors.sourceSystemName = 'Required';
                            }
                            if (!values.sourceSystemEndpoint) {
                                errors.sourceSystemEndpoint = 'Required';
                            }
                            if (!values.sourceSystemTranslatorType) {
                                errors.sourceSystemTranslatorType = 'Required';
                            }
                            if (!values.dataMappingId) {
                                errors.dataMappingId = 'Required';
                            }
                        }

                        if (location.pathname.includes('data-mapping') || (location.pathname.includes('source-system') && formPage > 0)) {
                            if (!values.dataMappingName) {
                                errors.dataMappingName = 'Required';
                            }
                            if (!values.dataMappingSourceDataStandard) {
                                errors.dataMappingSourceDataStandard = 'Required';
                            }
                        }

                        return errors;
                    }}

                    onSubmit={async (form: any) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        SubmitForm(form);
                    }}
                >
                    {({ values, setFieldValue, isValid }) => {
                        return (
                            <Form className="h-100">
                                <RevalidateOnPageChange formPage={formPage} />
                                <Row className="h-100">
                                    <Col lg={{ span: 6, offset: 3 }} className="h-100">
                                        <Tabs className="h-100 d-flex flex-column"
                                            selectedIndex={formPage}
                                            onSelect={() => { }}
                                        >
                                            <TabList className={classTabList}>
                                                {formTemplates.map((formTemplate) => (
                                                    <Tab key={formTemplate.props.title}
                                                        className={ClassTab(formTemplate.props.title, values.dataMappingId ?? '')}
                                                        selectedClassName="active"
                                                    >
                                                        {formTemplate.props.title}
                                                    </Tab>
                                                ))}
                                            </TabList>

                                            {formTemplates.map((formTemplate) => {
                                                return (
                                                    <TabPanel key={formTemplate.props.title}
                                                        className={classTabPanel}
                                                    >
                                                        {cloneElement(formTemplate, {
                                                            formValues: values,
                                                            SetFieldValue: (field: string, value: string) => setFieldValue(field, value),
                                                            isValid
                                                        })}
                                                    </TabPanel>
                                                );
                                            })}
                                        </Tabs>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </div>
    );
};

export default FormBuilder;