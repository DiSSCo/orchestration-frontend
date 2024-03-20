/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';

/* Import Utitilies */
import { ParseString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string
};


const BooleanField = (props: Props) => {
    const { name, visibleName } = props;

    return (
        <Row key={name} className="mt-2">
            <Col className="col-lg-auto">
                <p className="ms-1 mb-1"> {`${ParseString(visibleName)}:`} </p>
            </Col>
            <Col>
                <Field name={name}
                    type="checkbox"
                />
            </Col>
        </Row>
    );
}

export default BooleanField;