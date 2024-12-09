/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMachineAnnotationService, setMachineAnnotationService } from 'redux-store/MasSlice';

/* Import Components */
import TitleBar from 'components/general/IDCard/titleBar/TitleBar';
import IDCard from 'components/general/IDCard/IDCard';
import MasServiceTab from './components/MasServiceTab';
import MasTargetDigitalObjectFiltersTab from './components/MasTargetDigitalObjectFiltersTab';
import { Header } from 'components/elements/Elements';

/* Import API */
import GetMAS from 'api/mas/GetMas';
import DeleteMas from 'api/mas/DeleteMas';


const Mas = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const mas = useAppSelector(getMachineAnnotationService);

    /* OnLoad: fetch Machine Annotation Service */
    useEffect(() => {
        const masId = `${params.prefix}/${params.suffix}`;

        if (mas?.['@id'] !== masId) {
            GetMAS(masId).then((mas) => {
                if (mas) {
                    /* Set Machine Annotation Service */
                    dispatch(setMachineAnnotationService(mas));
                } else {
                    /* Not found: return to Home */
                    navigate('/');
                }
            }).catch(error => {
                console.warn(error);
            });
        }
    }, []);

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
                {mas &&
                    <div className="h-100 d-flex flex-column">
                        <Row className="mb-2">
                            <Col>
                                <TitleBar title={mas['schema:name']}
                                    subTitle="Machine Annotation Services"
                                />
                            </Col>
                            {(KeycloakService.IsLoggedIn() && KeycloakService.HasRole(['orchestration-admin'])) &&
                                <>
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
                                                if (window.confirm('Are you sure you want to delete this MAS?')) {
                                                    DeleteMas((mas['@id'] ?? mas['schema:identifier']).replace(
                                                        RetrieveEnvVariable('HANDLE_URL'), ''), KeycloakService.GetToken()
                                                    ).then((success) => {
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
                                <IDCard identifier={(mas['@id'] ?? mas['schema:identifier']).replace(RetrieveEnvVariable('HANDLE_URL'), '')}
                                    IDCardProperties={{
                                        name: mas['schema:name'],
                                        containerImage: mas['ods:containerImage'],
                                        containerTag: mas['ods:containerTag'],
                                        topicName: mas['ods:topicName'],
                                        sourceCodeRepository: mas['schema:codeRepository'],
                                        codeMaintainer: mas['schema:maintainer']?.['schema:identifier'],
                                        codeLicense: mas['schema:license'],
                                        supportContact: mas['schema:ContactPoint']?.['schema:url'],
                                        slaDocumentation: mas['ods:slaDocumentation'],
                                        maxReplicas: mas['ods:maxReplicas'],
                                        batchingPermitted: mas['ods:batchingPermitted'] ? 'True' : 'False'
                                    }}
                                />
                            </Col>
                            <Col lg={{ span: 8 }}>
                                <Tabs className="h-100 d-flex flex-column">
                                    <TabList className={classTabList}>
                                        <Tab className={classTab} selectedClassName="active"> Service description </Tab>
                                        <Tab className={classTab} selectedClassName="active"> Target Digital Object Filters </Tab>
                                    </TabList>

                                    {/* MAS Service Tab */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MasServiceTab mas={mas} />
                                    </TabPanel>

                                    {/* MAS Target Digital Object Filters */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MasTargetDigitalObjectFiltersTab mas={mas} />
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

export default Mas;