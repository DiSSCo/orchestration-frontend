import React from "react";
import {Table} from "react-bootstrap";
import {ModalForm} from "./ModalForm";
import Job from "./Job";
import {useKeycloak} from "@react-keycloak/web";

const Body = ({jobs}) => {
    const keycloak = useKeycloak().keycloak
    return (
        <div style={{padding: '30px'}}>
            {jobs.length > 0 ?
                <Table striped bordered hover>
                <thead>
                <tr>
                    <th>JobName</th>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>Completion Time</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job, index) =>
                    <Job key={index} job={job} />
                )}
                </tbody>
            </Table>: 'No Jobs'}
            {!!keycloak.authenticated && (
                <ModalForm/>
            )}
        </div>
    )
}
export default Body
