/* Import Dependencies */
import { cloneDeep } from 'lodash';
import { FieldArray, Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utitlities */
import { ParseString } from 'app/Utilities';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    formValues?: Dict
};


const MappingField = (props: Props) => {
    const { name, visibleName, formValues } = props;

    /* Base variables */
    const originalHarmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);
    const harmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);

    /* Check which harmonised properties still may be used to map */
    if (formValues) {
        (formValues['ods:hasDefaultMapping'].concat(formValues['ods:hasTermMapping'])).forEach((mapping: Dict) => {
            /* Remove mapping property from Harmonised Attributes */
            if (mapping.field) {
                delete harmonisedAttributes[mapping.field];
            }
        });
    }

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${ParseString(visibleName)}:`} </p>

                <FieldArray name={name}>
                    {({ push, remove }) => (
                        <>
                            {formValues?.[name].map((value: Dict, index: number) => {
                                const localAttributes = { ...harmonisedAttributes };

                                if (value.field) {
                                    localAttributes[value.field] = originalHarmonisedAttributes[value.field];
                                }

                                return (
                                    <Row key={value.field} className="py-1">
                                        <Col>
                                            <Row>
                                                <Col md={{ span: 6 }}>
                                                    <Field name={`${name}.${index}.field`} as="select"
                                                        className="formField py-1 px-2 w-100 h-100"
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
                                                    <Field name={`${name}.${index}.value`}
                                                        className="formField py-1 px-2 w-100"
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="col-md-auto d-flex align-items-center">
                                            <button type="button"
                                                className="button-no-style"
                                                onClick={() => remove(index)}
                                            >
                                                <FontAwesomeIcon icon={faX}
                                                    className="fs-3"  
                                                />
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            })}

                            {/* Button for adding additional mappings */}
                            {formValues &&
                                <button type="button"
                                    className="w-100 mt-2"
                                    onClick={() => push({
                                        field: '', value: '', key: formValues[name].length
                                    })}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            }
                        </>
                    )}
                </FieldArray>
            </Col>
        </Row>
    );
}

export default MappingField;