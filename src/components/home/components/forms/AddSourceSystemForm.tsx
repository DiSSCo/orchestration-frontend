/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/Hooks';
import { getMappings } from 'redux/mapping/MappingSlice'


const AddSourceSystemForm = () => {
    /* Base variables */
    const mappings = useAppSelector(getMappings);

    return (
        <Row>
            <Col>
                <Row className="mt-2">
                    <Col>
                        <p className="mb-1"> Source System Name: </p>
                        <Field name="sourceSystemName"
                            className="w-75"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="mb-1"> Endpoint: </p>
                        <Field name="sourceSystemEndpoint"
                            className="w-75"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="mb-1"> Description: </p>
                        <Field name="sourceSystemDescription"
                            className="w-75"
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p className="mb-1"> Mapping: </p>
                        <Field name="sourceSystemMappingId" as="select"
                            placeholder="Test"
                            className="w-75"
                        >
                            <option value="new">
                                Add New Mapping
                            </option>
                            <option value="" disabled>
                                Choose Mapping
                            </option>

                            {mappings.map((mapping, i) => {
                                return (
                                    <option key={mapping.id} value={mapping.id}
                                        label={mapping.mapping.name}
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