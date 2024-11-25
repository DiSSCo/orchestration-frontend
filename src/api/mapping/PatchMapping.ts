/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';
import { JSONResult, Dict } from 'app/Types';


const PatchMapping = async (mappingRecord: Dict, mappingId: string, token?: string) => {
    if (mappingRecord && token) {
        let mapping = <DataMapping>{};

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

            mapping = data.data.attributes as DataMapping;
        }).catch((error) => {
            console.warn(error);
        });

        return mapping;
    }
};

export default PatchMapping;