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
    formValues?: Dict,
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean
}

const EnvironmentalVariablesField = (props: Props) => {
    const { name, visibleName, formValues, required } = props;

    /** Formik hook that gives access to the helper functions, in order to control the state and the validation of the form. */
    const { validateForm } = useFormikContext();

    /* Values are stored as an array of objects. If the form contains no values, it falls back to an empty array */
    const values: Dict[] = formValues?.[name] ?? [];

    /* Re validate the form whenever a row is added or removed */
    useEffect(() => {
        validateForm();
    }, [formValues?.[name]?.length]);

    const handleRemoveRow = (index: number, remove: (index: number) => void) => {
        remove(index);
    };

    const validateRequiredField = (fieldValue: string) => {
        if (!fieldValue || fieldValue.trim() === '') {
            return 'Required';
        }
    };

    const rowFields = [
        {
            fieldName: 'schema:name',
            placeholder: 'Variable name'
        },
        {
            fieldName: 'schema:value',
            placeholder: 'Value'
        }
    ];

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1">
                    {`${MakeJsonPathReadableString(visibleName)}:`}
                    {required && <span className="text-danger"> *</span>}
                </p>

                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {values.map((_, index) => {
                                const key = `event_${index}`;
                                return (
                                    <Row key={key} className="py-1">
                                        {rowFields.map((field) => (
                                            <Col key={field.fieldName}>
                                                <Field
                                                    name={`${name}.${index}.${field.fieldName}`}
                                                    className="w-100 formField"
                                                    placeholder={field.placeholder}
                                                    validate={validateRequiredField}
                                                />
                                                <ErrorMessage name={`${name}.${index}.${field.fieldName}`}>
                                                    {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                                </ErrorMessage>
                                            </Col>
                                        ))}

                                        <Col className="col-md-auto d-flex align-items-center">
                                            <button type="button"
                                                className="button-no-style"
                                                onClick={() => handleRemoveRow(index, remove)}
                                            >
                                                <FontAwesomeIcon icon={faX} className="fs-3" />
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            })}

                            {/* Button for adding additional values */}
                            {formValues &&
                                <button type="button"
                                    className="w-100 mt-2"
                                    onClick={() => push({
                                        "schema:name": "",
                                        "schema:value": ""
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