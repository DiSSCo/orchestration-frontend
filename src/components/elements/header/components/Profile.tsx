/* Import Dependencies */
import KeycloakService from 'app/Keycloak';
import { Row, Col, Dropdown } from 'react-bootstrap';


const Profile = () => {
    /* Handling Dropdown */
    const OnSelect = (eventKey: string | null) => {
        switch (eventKey) {
            case '1':
                window.open(`${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/profile`.replace('-orchestration', '').replace('orchestration', 'sandbox'), '_blank', 'noopener');
                break;
            case '2':
                KeycloakService.Logout();
                break;
            default:
                break;
        }
    };

    if (KeycloakService.IsLoggedIn()) {
        return (
            <Row>
                <Col md={{ span: 12 }} className="mt-1">
                    <Row className="justify-content-end">
                        <Dropdown onSelect={(eventKey: string | null, _e: React.SyntheticEvent<unknown>) =>
                            OnSelect(eventKey)
                        }>
                            <Dropdown.Toggle>
                                <span className="text-end textOverflow">
                                    {`${KeycloakService.GetParsedToken()?.given_name?.[0]}. ${KeycloakService.GetParsedToken()?.family_name}`}
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" className="px-3"> Profile </Dropdown.Item>
                                <Dropdown.Item eventKey="2" className="px-3"> Log-out </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
        );
    } else {
        return (
            <button type="button"
                className="button-no-style"
                onClick={() => KeycloakService.Login()}
            >
                <p className="fs-4">
                    Login / Sign-up
                </p>
            </button>
        );
    }
};

export default Profile;