/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';
import { JSONResult, Dict } from 'app/Types';


const InsertDataMapping = async (dataMappingRecord: Dict, token?: string) => {
    if (dataMappingRecord && token) {
        let dataMapping = <DataMapping>{};

        const endPoint = '/data-mapping/v1';

        await axios({
            method: "post",
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

export default InsertDataMapping;