import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useKeycloak} from "@react-keycloak/web";

export function Header() {
    const { keycloak } = useKeycloak();

    return (
        <>
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">DiSSCo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    {!keycloak.authenticated && (
                        <Nav.Link
                            className="justify-content-end"
                            onClick={() => keycloak.login()}
                        >
                            Login
                        </Nav.Link>
                    )}
                    {!!keycloak.authenticated && (
                        <Nav.Link
                            className="justify-content-end"
                            onClick={() =>  keycloak.logout()}
                        >
                            Logout ({keycloak.tokenParsed.sub})
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}