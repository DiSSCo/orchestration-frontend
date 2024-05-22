/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import UserModel from 'api/model/UserModel';

/* Import Types */
import { JSONResult, User } from 'app/Types';


const GetUser = async (userId?: string, token?: string) => {
    if (userId && token) {
        let user = <User>{};

        const endPoint = `users/${userId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                baseURL: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/v1`.replace('-orchestration', '').replace('orchestration', 'sandbox'),
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set User */
            const data: JSONResult = result.data;

            user = UserModel(data);
        } catch (error) {
            console.warn(error);
        }

        return user;
    }
}

export default GetUser;