/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import KeycloakService from 'app/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch } from 'app/Hooks';
import { setSourceSystems } from 'redux-store/SourceSystemSlice';
import { setDataMappings } from 'redux-store/DataMappingSlice';
import { setMachineAnnotationServices } from 'redux-store/MasSlice';

/* Import Utilities */
import { ReparseString } from 'app/Utilities';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Components */
import SourceSystemsOverview from './components/overview/SourceSystemsOverview';
import DataMappingsOverview from './components/overview/DataMappingsOverview';
import MasOverview from './components/overview/MasOverview';
import { Header } from 'components/elements/Elements';

/* Import API */
import GetSourceSystems from 'api/sourceSystem/GetSourceSystems';
import GetDataMappings from 'api/dataMapping/GeDatatMappings';
import GetMases from 'api/mas/GetMases';


const Home = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* OnLoad: Get Source Systems, Mappings and Machine annotation services */
    useEffect(() => {
        GetSourceSystems().then((sourceSystems) => {
            dispatch(setSourceSystems(sourceSystems));
        }).catch(error => {
            console.warn(error);
        });

        GetDataMappings().then((dataMappings) => {
            dispatch(setDataMappings(dataMappings));
        }).catch(error => {
            console.warn(error);
        });

        GetMases().then((machineAnnotationServices) => {
            dispatch(setMachineAnnotationServices(machineAnnotationServices));
        }).catch(error => {
            console.warn(error);
        });
    }, []);

    /* Function for tracking the chosen tab */
    const [chosenTab, setChosenTab] = useState('Source System');

    const SetChosenTab = (tabNumber: number) => {
        if (tabNumber === 0) {
            setChosenTab('Source System');
        } else if (tabNumber === 1) {
            setChosenTab('Data Mapping');
        } else if (tabNumber === 2) {
            setChosenTab('mas')
        }
    };

    /* Class Names for Tabs */
    const classTabsList = classNames({
        [`${styles.tabsList}`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    const classTabPanel = classNames({
        'react-tabs__tab-panel': true,
        [`${styles.tabPanel}`]: true
    });

    return (
        <div className="h-100">
            <Header />

            <Container className="content py-5">
                <Row className="h-100">
                    <Col className="h-100">
                        {KeycloakService.HasRole(['orchestration-admin']) &&
                            <div className="position-relative">
                                <button className={`${styles.addButton} primaryButton position-absolute px-3 py-1 end-0`}
                                    onClick={() => {
                                        const routeString = ReparseString(chosenTab);

                                        navigate(`${routeString}/add`);
                                    }}
                                >
                                    Add {chosenTab}
                                </button>
                            </div>
                        }

                        {/* Tabs with different orchestration services */}
                        <Tabs className="h-100" onSelect={(tab) => SetChosenTab(tab)}>
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName={styles.active}> Source Systems </Tab>
                                <Tab className={classTab} selectedClassName={styles.active}> Data Mappings </Tab>
                                <Tab className={classTab} selectedClassName={styles.active}> Machine Annotation Services </Tab>
                            </TabList>

                            {/* Source Systems */}
                            <TabPanel className={classTabPanel}>
                                <SourceSystemsOverview />
                            </TabPanel>

                            {/* Mappings */}
                            <TabPanel className={classTabPanel}>
                                <DataMappingsOverview />
                            </TabPanel>

                            {/* Machine Annotation Services */}
                            <TabPanel className={classTabPanel}>
                                <MasOverview />
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;