/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getDataMapping, setDataMapping } from 'redux-store/DataMappingSlice';

/* Import Components */
import TitleBar from 'components/general/IDCard/titleBar/TitleBar';
import IDCard from 'components/general/IDCard/IDCard';
import DataMappingTab from './components/DataMappingTab';
import { Header } from 'components/elements/Elements';

/* Import API */
import GetDataMapping from 'api/dataMapping/GetDataMapping';
import DeleteDataMapping from 'api/dataMapping/DeleteDataMapping';


const DataMapping = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const dataMapping = useAppSelector(getDataMapping);

    /* OnLoad: fetch Data Mapping */
    useEffect(() => {
        const dataMappingId = `${params.prefix}/${params.suffix}`;

        if (dataMapping?.['@id'] !== dataMappingId) {
            GetDataMapping(dataMappingId).then((dataMapping) => {
                if (dataMapping) {
                    /* Set Data Mapping */
                    dispatch(setDataMapping(dataMapping));
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
                {dataMapping &&
                    <div className="h-100 d-flex flex-column">
                        <Row className="mb-2">
                            <Col>
                                <TitleBar title={dataMapping['schema:name'] ?? dataMapping['@id'] ?? dataMapping['schema:identifier']}
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
                                                if (window.confirm('Are you sure you want to delete this Data Mapping?')) {
                                                    DeleteDataMapping((dataMapping['@id'] ?? dataMapping['schema:identifier']).replace(
                                                        import.meta.env.VITE_HANDLE_URL, ''), KeycloakService.GetToken()
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
                                <IDCard identifier={(dataMapping['@id'] ?? dataMapping['schema:identifier']).replace(import.meta.env.VITE_HANDLE_URL, '')}
                                    IDCardProperties={{
                                        name: dataMapping['schema:name'],
                                        description: dataMapping['schema:description'],
                                        sourceDataStandard: dataMapping['ods:mappingDataStandard'],
                                        created: dataMapping['schema:dateCreated']
                                    }}
                                />
                            </Col>
                            <Col lg={{ span: 8 }}>
                                <Tabs className="h-100 d-flex flex-column">
                                    <TabList className={classTabList}>
                                        <Tab className={classTab} selectedClassName="active"> Data Mapping </Tab>
                                    </TabList>

                                    {/* Data Mappings Tab */}
                                    <TabPanel className="react-tabs__tab-panel flex-grow-1">
                                        <DataMappingTab dataMappingId={(dataMapping['@id'] ?? dataMapping['schema:identifier']).replace(import.meta.env.VITE_HANDLE_URL, '')} />
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

export default DataMapping;