/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMapping, setMapping } from 'redux-store/MappingSlice';

/* Import Components */
import TitleBar from 'components/general/IDCard/titleBar/TitleBar';
import IDCard from 'components/general/IDCard/IDCard';
import MappingTab from './components/MappingTab';
import { Header } from 'components/elements/Elements';

/* Import API */
import GetMapping from 'api/mapping/GetMapping';
import DeleteMapping from 'api/mapping/DeleteMapping';


const Mapping = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const mapping = useAppSelector(getMapping);

    /* OnLoad: fetch Mapping */
    useEffect(() => {
        const mappingId = `${params.prefix}/${params.suffix}`;

        if (mapping?.id !== mappingId) {
            GetMapping(mappingId).then((mapping) => {
                if (mapping) {
                    /* Set Mapping */
                    dispatch(setMapping(mapping));
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
                {mapping &&
                    <div className="h-100 d-flex flex-column">
                        <Row className="mb-2">
                            <Col>
                                <TitleBar title={mapping.name}
                                    subTitle="Mappings"
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
                                                if (window.confirm('Are you sure you want to delete this Mapping?')) {
                                                    DeleteMapping(mapping.id, KeycloakService.GetToken()).then((success) => {
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
                                <IDCard identifier={mapping.id}
                                    IDCardProperties={{
                                        name: mapping.name,
                                        description: mapping.description,
                                        sourceDataStandard: mapping.sourceDataStandard,
                                        created: mapping.created
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
                                        <MappingTab mappingId={mapping.id} />
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

export default Mapping;