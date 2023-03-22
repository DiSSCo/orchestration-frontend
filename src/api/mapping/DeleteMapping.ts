/* Import Dependencies */
import axios from 'axios';


const DeleteMapping = async (handle?: string, token?: string) => {
    if (handle && token) {
        let response;

        const endPoint = `mapping/${handle}`;

        await axios({
            method: "delete",
            url: endPoint,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(() => {
            response = true;
        }).catch((error) => {
            console.warn(error);
        });

        return response;
    }
}

export default DeleteMapping;