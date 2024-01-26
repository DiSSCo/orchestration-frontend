/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';


/* Props Typing */
interface Props {
    identifier: string,
    IDCardProperties: Dict
};


const IDCard = (props: Props) => {
    const { identifier, IDCardProperties } = props;

    return (
        <div className="h-100 ">
            <Card>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                        <Row>
                            <Col className="fs-4 c-secondary fw-lightBold">
                                <p> ID Card </p>
                            </Col>
                            <Col className="fs-4 col-md-auto fw-lightBold">
                                <p> {identifier} </p>
                            </Col>
                        </Row>
                    </Card.Subtitle>

                    <Row className="flex-grow-1">
                        <Col className="h-100 d-flex flex-column justify-content-between">
                            {Object.keys(IDCardProperties).map((propertyKey) => {
                                const propertyValue = IDCardProperties[propertyKey];

                                return (
                                    <Row>
                                        <Col>
                                            <span> {propertyKey} </span>
                                        </Col>
                                        <Col className="col-md-auto text-overflow">
                                            <span> {propertyValue} </span>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default IDCard;