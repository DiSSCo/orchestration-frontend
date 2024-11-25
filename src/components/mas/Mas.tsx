/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMachineAnnotationService, setMachineAnnotationService } from 'redux-store/MasSlice';

/* Import Components */
import TitleBar from 'components/general/IDCard/titleBar/TitleBar';
import IDCard from 'components/general/IDCard/IDCard';
import MASServiceTab from './components/MASServiceTab';
import MASTargetDigitalObjectFiltersTab from './components/MASTargetDigitalObjectFiltersTab';
import MASDependenciesTab from './components/MASDependenciesTab';
import { Header } from 'components/elements/Elements';

/* Import API */
import GetMAS from 'api/mas/GetMAS';
import DeleteMAS from 'api/mas/DeleteMAS';


const Mas = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const MAS = useAppSelector(getMachineAnnotationService);

    /* OnLoad: fetch Machine Annotation Service */
    useEffect(() => {
        const MASId = `${params.prefix}/${params.suffix}`;

        if (MAS?.id !== MASId) {
            GetMAS(MASId).then((MAS) => {
                if (MAS) {
                    /* Set Machine Annotation Service */
                    dispatch(setMachineAnnotationService(MAS));
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
                {MAS &&
                    <div className="h-100 d-flex flex-column">
                        <Row className="mb-2">
                            <Col>
                                <TitleBar title={MAS.name}
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
                                                    DeleteMAS(MAS.id, KeycloakService.GetToken()).then((success) => {
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
                                <IDCard identifier={MAS.id}
                                    IDCardProperties={{
                                        name: MAS.name,
                                        containerImage: MAS.containerImage,
                                        containerTag: MAS.containerTag,
                                        topicName: MAS.topicName,
                                        sourceCodeRepository: MAS.sourceCodeRepository,
                                        codeMaintainer: MAS.codeMaintainer,
                                        codeLicense: MAS.codeLicense,
                                        supportContact: MAS.supportContact,
                                        slaDocumentation: MAS.slaDocumentation,
                                        maxReplicas: MAS.maxReplicas,
                                        batchingPermitted: MAS.batchingPermitted ? 'True' : 'False'
                                    }}
                                />
                            </Col>
                            <Col lg={{ span: 8 }}>
                                <Tabs className="h-100 d-flex flex-column">
                                    <TabList className={classTabList}>
                                        <Tab className={classTab} selectedClassName="active"> Service description </Tab>
                                        <Tab className={classTab} selectedClassName="active"> Target Digital Object Filters </Tab>
                                        <Tab className={classTab} selectedClassName="active"> Dependencies </Tab>
                                    </TabList>

                                    {/* MAS Service Tab */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MASServiceTab MAS={MAS} />
                                    </TabPanel>

                                    {/* MAS Target Digital Object Filters */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MASTargetDigitalObjectFiltersTab MAS={MAS} />
                                    </TabPanel>

                                    {/* MAS Dependencies */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <MASDependenciesTab MAS={MAS} />
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