/* Import Dependencies */
import { cloneDeep } from 'lodash';
import { FieldArray, Field, ErrorMessage, useFormikContext } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utitlities */
import { MakeJsonPathReadableString } from 'app/Utilities';

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


const DataMappingField = (props: Props) => {
    const { name, visibleName, formValues } = props;

    /** Formik hook that gives access to the helper functions, in order to control the state and the validation of the form.
     * They are used because the two fields that the component contains, depend on each other for validation.
     */
    const { setFieldValue, setFieldTouched, validateField, setTouched, setErrors, validateForm } = useFormikContext();

    /* Base variables */
    const originalHarmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);
    const harmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);

    /* Check which harmonised properties still may be used to map */
    if (formValues) {
        (formValues['ods:hasDefaultMapping'].concat(formValues['ods:hasTermMapping'])).forEach((dataMapping: Dict) => {
            /* Remove mapping property from Harmonised Attributes */
            if (dataMapping.field) {
                delete harmonisedAttributes[dataMapping.field];
            }
        });
    }

    return (
        <Row key={name} className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> {`${MakeJsonPathReadableString(visibleName)}:`}
                    {formValues?.[name].length > 0 && <span className="text-danger"> * </span>}
                </p>

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
                                                        className="formField py-1 px-2 w-100"
                                                        /* Cross-field validation: If the input field has a value
                                                        but the dropdown is still empty (placeholder selected)
                                                        then the dropdown must be filled and it returns a "Required" error. */
                                                        validate={(fieldValue: string) => {
                                                            if (value.value && !fieldValue) {
                                                                return 'Required';
                                                            }
                                                        }}
                                                        /* Trigger immediate validation of the related field */
                                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                                            setFieldValue(`${name}.${index}.field`, event.target.value);
                                                            setFieldTouched(`${name}.${index}.value`, true, false);

                                                            setTimeout(() => {
                                                                validateField(`${name}.${index}.value`);
                                                            }, 0);
                                                        }}
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

                                                    <ErrorMessage name={`${name}.${index}.field`}>
                                                        {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                                    </ErrorMessage>

                                                </Col>
                                                <Col md={{ span: 6 }}>
                                                    <Field name={`${name}.${index}.value`}
                                                        className="formField py-1 px-2 w-100"
                                                        /* Cross-field validation: If the dropdown has a selected harmonised property
                                                        but the input field is empty, then the input field must be filled and it returns a "Required" error. */
                                                        validate={(inputValue: string) => {
                                                            if (value.field && !inputValue) {
                                                                return 'Required';
                                                            }
                                                        }}
                                                        /* Trigger immediate validation of the related field */
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            setFieldValue(`${name}.${index}.value`, event.target.value);
                                                            setFieldTouched(`${name}.${index}.field`, true, false);

                                                            setTimeout(() => {
                                                                validateField(`${name}.${index}.field`);
                                                            }, 0);
                                                        }}
                                                    />
                                                    <ErrorMessage name={`${name}.${index}.value`}>
                                                        {(msg) => <div className="text-danger small mt-1">{msg}</div>}
                                                    </ErrorMessage>

                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className="col-md-auto d-flex align-items-center">
                                            <button type="button"
                                                className="button-no-style"
                                                onClick={() => {
                                                    const isLastRow = formValues?.[name]?.length === 1;

                                                    remove(index);

                                                    if (isLastRow) {
                                                        setTimeout(() => {
                                                            setErrors({});
                                                            setTouched({});
                                                            validateForm();
                                                        }, 0);
                                                    }
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faX}
                                                    className="fs-3"
                                                />
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            })}

                            {/* Button for adding additional data mappings */}
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

export default DataMappingField;