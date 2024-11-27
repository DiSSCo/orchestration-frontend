/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/Utilities';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';


/* Props Typing */
interface Props {
    mas: MachineAnnotationService
};


const MasTargetDigitalObjectFiltersTab = (props: Props) => {
    const { mas } = props;

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

                {mas['ods:hasTargetDigitalObjectFilter'] &&
                    <Row className="mt-3">
                        <Col>
                            {Object.entries(mas['ods:hasTargetDigitalObjectFilter']).map(([key, value], index) => {
                                const filterValues: string[] = value as string[];

                                return (
                                    <Row key={key} className={index > 0 ? 'mt-3' : ''}>
                                        <Col>
                                            <p className="fw-lightBold">{MakeJsonPathReadableString(key)}</p>

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
                }
            </Card.Body>
        </Card>
    );
}

export default MasTargetDigitalObjectFiltersTab;