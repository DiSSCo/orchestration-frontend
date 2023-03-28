/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Mapping, JSONResult, Dict } from 'global/Types';

/* Import Model */
import MappingModel from 'api/model/MappingModel';


const PatchMapping = async (mappingRecord: Dict, mappingId: string, token?: string) => {
    if (mappingRecord && token) {
        let mapping = <Mapping>{};

        const endPoint = `/mapping/${mappingId}`;

        await axios({
            method: "patch",
            url: endPoint,
            data: mappingRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Mapping */
            const data: JSONResult = result.data;

            mapping = MappingModel(data.data);
        }).catch((error) => {
            console.warn(error);
        });

        return mapping;
    }
}

export default PatchMapping;