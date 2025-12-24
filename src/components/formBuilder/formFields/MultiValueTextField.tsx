/* Import Dependencies */
import { FieldArray, Field, ErrorMessage } from "formik";
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { Dict } from "app/Types";

/* Import Utilities */
import { MakeJsonPathReadableString } from "app/Utilities";

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";

/* Props Typing */
interface Props {
    name: string;
    visibleName: string;
    formValues?: Dict;
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean;
}

const MultiValueTextField = (props: Props) => {
    const { name, visibleName, formValues, required } = props;

    /* Values are stored as an object with a unique id */
    const values: { id: string, val: string }[] = formValues?.[name] ?? [];

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
                            {values.map((item, index) => {
                                return (
                                    <Row key={item.id} className="py-1">
                                        <Col>
                                            <Field
                                                name={`${name}.${index}.val`}
                                                className="w-100 formField"
                                            />
                                            <ErrorMessage name={`${name}.${index}.val`}>
                                                {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                            </ErrorMessage>
                                        </Col>

                                        <Col className="col-md-auto d-flex align-items-center">
                                            <button type="button"
                                                className="button-no-style"
                                                onClick={() => remove(index)}
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
                                    onClick={() => push({ id: crypto.randomUUID(), val: '' })}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            }

                            <ErrorMessage name={name}>
                                {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                            </ErrorMessage>
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
};

export default MultiValueTextField;