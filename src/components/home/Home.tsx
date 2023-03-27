/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/Hooks';
import { setSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';
import { setMappings } from 'redux/mapping/MappingSlice';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import Header from 'components/Header/Header';
import SourceSystemsTable from './components/overview/SourceSystemsOverview';
import MappingsTable from './components/overview/MappingsOverview';
import FormModal from './components/forms/FormModal';

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

    /* Function for toggling the Form Modal */
    const [modalToggle, setModalToggle] = useState(false);

    /* Function for tracking the chosen tab */
    const [chosenTab, setChosenTab] = useState('Source System');

    return (
        <div className="h-100">
            <Header />

            <Container className="content py-5">
                <Row className="h-100">
                    <Col className="h-100">
                        <div className="position-relative">
                            <button className={`${styles.addButton} position-absolute px-3 py-1 end-0`}
                                onClick={() => setModalToggle(true)}
                            >
                                Add {chosenTab}
                            </button>
                        </div>

                        <Tabs defaultActiveKey="Source System"
                            onSelect={(tab) => setChosenTab(tab as string)}
                        >
                            <Tab eventKey="Source System" title="Source Systems">
                                <SourceSystemsTable />
                            </Tab>
                            <Tab eventKey="Mapping" title="Mappings">
                                <MappingsTable />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

                <FormModal modalToggle={modalToggle}
                    chosenTab={chosenTab}

                    ToggleModal={() => setModalToggle(!modalToggle)}
                />
            </Container>
        </div>
    );
}

export default Home;