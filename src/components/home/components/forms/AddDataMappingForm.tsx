/* Import Dependencies */
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styling */
import styles from 'components/home/home.module.scss';

/* Import Sources */
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';

/* Import Components */
import DataMappingFields from './DataMappingFields';


/* Props Typing */
interface Props {
    formValues: Dict,
    baseStandard: string
};


const AddDataMappingForm = (props: Props) => {
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
                <div className="h-100 d-flex flex-column">
                    <Row>
                        <Col>
                            <h6> Construct Mapping </h6>
                        </Col>
                    </Row>

                    <Row className="flex-grow-1">
                        <Col className="h-100">
                            <DataMappingFields dataMappingType={'Defaults'}
                                formValues={formValues}
                                harmonisedAttributes={harmonisedAttributes}
                                originalHarmonisedAttributes={originalHarmonisedAttributes}
                                classCoverDiv={classCoverDiv}
                            />

                            <DataMappingFields dataMappingType={'FieldMapping'}
                                formValues={formValues}
                                harmonisedAttributes={harmonisedAttributes}
                                originalHarmonisedAttributes={originalHarmonisedAttributes}
                                classCoverDiv={classCoverDiv}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default AddDataMappingForm;