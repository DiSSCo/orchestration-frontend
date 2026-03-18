/* Import Dependencies */
import { Field, ErrorMessage } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utitilies */
import { MakeJsonPathReadableString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean
};


const BooleanField = (props: Props) => {
    const { name, visibleName, required } = props;

    return (
        <Row key={name} className="mt-2">
            <Col className="col-lg-auto">
                <p className="ms-1 mb-1">
                    {MakeJsonPathReadableString(visibleName)}
                    {":"}
                    {required && <span className="text-danger"> * </span>}
                </p>
            </Col>
            <Col>
                <Field name={name}
                    type="checkbox"
                />
                <ErrorMessage name={name}>
                    {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                </ErrorMessage>
            </Col>
        </Row>
    );
}

export default BooleanField;