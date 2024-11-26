/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';


/* Props Typing */
interface Props {
    mas: MachineAnnotationService
};


const MasServiceTab = (props: Props) => {
    const { mas } = props;

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
                        <p className="bgc-grey px-3 py-1"> {mas['schema:description']} </p>

                        <p className="mt-4"> State: {mas['ods:status']} </p>

                        <p className="mt-1"> Availability: {mas['ods:serviceAvailability']} </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MasServiceTab;