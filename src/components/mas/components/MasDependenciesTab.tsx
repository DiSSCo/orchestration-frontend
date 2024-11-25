/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';


/* Props Typing */
interface Props {
    mas: MachineAnnotationService
};


const MasDependenciesTab = (props: Props) => {
    const { mas } = props;

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                    <Row>
                        <Col className="col-lg-auto pe-1">
                            <p> Dependencies </p>
                        </Col>
                    </Row>
                </Card.Subtitle>

                <Row className="mt-3">
                    <Col>
                        {/* {mas.dependencies.length ? mas.dependencies.map((dependency, index) => {
                            return (
                                <Row key={dependency} className={index > 0 ? 'mt-3' : ''}>
                                    <Col>
                                        <div className="bgc-grey px-3 py-2">
                                            <p> {dependency} </p>
                                        </div>
                                    </Col>
                                </Row>
                            );
                        }) */}
                            : <p> No dependencies attached to MAS </p>
                        {/* } */}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MasDependenciesTab;