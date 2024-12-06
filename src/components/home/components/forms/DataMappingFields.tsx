/* Import Dependencies */
import { FieldArray, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styling */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    dataMappingType: string,
    formValues: Dict,
    harmonisedAttributes: Dict,
    originalHarmonisedAttributes: Dict,
    classCoverDiv: string
};


const DataMappingFields = (props: Props) => {
    const { dataMappingType, formValues, harmonisedAttributes, originalHarmonisedAttributes, classCoverDiv } = props;

    return (
        <Row className="h-50 py-2">
            <Col className="h-100">
                <div className={`${styles.mappingConstructBlock} px-3 py-3 h-100 position-relative`}>
                    <div className={`${classCoverDiv} position-absolute h-100 w-100 top-0 start-0
                        d-flex justify-content-center align-items-center`}>
                        Set a base data standard to continue
                    </div>

                    <p className={`${styles.mappingTitle} ms-1 mb-1`}> {dataMappingType}: </p>

                    <FieldArray name={`dataMapping${dataMappingType}`}>
                        {({ push, remove }) => (
                            <>
                                {formValues[`dataMapping${dataMappingType}`].map((value: Dict, index: number) => {
                                    const localAttributes = { ...harmonisedAttributes };

                                    if (value.field) {
                                        localAttributes[value.field] = originalHarmonisedAttributes[value.field];
                                    }

                                    return (
                                        <Row key={value.key} className="py-1">
                                            <Col>
                                                <Row>
                                                    <Col md={{ span: 6 }}>
                                                        <Field name={`dataMapping${dataMappingType}.${index}.field`}
                                                            as="select" className={`${styles.formField} py-1 px-2 w-100 h-100`}
                                                        >
                                                            <option value="" label="Harmonised property" disabled />

                                                            {Object.keys(localAttributes).map((property) => {
                                                                const propertyData = localAttributes[property];

                                                                return (
                                                                    <option
                                                                        key={property}
                                                                        value={property}
                                                                        label={propertyData.displayName}
                                                                    />
                                                                );
                                                            })}
                                                        </Field>
                                                    </Col>
                                                    <Col md={{ span: 6 }}>
                                                        <Field name={`dataMapping${dataMappingType}.${index}.value`}
                                                            className={`${styles.formField} py-1 px-2 w-100`}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="col-md-auto d-flex align-items-center">
                                                <FontAwesomeIcon icon={faX}
                                                    className={styles.removeMappingIcon}
                                                    onClick={() => remove(index)}
                                                />
                                            </Col>
                                        </Row>
                                    );
                                })}

                                <button type="button"
                                    className={`${styles.addMappingButton} w-100 mt-2`}
                                    onClick={() => push({
                                        field: '', value: '', key: formValues[`dataMapping${dataMappingType}`].length
                                    })}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </>
                        )}
                    </FieldArray>
                </div>
            </Col>
        </Row>
    );
}

export default DataMappingFields;