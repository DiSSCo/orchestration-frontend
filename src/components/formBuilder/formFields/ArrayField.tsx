/* Import Dependencies */
import { FieldArray, Field } from "formik"
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { ParseString } from "app/Utilities";

/* Import Types */
import { Dict } from "app/Types";

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    formValues?: Dict
};


const ArrayField = (props: Props) => {
    const { name, visibleName, formValues } = props;

    return (
        <Row className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${ParseString(visibleName)}:`} </p>

                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {formValues?.[name].map((_value: string, index: number) => (
                                <Row className={index > 0 ? 'mt-2' : ''}>
                                    <Col>
                                        <Field name={`${name}[${index}]`}
                                            className="formField w-100"
                                        />
                                    </Col>
                                    <Col className="col-lg-auto">
                                        <button type="button"
                                            className="button-no-style"
                                            onClick={() => remove(index)}
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </button>
                                    </Col>
                                </Row>
                            ))}

                            <button type="button"
                                className="primaryButton mt-3 fs-4 px-3 py-1"
                                onClick={() => push("")}
                            >
                                Add record to {visibleName}
                            </button>
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default ArrayField;