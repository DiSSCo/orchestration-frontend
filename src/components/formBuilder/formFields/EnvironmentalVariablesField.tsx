/* Import Dependencies */
import { FieldArray, Field, ErrorMessage, useFormikContext } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utitlities */
import { MakeJsonPathReadableString } from 'app/Utilities';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    formValues?: Dict
};


const EnvironmentalVariablesField = (props: Props) => {
    const { name, visibleName, formValues } = props;

    /** Formik hook that gives access to the helper functions, in order to control the state and the validation of the form. */
    const { validateForm } = useFormikContext();

    /* Re validate the form whenever a row is added or removed */
    useEffect(() => {
        validateForm();
    }, [formValues?.[name]?.length]);

    const handleRemoveRow = (index: number, remove: (index: number) => void) => {
        remove(index);
    };

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${MakeJsonPathReadableString(visibleName)}:`}
                    {formValues?.[name]?.length > 0 && <span className="text-danger"> * </span>}
                </p>

                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {formValues?.[name]?.map((value: Dict, index: number) => (
                                <Row key={`${name}-${index}`} className="py-1">
                                    <Col>
                                        <Row>
                                            <Col md={{ span: 6 }}>
                                                <Field name={`${name}.${index}.schema:name`}
                                                    className="formField py-1 px-2 w-100"
                                                    placeholder="Environemntal variable"
                                                    validate={(fieldValue: string) => {
                                                        if (!fieldValue || fieldValue.trim() === '') {
                                                            return 'Required';
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage name={`${name}.${index}.schema:name`}>
                                                    {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                                </ErrorMessage>
                                            </Col>

                                            <Col md={{ span: 6 }}>
                                                <Field name={`${name}.${index}.schema:value`}
                                                    className="formField py-1 px-2 w-100"
                                                    placeholder="Value"
                                                    validate={(fieldValue: string | number | boolean) => {
                                                        if (
                                                            fieldValue === undefined ||
                                                            fieldValue === null ||
                                                            fieldValue === ''
                                                        ) {
                                                            return 'Required';
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage name={`${name}.${index}.schema:value`}>
                                                    {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                                </ErrorMessage>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col className="col-md-auto d-flex align-items-center">
                                        <button type="button"
                                            className="button-no-style"
                                            onClick={() => handleRemoveRow(index, remove)}
                                        >
                                            <FontAwesomeIcon icon={faX}
                                                className="fs-3"
                                            />
                                        </button>
                                    </Col>
                                </Row>
                            ))}

                            {formValues &&
                                <button type="button"
                                    className="w-100 mt-2"
                                    onClick={() => push({
                                        'schema:name': '',
                                        'schema:value': ''
                                    })}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            }
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default EnvironmentalVariablesField;