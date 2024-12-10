/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { JSONResult } from "app/Types";


const GetDataMapping = async (handle: string) => {
    let dataMapping: DataMapping | undefined;

    if (handle) {
        const endPoint = `/data-mapping/v1/${handle}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            dataMapping = data.data.attributes as DataMapping;
        } catch (error) {
            console.warn(error);
        }
    }

    return dataMapping;
};

export default GetDataMapping;