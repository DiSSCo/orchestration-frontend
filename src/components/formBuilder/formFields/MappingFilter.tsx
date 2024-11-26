/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { FieldArray, Field } from 'formik';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    name: string,
    objectFilter: string,
    formValues: Dict | undefined,
    objectFilterValues: string[],
    SetFieldValue: Function
};


const MappingFilter = (props: Props) => {
    const { name, objectFilter, formValues, objectFilterValues, SetFieldValue } = props;

    return (
        <FieldArray name={`${name}.${objectFilter}`}>
            {({ push, remove }) => (
                <div className="bgc-grey px-4 py-2">
                    <Row>
                        <Col>
                            <p className="fw-lightBold">
                                {objectFilter}
                            </p>
                        </Col>
                        <Col className="col-md-auto pe-0">
                            <button type="button"
                                className="button-no-style c-secondary"
                                onClick={() => push("")}
                            >
                                Add value
                            </button>
                        </Col>
                        <Col className="col-md-auto">
                            <button type="button"
                                className="button-no-style c-denied"
                                onClick={() => {
                                    const copyObjectFilters = { ...formValues?.['ods:hasTargetDigitalObjectFilter'] };

                                    delete copyObjectFilters[
                                        objectFilter as keyof typeof copyObjectFilters
                                    ];

                                    SetFieldValue?.('ods:hasTargetDigitalObjectFilter', copyObjectFilters);
                                }}
                            >
                                Drop filter
                            </button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                objectFilterValues.map((_objectFilterValue, index: number) => {
                                    const key = `${objectFilter}_${index}`;

                                    return (
                                        <Row key={key}>
                                            <Col md={{ span: 9 }} className="pe-0">
                                                <Field name={`ods:hasTargetDigitalObjectFilter.${objectFilter}.${index}`}
                                                    className="formField w-100 mb-2"
                                                />
                                            </Col>
                                            <Col>
                                                <FontAwesomeIcon icon={faX}
                                                    onClick={() => remove(index)}
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                </div>
            )}
        </FieldArray>
    );
}

export default MappingFilter;