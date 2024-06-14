import { apiClient } from "./ApiClient";

export const executeJwtAuthenticationService = (username, password) =>
    apiClient.post(`/authenticate/login`, {username, password});

export const executeRegisterService = (username, password) =>
    apiClient.post(`/authenticate/register`, {username, password});