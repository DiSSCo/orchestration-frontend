/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { MAS, JSONResult } from "app/Types";


const GetMAS = async (MASId: string) => {
    let MAS: MAS | undefined;

    if (MASId) {
        const endPoint = `/mas/${MASId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            MAS = {
                ...data.data.attributes,
                id: data.data.id
            } as MAS;
        } catch (error) {
            console.warn(error);
        }
    }

    return MAS;
}

export default GetMAS;