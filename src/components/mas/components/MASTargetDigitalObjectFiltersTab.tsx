/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { MAS } from 'app/Types';


/* Props Typing */
interface Props {
    MAS: MAS
};


const MASTargetDigitalObjectFiltersTab = (props: Props) => {
    const { MAS } = props;

    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Subtitle className="text-muted">
                    <Row>
                        <Col className="col-lg-auto pe-1">
                            <p> Target Digital Object Filters </p>
                        </Col>
                    </Row>
                </Card.Subtitle>

                <Row className="mt-3">
                    <Col>
                        {Object.keys(MAS.targetDigitalObjectFilters).map((key, index) => {
                            const filterValues: string[] = MAS.targetDigitalObjectFilters[key as keyof typeof MAS.targetDigitalObjectFilters];

                            return (
                                <Row key={key} className={index > 0 ? 'mt-3' : ''}>
                                    <Col>
                                        <p className="fw-lightBold">{key.replace('$.', '')}</p>

                                        <div className="mt-2 px-3 py-2 bgc-grey">
                                            {filterValues.map((filterValue) => (
                                                <p key={filterValue}> {filterValue} </p>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default MASTargetDigitalObjectFiltersTab;