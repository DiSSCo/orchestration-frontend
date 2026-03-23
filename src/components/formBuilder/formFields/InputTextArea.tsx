/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean
};


const InputTextArea = (props: Props) => {
    const { name, visibleName, required } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1">
                    {MakeJsonPathReadableString(visibleName)}
                    {":"}
                    {required && <span className="text-danger"> * </span>}
                </p>
                <Field name={name}
                    as="textarea"
                    rows="4"
                    className="w-100 formField textArea"
                />
            </Col>
        </Row>
    );
}

export default InputTextArea;