/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    SetBaseStandard: Function
};


const AddMappingMetaForm = (props: Props) => {
    const { SetBaseStandard } = props;

    return (
        <Row>
            <Col>
                <Row className="mt-2">
                    <Col>
                        <p className="mb-1"> Base data standard: </p>
                        <Field name="sourceDataStandard" as="select"
                            className="w-100"
                        >
                            <option value="" label="Choose base data standard" disabled />
                            <option value="dwc" label="DarwinCore" />
                            <option value="abcd" label="ABCD" />
                            <option value="abcdefg" label="ABCD-EFG" />
                        </Field>
                    </Col>
                    <Col className="col-md-auto d-flex align-items-end">
                        <button type="button"
                            onClick={() => SetBaseStandard()}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="mb-1"> Mapping Name: </p>
                        <Field name="mappingName"
                            className="w-75"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="mb-1"> Description: </p>
                        <Field name="mappingDescription"
                            className="w-75"
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AddMappingMetaForm;