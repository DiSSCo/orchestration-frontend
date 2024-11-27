/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';

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
    const [mapping, setMapping] = useState<DataMapping | undefined>();

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
                                <p> {mapping['schema:name'] ?? mapping['@id']} </p>
                            </Col>
                            <Col className="ps-0">
                                <p> | {mapping['ods:mappingDataStandard']} </p>
                            </Col>
                        </Row>
                    </Card.Subtitle>

                    <Row className="flex-grow-1 overflow-y-scroll">
                        <Col>
                            {/* Defaults */}
                            {!!mapping['ods:hasDefaultMapping']?.length &&
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

                                        {mapping['ods:hasDefaultMapping'].map((defaultMapping) => {
                                            const [key, value] = Object.entries(defaultMapping)[0];

                                            return (
                                                <MappingField key={key}
                                                    harmonisedProperty={key}
                                                    givenValue={value as string}
                                                />
                                            );
                                        })}
                                    </Col>
                                </Row>
                            }
                            {/* Field mapping */}
                            {!!mapping['ods:hasTermMapping']?.length &&
                                <Row className="mt-2">
                                    <Col>
                                        <p className="fs-4 fw-lightBold mb-1"> Field Mapping </p>

                                        <Row>
                                            <Col>
                                                <p className="fs-5 fw-lightBold c-secondary"> Field </p>
                                            </Col>
                                            <Col lg={{ offset: 3 }}>
                                                <p className="fs-5 fw-lightBold c-secondary"> {mapping['ods:mappingDataStandard']} property </p>
                                            </Col>
                                        </Row>

                                        {mapping['ods:hasTermMapping'].map((fieldMapping) => {
                                            const [key, value] = Object.entries(fieldMapping)[0];

                                            return (
                                                <MappingField key={key}
                                                    harmonisedProperty={key}
                                                    givenValue={value as string}
                                                />
                                            );
                                        })}
                                    </Col>
                                </Row>
                            }
                            {/* Placeholder if there are no mappings */}
                            {!mapping['ods:hasDefaultMapping']?.length && !mapping['ods:hasTermMapping']?.length &&
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