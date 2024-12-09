/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';
import { JSONResult, Dict } from 'app/Types';


const PatchDataMapping = async (dataMappingRecord: Dict, handle: string, token?: string) => {
    if (dataMappingRecord && handle && token) {
        let dataMapping = <DataMapping>{};

        const endPoint = `/data-mapping/v1/${handle}`;

        await axios({
            method: "patch",
            url: endPoint,
            data: dataMappingRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Data Mapping */
            const data: JSONResult = result.data;

            dataMapping = data.data.attributes as DataMapping;
        }).catch((error) => {
            console.warn(error);
        });

        return dataMapping;
    }
};

export default PatchDataMapping;