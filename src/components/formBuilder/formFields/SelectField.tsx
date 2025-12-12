/* Import Dependencies */
import { Field } from "formik"
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    options?: {
        name: string,
        label: string
    }[],
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean
}


const SelectField = (props: Props) => {
    const { name, visibleName, options, required } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1">
                    {MakeJsonPathReadableString(visibleName)}
                    {":"}
                    {required && <span className="text-danger"> *</span>}
                </p>
                <Field name={name} as="select"
                    className="w-100 formField"
                >
                    <option value="" disabled>
                        Select a {MakeJsonPathReadableString(name)}
                    </option>

                    {options?.map((option, index) => {
                        const key = `${option.name}-${index}`;

                        return (
                            <option key={key} value={option.name}>
                                {option.label}
                            </option>
                        );
                    })}
                </Field>
            </Col>
        </Row>
    );
}

export default SelectField;