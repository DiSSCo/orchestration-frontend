/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getDataMappings } from 'redux-store/DataMappingSlice'

/* Import Styles */
import styles from 'components/home/home.module.scss';


const AddSourceSystemForm = () => {
    /* Base variables */
    const dataMappings = useAppSelector(getDataMappings);

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
                        <p className={`${styles.formFieldTitle} ms-1 mb-1`}> Data Mapping: </p>
                        <Field name="sourceSystemMappingId" as="select"
                            placeholder="Test"
                            className={`${styles.formField} py-1 px-2 w-100`}
                        >
                            <option key={'new'} value="new">
                                Add New Data Mapping
                            </option>
                            <option key={'choose'} value="" disabled>
                                Choose Data Mapping
                            </option>

                            {dataMappings.map((dataMapping, index) => {
                                const key: string = `${dataMapping['schema:name']}_${index}`;

                                return (
                                    <option key={key}
                                        value={dataMapping['@id']}
                                        label={dataMapping['schema:name']}
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