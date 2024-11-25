/* Import Dependencies */
import { useEffect } from 'react';
import { Field } from 'formik';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getMappings, setMappings } from 'redux-store/MappingSlice';
import { getEditTarget } from 'redux-store/EditSlice';

/* Import API */
import GetMappings from 'api/mapping/GetMappings';


const MappingSelect = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const mappings = useAppSelector(getMappings);
    const editTarget = useAppSelector(getEditTarget);

    /* OnLoad: Check if Mappings are present in state, otherwise fetch and set */
    useEffect(() => {
        if (isEmpty(mappings)) {
            GetMappings().then((mappings) => {
                dispatch(setMappings(mappings));
            }).catch(error => {
                console.warn(error);
            });
        }
    }, []);

    return (
        <Row className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> Mapping: </p>
                <Field name="mappingId" as="select"
                    className="w-100 formField"
                >
                    {isEmpty(editTarget) &&
                        <option key={'new'} value="new">
                            Add New Mapping
                        </option>
                    }
                    <option key={'choose'} value="" disabled>
                        Choose Mapping
                    </option>

                    {mappings.map((mapping, index) => {
                        const key: string = mapping.name + index;

                        return (
                            <option key={key} value={mapping.id}
                                label={mapping.name}
                            />
                        );
                    })}
                </Field>
            </Col>
        </Row>
    );
}

export default MappingSelect;