/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getSourceSystems, setSourceSystems } from 'redux/sourceSystem/SourceSystemSlice';
import { getMappings, setMappings } from 'redux/mapping/MappingSlice';

/* Import Types */
import { SourceSystem, Mapping } from 'global/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import Header from 'components/Header/Header';
import SourceSystemsOverview from './components/overview/SourceSystemsOverview';
import MappingsOverview from './components/overview/MappingsOverview';
import FormModal from './components/forms/FormModal';

/* Import API */
import GetSourceSystems from 'api/sourceSystem/GetSourceSystems';
import GetMappings from 'api/mapping/GetMappings';


const Home = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const sourceSystems = useAppSelector(getSourceSystems);
    const mappings = useAppSelector(getMappings);

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

    /* Function for updating the Source Systems state */
    const UpdateSourceSystems = (sourceSystemId: string, sourceSystem?: SourceSystem) => {
        const copySourceSystems = [...sourceSystems];
        const sourceSystemIndex = sourceSystems.findIndex(sourceSystemRecord => sourceSystemRecord.id === sourceSystemId);

        /* If Source System object is present, update main array, else remove */
        if (sourceSystem && sourceSystemIndex > 0) {
            copySourceSystems[sourceSystemIndex] = sourceSystem;
        } else if (sourceSystem) {
            copySourceSystems.push(sourceSystem);
        } else {
            copySourceSystems.splice(sourceSystemIndex, 1);
        }

        dispatch(setSourceSystems(copySourceSystems));
    }

    /* Function for updating the Mappings state */
    const UpdateMappings = (mappingId: string, mapping?: Mapping) => {
        const copyMappings = [...mappings];
        const mappingIndex = mappings.findIndex(mappingRecord => mappingRecord.id === mappingId);

        /* If Source System object is present, update main array, else remove */
        if (mapping && mappingIndex > 0) {
            copyMappings[mappingIndex] = mapping;
        } else if (mapping) {
            copyMappings.push(mapping);
        } else {
            copyMappings.splice(mappingIndex, 1);
        }

        dispatch(setMappings(copyMappings));
    }

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
                                <SourceSystemsOverview ToggleModal={() => setModalToggle(true)}
                                    UpdateSourceSystems={(sourceSystemId: string, sourceSystem?: SourceSystem) =>
                                        UpdateSourceSystems(sourceSystemId, sourceSystem)}
                                />
                            </Tab>
                            <Tab eventKey="Mapping" title="Mappings">
                                <MappingsOverview ToggleModal={() => setModalToggle(true)}
                                    UpdateMappings={(mappingId: string, mapping?: Mapping) =>
                                        UpdateMappings(mappingId, mapping)}
                                />
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

                <FormModal modalToggle={modalToggle}
                    chosenTab={chosenTab}

                    ToggleModal={() => setModalToggle(!modalToggle)}
                    UpdateSourceSystems={(sourceSystemId: string, sourceSystem?: SourceSystem) =>
                        UpdateSourceSystems(sourceSystemId, sourceSystem)}
                    UpdateMappings={(mappingId: string, mapping?: Mapping) =>
                        UpdateMappings(mappingId, mapping)}
                />
            </Container>
        </div>
    );
}

export default Home;