import {Header} from "./header/Header";
import Body from "./body/Body";
import React, {useEffect, useState} from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak/Keycloak";

const App = () => {
    const [jobs, setJobs] = useState([])

    const fetchData = async () => {
        const res = await fetch('/translator', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const data = await res.json()
        console.log(data)
        return data
    }

    useEffect(() => {
        const getData = async () => {
            const dataFromServer = await fetchData()
            setJobs(dataFromServer)
        }
        getData()
    }, [])

    return (
        <div>
            <ReactKeycloakProvider authClient={keycloak}>
                <Header/>
                <Body jobs={jobs} keycloak={keycloak}/>
            </ReactKeycloakProvider>
        </div>
    );
};

export default App;
