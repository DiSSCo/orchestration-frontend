/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { Capitalize } from 'app/Utilities';

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
        <div className="h-100">
            <Card className="h-100">
                <Card.Body className="h-100 d-flex flex-column">
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

                    <div className="flex-grow-1">
                        <div className="mh-100 ">
                            <Row className="h-100">
                                <Col className="h-100 d-flex flex-column justify-content-between">
                                    {Object.keys(IDCardProperties).map((propertyKey) => {
                                        const propertyValue = IDCardProperties[propertyKey];

                                        return (
                                            <Row key={propertyKey} className="my-2">
                                                <Col className="text-overflow">
                                                    <p className="fw-lightBold"> {Capitalize(propertyKey)} </p>
                                                    <p> {propertyValue} </p>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default IDCard;