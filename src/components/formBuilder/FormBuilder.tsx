/* Import Dependencies */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getEditTarget } from 'redux/edit/EditSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import Header from 'components/Header/Header';
import SourceSystemForm from 'components/sourceSystem/components/SourceSystemForm';
import MappingMetaForm from 'components/mapping/components/MappingMetaForm';
import InputField from './formFields/InputField';
import InputTextArea from './formFields/InputTextArea';


const FormBuilder = () => {
    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const editTarget = useAppSelector(getEditTarget);
    const [formPage, setFormPage] = useState<number>(1);
    const formTemplates: JSX.Element[] = [];
    let initialValues: Dict = {};

    /* Function to determine the form field by type */
    const DetermineFormField = (fieldName: string, fieldType: string) => {
        switch (fieldType) {
            case 'text':
                return <InputField name={fieldName} />
            case 'textarea':
                return <InputTextArea name={fieldName} />
        }
    }

    /* Define form template based upon location */
    if (location.pathname.includes('sourceSystem')) {
        {
            /* Generate form for Source System */
            const { formFields, initialValuesFields } = SourceSystemForm(DetermineFormField);

            /* Push to form template */
            formTemplates.push(
                <Card key="formTemplate_sourceSystem" className="h-100 d-flex flex-column px-4 py-3">
                    <p className="fs-2 fw-lightBold"> Source System </p>

                    <Row className="flex-grow-1">
                        <Col>
                            {formFields}
                        </Col>
                    </Row>

                    {formPage === 1 &&
                        <button type="button"
                            className="primaryButton w-25"
                            onClick={() => setFormPage(2)}
                        >
                            Next
                        </button>
                    }
                </Card>
            );

            /* Set initial values */
            initialValues = { ...initialValues, ...initialValuesFields };
        } {
            /* Generate form for Mapping */
            const { formFields, initialValuesFields } = MappingMetaForm(DetermineFormField);

            formTemplates.push(
                <Card key="formTemplate_sourceSystem" className="h-100 d-flex flex-column px-4 py-3">
                    <p className="fs-2 fw-lightBold"> Source System </p>

                    <Row className="flex-grow-1">
                        <Col>
                            {formFields}
                        </Col>
                    </Row>

                    {formPage === 1 &&
                        <button type="button"
                            className="primaryButton w-25"
                            onClick={() => setFormPage(2)}
                        >
                            Next
                        </button>
                    }
                </Card>
            );
        }
    }

    if (location.pathname.includes('mapping')) {

    }

    if (location.pathname.includes('MAS')) {
        // formTemplates.push('MAS');
    }

    return (
        <div className="h-100 d-flex flex-column overflow-hidden">
            <Header />

            <Container className="flex-grow-1 py-5">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={async (form: any) => {
                        await new Promise((resolve) => setTimeout(resolve, 100));

                        // SubmitForm(form);
                    }}
                >
                    <Form className="h-100">
                        <Row className="h-100">
                            {formTemplates.map((formTemplate, index) => {
                                const key = `formTemplate_${index}`;

                                if (index === 0) {
                                    return (
                                        <Col key={key} lg={{ span: 4 }}>
                                            {formTemplate}
                                        </Col>
                                    );
                                } else {
                                    return (
                                        <Col key={key} lg={{ span: 8 }}>
                                            {formTemplate}
                                        </Col>
                                    );
                                }
                            })}
                        </Row>
                    </Form>
                </Formik>
            </Container>
        </div>
    );
}

export default FormBuilder;