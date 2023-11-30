import { load } from "./load";

export function authorizeToken(validToken, unvalidToken) {
    const token = load("token");
    if(token) {
        validToken();
    }
    else {
        unvalidToken();
    };
};