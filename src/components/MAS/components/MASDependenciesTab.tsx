/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { MAS } from 'app/Types';


/* Props Typing */
interface Props {
    MAS: MAS
};


const MASDependenciesTab = (props: Props) => {
    const { MAS } = props;

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
                        {MAS.dependencies.length ? MAS.dependencies.map((dependency, index) => {
                            return (
                                <Row className={index > 0 ? 'mt-3' : ''}>
                                    <Col>
                                        <div className="bgc-grey px-3 py-2">
                                            <p> {dependency} </p>
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })
                            : <p> No dependencies attached to MAS </p>
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MASDependenciesTab;