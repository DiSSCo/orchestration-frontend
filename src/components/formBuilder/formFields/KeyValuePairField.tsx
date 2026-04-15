import { FieldArray, Field, ErrorMessage } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utitlities */
import { MakeJsonPathReadableString } from 'app/Utilities';
import { validateRequiredField, handleRemoveRow } from 'app/Utilities/FormBuilderUtilities';

/* Import hooks */
import { useRevalidateOnAddRemoveRow } from 'hooks/useRevalidateOnAddRemoveRow';


/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    formValues?: Dict,
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean,
    keyValuePair: {
        key: string,
        value: string
    }
}

const KeyValuePairField = (props: Props) => {
    const { name, visibleName, formValues, required, keyValuePair } = props;

    /* Values are stored as an array of objects. If the form contains no values, it falls back to an empty array */
    const values: Dict[] = formValues?.[name] ?? [];

    /* Re validate the form whenever a row is added or removed */
    useRevalidateOnAddRemoveRow(formValues?.[name]?.length);


    return (
        <div className="mt-2">
            <p className="ms-1 mb-1">
                {`${MakeJsonPathReadableString(visibleName)}:`}
                {required && <span className="text-danger"> *</span>}
            </p>
            <FieldArray name={name}>
                {({ push, remove }) => (
                    <>
                        {values.map((pair, index) => {
                            return (
                                <Row key={pair.id} className="py-1">
                                    <Col>
                                        <Field
                                            name={`${name}.${index}.${keyValuePair.key}`}
                                            className="w-100 formField"
                                            placeholder="Variable name"
                                            validate={validateRequiredField}
                                        />
                                        <ErrorMessage name={`${name}.${index}.${keyValuePair.key}`}>
                                            {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                        </ErrorMessage>
                                    </Col>
                                    <Col>
                                        <Field
                                            name={`${name}.${index}.${keyValuePair.value}`}
                                            className="w-100 formField"
                                            placeholder="Value"
                                            validate={validateRequiredField}
                                        />
                                        <ErrorMessage name={`${name}.${index}.${keyValuePair.value}`}>
                                            {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                        </ErrorMessage>
                                    </Col>
                                    <Col className="col-md-auto d-flex align-items-center">
                                        <button
                                            type="button"
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
                            <button
                                type="button"
                                className="w-100 mt-2"
                                onClick={() => push({
                                    id: crypto.randomUUID(),
                                    [keyValuePair.key]: "",
                                    [keyValuePair.value]: ""
                                })}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        }
                    </>
                )}
            </FieldArray>
        </div>
    );
}

export default KeyValuePairField;