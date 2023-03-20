/* Import Dependencies */
import { Field, FieldArray } from 'formik';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styling */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';


/* Props Typing */
interface Props {
    formValues: Dict,
    baseStandard: string
};


const AddMappingForm = (props: Props) => {
    const { formValues, baseStandard } = props;

    /* Base variables */
    const originalHarmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);
    const harmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);

    /* Check which harmonised properties still may be used to map */
    (formValues.mappingFieldMapping.concat(formValues.mappingDefaults)).forEach((mapping: Dict) => {
        /* Remove mapping property from Harmonised Attributes */
        if (mapping.field) {
            delete harmonisedAttributes[mapping.field];
        }
    });

    /* ClassName for cover divs */
    const classCoverDiv = classNames({
        [`${styles.mappingConstructionCoverDiv}`]: true,
        'd-none': baseStandard
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row>
                    <Col>
                        <h6> Construct Mapping </h6>
                    </Col>
                </Row>

                <Row style={{ height: '90%' }}>
                    <Col className="h-100">
                        <Row className="mt-3 h-50">
                            <Col className="h-100">
                                <div className={`${styles.mappingConstructBlock} px-3 py-3 h-100 position-relative`}>
                                    <div className={`${classCoverDiv} position-absolute h-100 w-100 top-0 start-0`} />

                                    <p className="mb-1"> Default Values: </p>

                                    <FieldArray name="mappingDefaults">
                                        {({ push, remove }) => (
                                            <>
                                                {formValues.mappingDefaults.map((value: Dict, index: number) => {
                                                    const localAttributes = { ...harmonisedAttributes };

                                                    if (value.field) {
                                                        localAttributes[value.field] = originalHarmonisedAttributes[value.field];
                                                    }

                                                    return (
                                                        <Row key={value.field} className="py-1">
                                                            <Col>
                                                                <Row>
                                                                    <Col md={{ span: 6 }}>
                                                                        <Field name={`mappingDefaults.${index}.field`}
                                                                            as="select" className="w-100"
                                                                        >
                                                                            <option value="" label="Harmonised property" disabled />

                                                                            {Object.keys(localAttributes).map((property) => {
                                                                                const propertyData = localAttributes[property];

                                                                                return (
                                                                                    <option value={property} label={propertyData.displayName} />
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                    </Col>
                                                                    <Col md={{ span: 6 }}>
                                                                        <Field name={`mappingDefaults.${index}.value`}
                                                                            className="w-100"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className="col-md-auto">
                                                                <FontAwesomeIcon icon={faX}
                                                                    onClick={() => remove(index)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}

                                                <button type="button" onClick={() => push({
                                                    field: '', value: ''
                                                })}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3 h-50">
                            <Col className="h-100">
                                <div className={`${styles.mappingConstructBlock} px-3 py-3 h-100 position-relative`}>
                                    <div className={`${classCoverDiv} position-absolute h-100 w-100 top-0 start-0`} />

                                    <p className="mb-1"> Field Mapping: </p>

                                    <FieldArray name="mappingFieldMapping">
                                        {({ push, remove }) => (
                                            <>
                                                {formValues.mappingFieldMapping.map((value: Dict, index: number) => {
                                                    const localAttributes = { ...harmonisedAttributes };

                                                    if (value.field) {
                                                        localAttributes[value.field] = originalHarmonisedAttributes[value.field];
                                                    }

                                                    return (
                                                        <Row key={value.field} className="py-1">
                                                            <Col>
                                                                <Row>
                                                                    <Col md={{ span: 6 }}>
                                                                        <Field name={`mappingFieldMapping.${index}.field`}
                                                                            as="select" className="w-100"
                                                                        >
                                                                            <option value="" label="Harmonised property" disabled />

                                                                            {Object.keys(localAttributes).map((property) => {
                                                                                const propertyData = localAttributes[property];

                                                                                return (
                                                                                    <option value={property} label={propertyData.displayName} />
                                                                                );
                                                                            })}
                                                                        </Field>
                                                                    </Col>
                                                                    <Col md={{ span: 6 }}>
                                                                        <Field name={`mappingFieldMapping.${index}.value`}
                                                                            className="w-100"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className="col-md-auto">
                                                                <FontAwesomeIcon icon={faX}
                                                                    onClick={() => remove(index)}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}

                                                <button type="button" onClick={() => push({
                                                    field: '', value: ''
                                                })}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AddMappingForm;