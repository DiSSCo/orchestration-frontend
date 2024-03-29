/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMappings } from 'redux/mapping/MappingSlice'

/* Import Styles */
import styles from 'components/home/home.module.scss';


const AddSourceSystemForm = () => {
    /* Base variables */
    const mappings = useAppSelector(getMappings);

    return (
        <Row>
            <Col>
                <Row className="mt-2">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Source System Name: </p>
                        <Field name="sourceSystemName"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Endpoint: </p>
                        <Field name="sourceSystemEndpoint"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Description: </p>
                        <Field name="sourceSystemDescription"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Mapping: </p>
                        <Field name="sourceSystemMappingId" as="select"
                            placeholder="Test"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        >
                            <option key={'new'} value="new">
                                Add New Mapping
                            </option>
                            <option key={'choose'} value="" disabled>
                                Choose Mapping
                            </option>

                            {mappings.map((mapping, index) => {
                                const key: string = mapping.name + index;

                                return (
                                    <option key={key} value={mapping.id}
                                        label={mapping.name}
                                    />
                                );
                            })}
                        </Field>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AddSourceSystemForm;