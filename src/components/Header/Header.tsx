/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './header.module.scss';

/* Import Webroot */
import DiSSCoLogo from 'webroot/img/dissco-logo-web.svg';


const Header = () => {
    return (
        <Container className={`${styles.header} py-3`}>
            <Row className="h-100">
                <Col className="col-md-auto h-100">
                    <img src={DiSSCoLogo} className="h-100" />
                </Col>
                <Col className="col-md-auto d-flex align-items-center">
                    <h1 className={styles.title}>Orchestration Service</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;