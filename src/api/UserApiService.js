import { apiClient } from "./ApiClient";

// const authContext = useAuth();

export const retrieveAllUsersApi = (token) =>
    apiClient.get("/admin/listusers", {headers: { Authorization: token}});

export const deleteUserApi = (id, token) =>
    apiClient.delete(`/admin/listusers/${id}`, {headers: { Authorization: token}});

export const retrieveUserLevelApi = () =>
    apiClient.get("/user");