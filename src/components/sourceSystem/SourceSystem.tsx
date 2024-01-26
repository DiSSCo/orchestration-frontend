/* Import Dependencies */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getSourceSystem, setSourceSystem } from 'redux/sourceSystem/SourceSystemSlice';

/* Import Components */
import IDCard from 'components/general/IDCard/IDCard';

/* Import API */
import GetSourceSystem from 'api/sourceSystem/GetSourceSystem';


const SourceSystem = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const sourceSystem = useAppSelector(getSourceSystem);

    /* OnLoad: fetch Source System */
    useEffect(() => {
        const sourceSystemId = `${params.prefix}/${params.suffix}`;

        if (!sourceSystem || sourceSystem.id !== sourceSystemId) {
            GetSourceSystem(sourceSystemId).then((sourceSystem) => {
                if (sourceSystem) {
                    /* Set Source System */
                    dispatch(setSourceSystem(sourceSystem));
                } else {
                    /* Not found: return to Home */
                    navigate('/');
                }
            })
        }
    }, []);

    return (
        <div className="h-100 overflow-hidden">
            {sourceSystem &&
                <Row>
                    <Col lg={{ span: 3 }}>
                        <IDCard identifier={sourceSystem?.id}
                            IDCardProperties={{
                                name: sourceSystem.name,
                                endpoint: sourceSystem.endpoint,
                                description: sourceSystem.description,
                                created: sourceSystem.created
                            }}
                        />
                    </Col>
                </Row>
            }
        </div>
    );
}

export default SourceSystem;