/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { JSONResult } from "app/Types";


const GetMapping = async (mappingId: string) => {
    let mapping: DataMapping | undefined;

    if (mappingId) {
        const endPoint = `/mapping/${mappingId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            mapping = data.data.attributes as DataMapping;
        } catch (error) {
            console.warn(error);
        }
    }

    return mapping;
};

export default GetMapping;