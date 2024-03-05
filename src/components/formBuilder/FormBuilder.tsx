/* Import Dependencies */
import { useEffect, useState, cloneElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getEditTarget, setEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { EditTarget, Dict } from 'app/Types';

/* Import Utilities */
import { SubmitSourceSystem, SubmitMapping, SubmitMAS } from './SubmitFunctions';
import { DefineEditTarget } from 'app/Utilities/FormBuilderUtilities';

/* Import Components */
import Header from 'components/Header/Header';
import SourceSystemForm from 'components/sourceSystem/components/SourceSystemForm';
import MappingForm from 'components/mapping/components/MappingForm';
import MASForm from 'components/MAS/components/MASForm';
import FormBase from './FormBase';
import InputField from './formFields/InputField';
import InputTextArea from './formFields/InputTextArea';
import SelectField from './formFields/SelectField';
import ArrayField from './formFields/ArrayField';
import MappingSelect from './formFields/MappingSelect';
import MappingField from './formFields/MappingField';
import MASFiltersField from './formFields/MASFiltersField';


/* Function to determine the form field by type */
const DetermineFormField = (fieldName: string, visibleName: string, fieldType: string, options?: { name: string, label: string }[]) => {
    switch (fieldType) {
        case 'text':
            return <InputField name={fieldName} visibleName={visibleName} />;
        case 'textarea':
            return <InputTextArea name={fieldName} visibleName={visibleName} />;
        case 'number':
            return <InputField name={fieldName} visibleName={visibleName} />
        case 'select':
            return <SelectField name={fieldName} options={options} visibleName={visibleName} />;
        case 'array':
            return <ArrayField name={fieldName} visibleName={visibleName} />
        case 'mappingSelect':
            return <MappingSelect />;
        case 'mapping':
            return <MappingField name={fieldName} visibleName={visibleName} />;
        case 'MASFilters':
            return <MASFiltersField name={fieldName} visibleName={visibleName} />;
        default:
            return;
    }
}


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

    if ((location.pathname.includes('sourceSystem') && !editTarget?.sourceSystem)) {
        numberOfFormPages = 4;
    } else if (location.pathname.includes('mapping')) {
        numberOfFormPages = 3;
    }

    /* Define form template based upon location */
    if (location.pathname.includes('sourceSystem')) {
        /* Generate form page for Source System */
        const { formFields, initialValuesFields } = SourceSystemForm(DetermineFormField, editTarget?.sourceSystem);

        /* Push to form template */
        formTemplates.push(
            <FormBase title="Source System"
                formFields={formFields}
                numberOfFormPages={numberOfFormPages}
                currentPage={1}
                NextPage={(numberOfFormPages > 1) ? () => setFormPage(1) : undefined}
            />
        );

        /* Set initial values */
        initialValues = { ...initialValues, ...initialValuesFields };
    }

    if (location.pathname.includes('mapping') || (location.pathname.includes('sourceSystem') && !editTarget?.mapping)) {
        /* Generate form pages for Mapping */
        const { formFieldsPages, initialValuesFields } = MappingForm(DetermineFormField, editTarget?.mapping);
        const tabNames = ['Mapping', 'Default Mapping', 'Field Mapping'];

        formFieldsPages.forEach((formFields, index) => {
            const currentPage = numberOfFormPages === 4 ? index + 2 : index + 1;

            formTemplates.push(
                <FormBase title={tabNames[index]}
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

    if (location.pathname.includes('MAS')) {
        /* Generate form page for MAS */
        const { formFields, initialValuesFields } = MASForm(DetermineFormField, editTarget?.MAS);

        /* Push to form template */
        formTemplates.push(
            <FormBase title="Machine Annotation Service"
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
        if (form.mappingId === 'new' || (!isEmpty(editTarget) && editTarget.mapping?.id)) {
            await SubmitMapping(form, editTarget as EditTarget).then((mapping) => {
                form.mappingId = mapping?.id;

                /* If editing a Mapping, return to mapping detail page */
                if (mapping && editTarget?.mapping?.id) {
                    navigate(`/mapping/${mapping?.id}`);
                }
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Submit Source System */
        if (location.pathname.includes('sourceSystem')) {
            await SubmitSourceSystem(form, editTarget as EditTarget).then((sourceSystem) => {
                /* On finish: navigate to detail page of Source System */
                if (sourceSystem) {
                    navigate(`/sourceSystem/${sourceSystem.id}`);
                }
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Submit MAS */
        if (location.pathname.includes('MAS')) {
            await SubmitMAS(form, editTarget as EditTarget).then((MAS) => {
                /* On finish: navigate to detail page of MAS */
                if (MAS) {
                    navigate(`/MAS/${MAS.id}`);
                }
            });
        }
    }

    /* ClassNames */
    const classTabList = classNames({
        'tabsList p-0': true
    });

    const ClassTab = (tab: string, mappingId: string) => {
        if ((tab !== 'Source System' && mappingId !== 'new' && !location.pathname.includes('mapping') && !location.pathname.includes('MAS'))) {
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
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (form: any) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        SubmitForm(form);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form className="h-100">
                                <Row className="h-100">
                                    <Col lg={{ span: 6, offset: 3 }} className="h-100">
                                        <Tabs className="h-100 d-flex flex-column"
                                            selectedIndex={formPage}
                                            onSelect={() => { }}
                                        >
                                            <TabList className={classTabList}>
                                                {formTemplates.map((formTemplate) => (
                                                    <Tab key={formTemplate.props.title}
                                                        className={ClassTab(formTemplate.props.title, values.mappingId ?? '')}
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
                                                            SetFieldValue: (field: string, value: string) => setFieldValue(field, value)
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
}

export default FormBuilder;