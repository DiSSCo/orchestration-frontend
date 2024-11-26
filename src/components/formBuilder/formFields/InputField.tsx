/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utitilies */
import { MakeJsonPathReadableString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string
};


const InputField = (props: Props) => {
    const { name, visibleName } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${MakeJsonPathReadableString(visibleName)}:`} </p>
                <Field name={name}
                    className="w-100 formField"
                />
            </Col>
        </Row>
    );
}

export default InputField;