/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getSourceSystem, setSourceSystem } from 'redux/sourceSystem/SourceSystemSlice';

/* Import Components */
import Header from 'components/Header/Header';
import TitleBar from 'components/general/IDCard/titleBar/TitleBar';
import IDCard from 'components/general/IDCard/IDCard';
import MappingTab from 'components/mapping/components/MappingTab';

/* Import API */
import GetSourceSystem from 'api/sourceSystem/GetSourceSystem';
import TriggerSourceSystemIngestion from 'api/sourceSystem/TriggerSourceSystemIngestion';
import DeleteSourceSystem from 'api/sourceSystem/DeleteSourceSystem';


const SourceSystem = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const sourceSystem = useAppSelector(getSourceSystem);

    /* OnLoad: fetch Source System */
    useEffect(() => {
        const sourceSystemId = `${params.prefix}/${params.suffix}`;

        if (!sourceSystem || sourceSystem.id !== sourceSystemId) {
            GetSourceSystem(sourceSystemId).then((sourceSystem) => {
                if (sourceSystem) {
                    /* Set Source System */
                    dispatch(setSourceSystem(sourceSystem));
                } else {
                    /* Not found: return to Home */
                    navigate('/');
                }
            }).catch(error => {
                console.warn(error);
            });
        }
    }, []);

    /* Function to run a Source System Ingestion */
    const RunIngestion = () => {
        TriggerSourceSystemIngestion(sourceSystem?.id, KeycloakService.GetToken()).then((response) => {
            console.log(response);
        }).catch(error => {
            console.warn(error);
        })
    }

    /* Class Names */
    const classTabList = classNames({
        'tabsList': true
    });

    const classTab = classNames({
        'react-tabs__tab tab': true
    });

    return (
        <div className="h-100 d-flex flex-column overflow-hidden">
            <Header />

            <Container className="flex-grow-1 py-5">
                {sourceSystem &&
                    <div className="h-100 d-flex flex-column">
                        <Row className="mb-2">
                            <Col>
                                <TitleBar title={sourceSystem.name}
                                    subTitle="Source Systems"
                                />
                            </Col>
                            {(KeycloakService.IsLoggedIn() && KeycloakService.HasRole(['orchestration-admin'])) &&
                                <>
                                    <Col className="col-lg-auto">
                                        <button type="button"
                                            className="primaryButton px-3 py-1"
                                            onClick={() => RunIngestion()}
                                        >
                                            Run Ingestion
                                        </button>
                                    </Col>
                                    <Col className="col-lg-auto">
                                        <button type="button"
                                            className="primaryButton px-3 py-1"
                                            onClick={() => navigate(`edit`)}
                                        >
                                            Edit
                                        </button>
                                    </Col>
                                    <Col className="col-lg-auto">
                                        <button type="button"
                                            className="primaryButton delete px-3 py-1"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this Source System?')) {
                                                    DeleteSourceSystem(sourceSystem.id, KeycloakService.GetToken()).then((success) => {
                                                        if (success) {
                                                            navigate('/');
                                                        }
                                                    }).catch(error => {
                                                        console.warn(error);
                                                    });
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </Col>
                                </>
                            }
                        </Row>
                        <Row className="flex-grow-1">
                            <Col lg={{ span: 4 }}>
                                <IDCard identifier={sourceSystem.id}
                                    IDCardProperties={{
                                        name: sourceSystem.name,
                                        endpoint: sourceSystem.endpoint,
                                        description: sourceSystem.description,
                                        created: sourceSystem.created
                                    }}
                                />
                            </Col>
                            <Col lg={{ span: 8 }}>
                                <Tabs className="h-100 d-flex flex-column">
                                    <TabList className={classTabList}>
                                        <Tab className={classTab} selectedClassName="active"> Mapping </Tab>
                                    </TabList>

                                    {/* Mappings Tab */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MappingTab mappingId={sourceSystem.mappingId} />
                                    </TabPanel>
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
        </div>
    );
}

export default SourceSystem;