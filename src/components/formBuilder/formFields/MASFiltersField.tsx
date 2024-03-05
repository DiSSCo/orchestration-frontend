/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { FieldArray, Field } from 'formik';
import { cloneDeep } from 'lodash';

/* Import Utilities */
import { ParseString } from 'app/Utilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';

/* Import Components */
import FilterField from './FilterField';


/* Props Typing */
interface Props {
    name: string,
    visibleName: string,
    formValues?: Dict,
    SetFieldValue?: Function
};


const MASFiltersField = (props: Props) => {
    const { name, visibleName, formValues, SetFieldValue } = props;

    /* Base variables */
    const harmonisedAttributes: Dict = cloneDeep(HarmonisedAttributes);

    return (
        <Row className="mt-2">
            <Col>
                <Row>
                    <Col>
                        <p className="ms-1 mb-1"> {`${ParseString(visibleName)}:`} </p>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        {Object.keys(formValues?.targetDigitalObjectFilters).map((objectFilter) => {
                            const objectFilterValues: [] = formValues?.targetDigitalObjectFilters[
                                objectFilter as keyof typeof formValues.targetDigitalObjectFilters
                            ];

                            return (
                                <div key={objectFilter} className="mt-3 mb-2">
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
                                                                const copyObjectFilters = { ...formValues?.targetDigitalObjectFilters };

                                                                delete copyObjectFilters[
                                                                    objectFilter as keyof typeof copyObjectFilters
                                                                ];

                                                                SetFieldValue?.('targetDigitalObjectFilters', copyObjectFilters);
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

                                                                return <FilterField key={key}
                                                                    filterName={`targetDigitalObjectFilters.${objectFilter}.${index}`}
                                                                    Remove={() => remove(index)}
                                                                />
                                                            })
                                                        }
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col className="col-lg-auto">
                        <Field name="targetDigitalObjectFiltersOptions"
                            as="select"
                        >
                            <option value="" disabled={true}> Select a harmonised attribute </option>

                            {Object.keys(harmonisedAttributes).map((filterOption) => {
                                if (!(filterOption in formValues?.targetDigitalObjectFilters)) {
                                    return <option key={filterOption} value={filterOption}> {filterOption} </option>
                                }
                            })}
                        </Field>
                    </Col>
                    <Col>
                        <button type="button"
                            className="primaryButton fs-4 px-3 py-1 c-secondary"
                            onClick={() => {
                                if (formValues?.targetDigitalObjectFiltersOptions && formValues.targetDigitalObjectFiltersOptions !== "") {
                                    /* Add filter to Target Digital Object Filters */
                                    SetFieldValue?.('targetDigitalObjectFilters', {
                                        ...formValues?.targetDigitalObjectFilters,
                                        [formValues?.targetDigitalObjectFiltersOptions]: [""]
                                    });
                                    /* Set options list value to next attribute in array */
                                    SetFieldValue?.('targetDigitalObjectFiltersOptions', "");
                                }
                            }}
                        >
                            Add filter
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MASFiltersField;