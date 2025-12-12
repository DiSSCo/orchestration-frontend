/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utitilies */
import { MakeJsonPathReadableString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    required?: boolean
};


const InputField = (props: Props) => {
    const { name, visibleName, required } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1">
                    {MakeJsonPathReadableString(visibleName)}
                    {":"}
                    {required && <span className="text-danger"> *</span>}
                </p>
                <Field name={name}
                    className="w-100 formField"
                />
            </Col>
        </Row>
    );
}

export default InputField;