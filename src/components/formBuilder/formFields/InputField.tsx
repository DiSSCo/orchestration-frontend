/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utitilies */
import { ParseString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string
};


const InputField = (props: Props) => {
    const { name } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${ParseString(name)}:`} </p>
                <Field name={name}
                    className="w-100 formField"
                />
            </Col>
        </Row>
    );
}

export default InputField;