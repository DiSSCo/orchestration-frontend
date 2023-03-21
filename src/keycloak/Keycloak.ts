/* Import Dependencies */
import Keycloak from "keycloak-js";

/* Import Types */
import { EmptyCallback } from "global/Types";


const keycloak = new Keycloak({
    url: "https://login-demo.dissco.eu/auth",
    realm: "dissco",
    clientId: "orchestration-service"
});

const InitKeyCloak = (callback: EmptyCallback) => {
    keycloak.init({
        onLoad: "login-required",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
        pkceMethod: "S256"
    })
        .then((authenticated) => {
            if (authenticated) {
                callback();
            }
        })
        .catch(console.error);
}

const Login = keycloak.login;

const Logout = keycloak.logout;

const GetToken = () => keycloak.token;

const GetParsedToken = () => keycloak.tokenParsed;

const IsLoggedIn = () => !!keycloak.token;

const UpdateToken = (successCallback: EmptyCallback) =>
    keycloak.updateToken(5)
        .then(successCallback)
        .catch(Login);

const GetSubject = () => keycloak.subject;

const HasRole = (roles: any) => roles.some((role: any) => keycloak.hasRealmRole(role));

const KeycloakService = {
    InitKeyCloak,
    Login,
    Logout,
    IsLoggedIn,
    GetToken,
    GetParsedToken,
    GetSubject,
    UpdateToken,
    HasRole
};

export default KeycloakService;