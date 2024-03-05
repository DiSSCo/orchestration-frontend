/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import { Field } from 'formik';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    filterName: string
    Remove: Function
};


const FilterField = (props: Props) => {
    const { filterName, Remove } = props;

    return (
        <Row>
            <Col md={{ span: 9 }} className="pe-0">
                <Field name={filterName}
                    className="formField w-100 mb-2"
                />
            </Col>
            <Col>
                <FontAwesomeIcon icon={faX}
                    onClick={() => Remove()}
                />
            </Col>
        </Row>
    );
}

export default FilterField;