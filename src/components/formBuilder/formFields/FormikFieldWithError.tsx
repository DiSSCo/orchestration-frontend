/* Import Dependencies */
import { Field, ErrorMessage } from 'formik';
import { Col } from 'react-bootstrap';


/* Props Typing */
interface Props {
    name: string,
    placeholder: string
}

const FormikFieldWithError = (props: Props) => {
    const { name, placeholder } = props;

    const validateRequiredField = (fieldValue: string) => {
        if (!fieldValue || fieldValue.trim() === '') {
            return 'Required';
        }
    };

    return (
        <Col>
            <Field
                name={name}
                className="w-100 formField"
                placeholder={placeholder}
                validate={validateRequiredField}
            />
            <ErrorMessage name={name}>
                {(msg) => <div className="text-danger small mt-1">{msg}</div>}
            </ErrorMessage>
        </Col>
    );
}

export default FormikFieldWithError;