/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    SetBaseStandard: Function
};


const AddMappingForm = (props: Props) => {
    const { SetBaseStandard } = props;

    return (
        <Row>
            <Col>
                <Row className="mt-2">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Base data standard: </p>
                        <Field name="sourceDataStandard" as="select"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        >
                            <option value="" label="Choose base data standard" disabled />
                            <option value="dwc" label="DarwinCore" />
                            <option value="abcd" label="ABCD" />
                            <option value="abcdefg" label="ABCD-EFG" />
                        </Field>
                    </Col>
                    <Col className="col-md-auto d-flex align-items-end">
                        <button type="button"
                            className={styles.formButton}
                            onClick={() => SetBaseStandard()}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Mapping Name: </p>
                        <Field name="mappingName"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Description: </p>
                        <Field name="mappingDescription"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AddMappingForm;