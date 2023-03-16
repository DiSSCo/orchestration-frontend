/* Import Dependencies */
import { useEffect } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/Hooks';
import { setSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';
import { setMappings } from 'redux/mapping/MappingSlice';

/* Import Components */
import Header from 'components/Header/Header';
import SourceSystemsTable from './components/overview/SourceSystemsTable';
import MappingsTable from './components/overview/MappingsTable';

/* Import API */
import GetSourceSystems from 'api/sourceSystem/GetSourceSystems';
import GetMappings from 'api/mapping/GetMappings';


const Home = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* OnLoad: Get Source Systems and Mappings */
    useEffect(() => {
        GetSourceSystems().then((sourceSystems) => {
            dispatch(setSourceSystems(sourceSystems));
        });

        GetMappings().then((mappings) => {
            dispatch(setMappings(mappings));
        });
    }, []);

    return (
        <div className="h-100">
            <Header />

            <Container className="content py-5">
                <Row className="h-100">
                    <Col className="h-100">
                        <Tabs defaultActiveKey="sourceSystems">
                            <Tab eventKey="sourceSystems" title="Source Systems">
                                <SourceSystemsTable />
                            </Tab>
                            <Tab eventKey="mappings" title="Mappings">
                                <MappingsTable />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;