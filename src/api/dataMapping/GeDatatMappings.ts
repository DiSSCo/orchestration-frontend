/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { JSONResultArray } from "app/Types";


const GetDataMappings = async () => {
    let dataMappings = <DataMapping[]>[];

    const endPoint = "/data-mapping/v1"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                pageSize: 50
            },
            responseType: 'json'
        });

        const data: JSONResultArray = result.data;

        data.data.forEach((dataMapping) => {
            dataMappings.push(dataMapping.attributes as DataMapping);
        });
    } catch (error) {
        console.warn(error);
    }

    return dataMappings;
};

export default GetDataMappings;