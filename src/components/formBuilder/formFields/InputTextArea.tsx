/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { ParseString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string
};


const InputTextArea = (props: Props) => {
    const { name, visibleName } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${ParseString(visibleName)}:`} </p>
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