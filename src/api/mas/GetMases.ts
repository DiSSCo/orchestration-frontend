/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { JSONResultArray } from "app/Types";


const GetMases = async () => {
    let machineAnnotationServices = <MachineAnnotationService[]>[];

    const endPoint = "/mas/v1"

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

        data.data.forEach((machineAnnotationService) => {
            machineAnnotationServices.push(machineAnnotationService.attributes as MachineAnnotationService);
        });
    } catch (error) {
        console.warn(error);
    }

    return machineAnnotationServices;
};

export default GetMases;