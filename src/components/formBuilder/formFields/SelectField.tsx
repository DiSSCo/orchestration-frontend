/* Import Dependencies */
import { Field } from "formik"
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { ParseString } from "app/Utilities";


/* Props Typing */
interface Props {
    name: string,
    options: {
        name: string,
        label: string
    }[]
}


const SelectField = (props: Props) => {
    const { name, options } = props;

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${ParseString(name)}:`} </p>
                <Field name={name} as="select"
                    className="w-100 formField"
                >
                    <option value="" disabled>
                        Select a Source Data Standard
                    </option>

                    {options.map((option) => (
                        <option value={option.name}>
                            {option.label}
                        </option>
                    ))}
                </Field>
            </Col>
        </Row>
    );
}

export default SelectField;