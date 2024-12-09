/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';

/* Import Components */
import DataMappingField from './DataMappingField';

/* Import API */
import GetDataMapping from 'api/dataMapping/GetDataMapping';


/* Props Typing */
interface Props {
    dataMappingId: string
};


const DataMappingTab = (props: Props) => {
    const { dataMappingId } = props;

    /* Base variables */
    const [dataMapping, setDataMapping] = useState<DataMapping | undefined>();

    /* OnLoad: Fetch Mapping with provided ID */
    useEffect(() => {
        if (!dataMapping) {
            GetDataMapping(dataMappingId).then((dataMapping) => {
                setDataMapping(dataMapping);
            }).catch(error => {
                console.warn(error);
            });
        }
    }, [dataMappingId]);

    return (
        <Card className="h-100">
            {dataMapping &&
                <Card.Body className="h-100 d-flex flex-column">
                    <Card.Subtitle className="text-muted">
                        <Row>
                            <Col className="col-lg-auto pe-1">
                                <p> {dataMapping['schema:name'] ?? dataMapping['@id']} </p>
                            </Col>
                            <Col className="ps-0">
                                <p> | {dataMapping['ods:mappingDataStandard']} </p>
                            </Col>
                        </Row>
                    </Card.Subtitle>

                    <Row className="flex-grow-1 overflow-y-scroll">
                        <Col>
                            {/* Defaults */}
                            {!!dataMapping['ods:hasDefaultMapping']?.length &&
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

                                        {dataMapping['ods:hasDefaultMapping'].map((defaultMapping) => {
                                            const [key, value] = Object.entries(defaultMapping)[0];

                                            return (
                                                <DataMappingField key={key}
                                                    harmonisedProperty={key}
                                                    givenValue={value as string}
                                                />
                                            );
                                        })}
                                    </Col>
                                </Row>
                            }
                            {/* Field mapping */}
                            {!!dataMapping['ods:hasTermMapping']?.length &&
                                <Row className="mt-2">
                                    <Col>
                                        <p className="fs-4 fw-lightBold mb-1"> Field Mapping </p>

                                        <Row>
                                            <Col>
                                                <p className="fs-5 fw-lightBold c-secondary"> Field </p>
                                            </Col>
                                            <Col lg={{ offset: 3 }}>
                                                <p className="fs-5 fw-lightBold c-secondary"> {dataMapping['ods:mappingDataStandard']} property </p>
                                            </Col>
                                        </Row>

                                        {dataMapping['ods:hasTermMapping'].map((fieldMapping) => {
                                            const [key, value] = Object.entries(fieldMapping)[0];

                                            return (
                                                <DataMappingField key={key}
                                                    harmonisedProperty={key}
                                                    givenValue={value as string}
                                                />
                                            );
                                        })}
                                    </Col>
                                </Row>
                            }
                            {/* Placeholder if there are no mappings */}
                            {!dataMapping['ods:hasDefaultMapping']?.length && !dataMapping['ods:hasTermMapping']?.length &&
                                <Row className="h-100 justify-content-center align-items-center">
                                    <Col>
                                        <p> No data mapping present </p>

                                        <button type="button"
                                            className="primaryButton mt-2"
                                        >
                                            Add a data mapping
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

export default DataMappingTab;