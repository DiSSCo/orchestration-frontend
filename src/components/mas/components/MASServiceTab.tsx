/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { MAS } from 'app/Types';


/* Props Typing */
interface Props {
    MAS: MAS
};


const MASServiceTab = (props: Props) => {
    const { MAS } = props;

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                    <Row>
                        <Col className="col-lg-auto pe-1">
                            <p> Service description </p>
                        </Col>
                    </Row>
                </Card.Subtitle>

                <Row className="mt-2">
                    <Col>
                        <p className="bgc-grey px-3 py-1"> {MAS.serviceDescription} </p>

                        <p className="mt-4"> State: {MAS.serviceState} </p>

                        <p className="mt-1"> Availability: {MAS.serviceAvailability} </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MASServiceTab;