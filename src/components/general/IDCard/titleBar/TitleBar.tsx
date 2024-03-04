/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';


/* Props Typing */
interface Props {
    title: string,
    subTitle: string
};


const TitleBar = (props: Props) => {
    const { title, subTitle } = props;

    return (
        <Row>
            <Col>
                <p className="c-secondary fw-lightBold"> {subTitle} </p>
                <h1 className="title mt-2"> {title} </h1>
            </Col>
        </Row>
    );
}

export default TitleBar;