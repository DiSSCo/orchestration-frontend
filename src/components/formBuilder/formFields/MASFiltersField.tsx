/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { Field } from 'formik';
import { cloneDeep } from 'lodash';

/* Import Utilities */
import { ParseString } from 'app/Utilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';

/* Import Components */
import MappingFilter from './MappingFilter';


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
                                    <MappingFilter name={name}
                                        objectFilter={objectFilter}
                                        formValues={formValues}
                                        objectFilterValues={objectFilterValues}
                                        SetFieldValue={(field: string, value: Dict) => SetFieldValue?.(field, value)}
                                    />
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
                                if (formValues?.targetDigitalObjectFilters && !(filterOption in formValues?.targetDigitalObjectFilters)) {
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