/* Import Dependencies */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './header.module.scss';

/* Import Webroot */
import DiSSCoLogo from 'webroot/img/dissco-logo-web.svg';

/* Import Components */
import Profile from './components/Profile';


const Header = () => {
    return (
        <Container className={`${styles.header} py-3`}>
            <Row className="h-100">
                <Col className="col-md-auto h-100">
                    <Link to="/">
                        <img src={DiSSCoLogo} className="h-100" />
                    </Link>
                </Col>
                <Col className="col-md-auto d-flex align-items-center">
                    <h1 className={`${styles.title} c-primary`}>Orchestration Services</h1>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                    <Profile />
                </Col>
            </Row>
        </Container>
    );
}

export default Header;