/* Import Dependencies */
import { cloneElement } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';


/* Props Typing */
interface Props {
    title: string,
    formFields: JSX.Element[],
    formValues?: Dict,
    SetFieldValue?: Function,
    numberOfFormPages?: number,
    currentPage: number,
    NextPage?: Function,
    PreviousPage?: Function
};


const FormBase = (props: Props) => {
    const { title, formFields, formValues, SetFieldValue, numberOfFormPages, currentPage, NextPage, PreviousPage } = props;

    /* Hooks */
    const location = useLocation();

    return (
        <Card className="h-100 d-flex flex-column px-4 py-3 overflow-y-scroll">
            <p className="fs-2 fw-lightBold"> {title} </p>

            <Row className="flex-grow-1">
                <Col>
                    {formFields.map((formField, index) => {
                        const key = `${formField.props.name}_${index}`;

                        return cloneElement(formField, {
                            key,
                            formValues,
                            SetFieldValue: SetFieldValue
                        });
                    })}
                </Col>
            </Row>

            <Row className="mt-3">
                {numberOfFormPages && PreviousPage && (currentPage > 0) &&
                    <Col>
                        <button type="button"
                            className="primaryButton px-3 py-2"
                            onClick={() => PreviousPage?.()}
                        >
                            Previous
                        </button>
                    </Col>
                }
                <Col className="d-flex justify-content-end">
                    {numberOfFormPages && NextPage && ((currentPage) < numberOfFormPages) && ((formValues?.mappingId && formValues.mappingId === 'new') || location.pathname.includes('mapping'))  ?
                        <button type="button"
                            className="primaryButton px-3 py-2"
                            onClick={() => NextPage()}
                        >
                            Next
                        </button>
                        : <button type="submit"
                            className="primaryButton px-3 py-2"
                        >
                            Save
                        </button>
                    }
                </Col>
            </Row>
        </Card>
    );
}

export default FormBase;