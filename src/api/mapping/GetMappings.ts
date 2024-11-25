/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { JSONResultArray } from "app/Types";


const GetMappings = async () => {
    let mappings = <DataMapping[]>[];

    const endPoint = "/mapping"

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

        data.data.forEach((mapping) => {
            mappings.push(mapping.attributes as DataMapping);
        });
    } catch (error) {
        console.warn(error);
    }

    return mappings;
};

export default GetMappings;