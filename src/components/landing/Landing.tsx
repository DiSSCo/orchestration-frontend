/* Import Components */
import KeycloakService from 'app/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Webroot */
import DiSSCoLogo from 'webroot/img/dissco-logo-web.svg';


const Landing = () => {
    return (
        <Container className="h-100 ">
            <Row className="h-100 align-items-center">
                <Col>
                    <Row>
                        <Col className="text-center">
                            <h1> DiSSCo Orchestration Services </h1>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 2, offset: 5 }}>
                            <img src={DiSSCoLogo} alt="DiSSCo Logo" />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="text-center">
                            <p> Please login to continue </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <button type="button" className="primaryButton px-3 py-2"
                                onClick={() => KeycloakService.Login()}
                            >
                                Login to DiSSCo
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Landing;