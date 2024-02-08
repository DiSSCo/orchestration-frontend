/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { Mapping, JSONResult } from "app/Types";


const GetMapping = async (mappingId: string) => {
    let mapping: Mapping | undefined;

    if (mappingId) {
        const endPoint = `/mapping/${mappingId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            mapping = data.data.attributes as Mapping;
        } catch (error) {
            console.warn(error);
        }
    }

    return mapping;
}

export default GetMapping;