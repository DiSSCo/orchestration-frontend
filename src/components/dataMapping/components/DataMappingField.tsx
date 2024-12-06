/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


/* Props Typing */
interface Props {
    harmonisedProperty: string,
    givenValue: string
};


const DataMappingField = (props: Props) => {
    const { harmonisedProperty, givenValue } = props;

    return (
        <Row>
            <Col>
                <p className="fs-4"> {harmonisedProperty} </p>
            </Col>
            <Col lg={{ span: 3 }}>
                <Row>
                    <Col className="pe-0 d-flex align-items-center">
                        <div className="w-100 b-accent" />
                    </Col>
                    <Col className="col-lg-auto ps-0">
                        <FontAwesomeIcon icon={faChevronRight}
                            className="c-accent"
                        />
                    </Col>
                </Row>
            </Col>
            <Col>
                <p className="fs-4"> {givenValue} </p>
            </Col>
        </Row >
    );
}

export default DataMappingField;