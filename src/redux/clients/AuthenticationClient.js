import ApiClient from "./ApiClient";

export default class AuthenticationClient extends ApiClient {
    registerUser = user => {
        const promise = this.post(`users/`, user);
        return promise;
    };

    updateUser = (user, userId) => {
        const promise = this.patch(`users/${userId}`, user);
        return promise;
    };

    getUserByUniqueUserToken = sub => {
        const promise = this.get(`users/?sub=${sub}`);
        return promise;
    };
}
