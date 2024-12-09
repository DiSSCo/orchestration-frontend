/* Import Dependencies */
import axios from 'axios';


const DeleteSourceSystem = async (handle?: string, token?: string) => {
    if (handle && token) {
        let response;

        const endPoint = `source-system/v1/${handle}`;

        await axios({
            method: "delete",
            url: endPoint,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(() => {
            response = true;
        }).catch((error) => {
            console.warn(error);
        });

        return response;
    }
};

export default DeleteSourceSystem;