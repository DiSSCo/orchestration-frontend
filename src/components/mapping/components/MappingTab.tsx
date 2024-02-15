/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Mapping } from 'app/Types';

/* Import Components */
import MappingField from './MappingField';

/* Import API */
import GetMapping from 'api/mapping/GetMapping';


/* Props Typing */
interface Props {
    mappingId: string
};


const MappingTab = (props: Props) => {
    const { mappingId } = props;

    /* Base variables */
    const [mapping, setMapping] = useState<Mapping | undefined>();

    /* OnLoad: Fetch Mapping with provided ID */
    useEffect(() => {
        if (!mapping) {
            GetMapping(mappingId).then((mapping) => {
                setMapping(mapping);
            }).catch(error => {
                console.warn(error);
            });
        }
    }, [mappingId]);

    return (
        <Card className="h-100">
            {mapping &&
                <Card.Body className="h-100 d-flex flex-column">
                    <Card.Subtitle className="text-muted">
                        <Row>
                            <Col className="col-lg-auto pe-1">
                                <p> {mapping.name} </p>
                            </Col>
                            <Col className="ps-0">
                                <p> | {mapping.sourceDataStandard} </p>
                            </Col>
                        </Row>
                    </Card.Subtitle>


                    <Row className="flex-grow-1 overflow-y-scroll">
                        <Col>
                            {/* Defaults */}
                            {!!mapping.fieldMapping.defaults.length &&
                                <Row className="mt-2">
                                    <Col>
                                        <p className="fs-4 fw-lightBold mb-1"> Default Mapping </p>

                                        <Row>
                                            <Col>
                                                <p className="fs-5 fw-lightBold c-secondary"> Field </p>
                                            </Col>
                                            <Col lg={{ offset: 3 }}>
                                                <p className="fs-5 fw-lightBold c-secondary"> Value </p>
                                            </Col>
                                        </Row>

                                        {mapping.fieldMapping.defaults.map((defaultMapping) => (
                                            <MappingField key={Object.entries(defaultMapping)[0][0]}
                                                harmonisedProperty={Object.entries(defaultMapping)[0][0]}
                                                givenValue={Object.entries(defaultMapping)[0][1]}
                                            />
                                        ))}
                                    </Col>
                                </Row>
                            }
                            {/* Field mapping */}
                            {!!mapping.fieldMapping.mapping.length &&
                                <Row className="mt-2">
                                    <Col>
                                        <p className="fs-4 fw-lightBold mb-1"> Field Mapping </p>

                                        <Row>
                                            <Col>
                                                <p className="fs-5 fw-lightBold c-secondary"> Field </p>
                                            </Col>
                                            <Col lg={{ offset: 3 }}>
                                                <p className="fs-5 fw-lightBold c-secondary"> {mapping.sourceDataStandard} property </p>
                                            </Col>
                                        </Row>

                                        {mapping.fieldMapping.mapping.map((fieldMapping) => (
                                            <MappingField key={Object.entries(fieldMapping)[0][0]}
                                                harmonisedProperty={Object.entries(fieldMapping)[0][0]}
                                                givenValue={Object.entries(fieldMapping)[0][1]}
                                            />
                                        ))}
                                    </Col>
                                </Row>
                            }
                            {/* Placeholder if there are no mappings */}
                            {!mapping.fieldMapping.defaults.length && !mapping.fieldMapping.mapping.length &&
                                <Row className="h-100 justify-content-center align-items-center">
                                    <Col>
                                        <p> No mapping present </p>

                                        <button type="button"
                                            className="primaryButton mt-2"
                                        >
                                            Add a mapping
                                        </button>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            }
        </Card>
    );
}

export default MappingTab;