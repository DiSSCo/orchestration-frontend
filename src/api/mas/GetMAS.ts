/* Import Dependencies */
import axios from "axios";

/* Import Model */
import MASModel from "api/model/MASModel";

/* Import Types */
import { MAS, JSONResult, Dict } from "global/Types";


const GetMAS = async () => {
    let machineAnnotationServices = <MAS[]>[];

    const endPoint = "/mas"

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

        Object.values(data.data).forEach((machineAnnotationService) => {
            machineAnnotationServices.push(MASModel(machineAnnotationService as Dict));
        });
    } catch (error) {
        console.warn(error);
    }

    return machineAnnotationServices;
}

export default GetMAS;