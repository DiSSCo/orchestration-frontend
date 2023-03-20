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

/* Import Components */
import MappingFields from './MappingFields';


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
                        <MappingFields mappingType={'Defaults'}
                            formValues={formValues}
                            harmonisedAttributes={harmonisedAttributes}
                            originalHarmonisedAttributes={originalHarmonisedAttributes}
                            classCoverDiv={classCoverDiv}
                        />
                            
                        <MappingFields mappingType={'FieldMapping'}
                            formValues={formValues}
                            harmonisedAttributes={harmonisedAttributes}
                            originalHarmonisedAttributes={originalHarmonisedAttributes}
                            classCoverDiv={classCoverDiv}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AddMappingForm;