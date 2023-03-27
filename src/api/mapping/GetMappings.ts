/* Import Dependencies */
import axios from "axios";

/* Import Model */
import MappingModel from "api/model/MappingModel";

/* Import Types */
import { Mapping, JSONResult, Dict } from "global/Types";


const GetMappings = async () => {
    let mappings = <Mapping[]>[];

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

        const data: JSONResult = result.data;

        Object.values(data.data).forEach((mapping) => {
            mappings.push(MappingModel(mapping as Dict));
        });
    } catch (error) {
        console.warn(error);
    }

    return mappings;
}

export default GetMappings;