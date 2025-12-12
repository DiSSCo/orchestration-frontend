/* Import Dependencies */
import { useEffect } from 'react';
import { Field } from 'formik';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/Hooks';
import { getDataMappings, setDataMappings } from 'redux-store/DataMappingSlice';
import { getEditTarget } from 'redux-store/EditSlice';

/* Import API */
import GetDataMappings from 'api/dataMapping/GeDatatMappings';

interface Props {
    /* Visual indicator for required fields (no form validation logic) */
    required?: boolean
};

const DataMappingSelect = (props: Props) => {
    const { required } = props;
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const dataMappings = useAppSelector(getDataMappings);
    const editTarget = useAppSelector(getEditTarget);

    /* OnLoad: Check if Mappings are present in state, otherwise fetch and set */
    useEffect(() => {
        if (isEmpty(dataMappings)) {
            GetDataMappings().then((dataMappings) => {
                dispatch(setDataMappings(dataMappings));
            }).catch(error => {
                console.warn(error);
            });
        }
    }, []);

    return (
        <Row className="mt-2">
            <Col>
                <p className="ms-1 mb-1"> 
                    Data Mapping:
                    {required && <span className="text-danger"> *</span>}
                </p>
                <Field name="dataMappingId" as="select"
                    className="w-100 formField"
                >
                    {isEmpty(editTarget) &&
                        <option key={'new'} value="new">
                            Add New Data Mapping
                        </option>
                    }
                    <option key={'choose'} value="" disabled>
                        Choose Data Mapping
                    </option>

                    {dataMappings.map((dataMapping, index) => {
                        const key: string = (dataMapping['schema:name'] ?? dataMapping['schema:identifier']) + index;

                        return (
                            <option key={key} value={dataMapping['@id']}
                                label={dataMapping['schema:name'] ?? dataMapping['schema:identifier']}
                            />
                        );
                    })}
                </Field>
            </Col>
        </Row>
    );
}

export default DataMappingSelect;