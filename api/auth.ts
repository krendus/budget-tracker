import axios from "./axios";

export const register = (body: any) => {
    return axios.post("/auth/register", body)
}

export const login = (body: any) => {
    return axios.post("/auth/login", body)
}

export const verifyEmail = (body: any) => {
    return axios.post("/auth/verify-email", body)
}

export const forgotPassword = (body: any) => {
    return axios.post("/auth/forgot-password", body)
}

export const resetPassword = (body: any) => {
    return axios.post("/auth/reset-password", body)
}

export const resendEmailVerification = (body: any) => {
    return axios.post("/auth/resend-email-verification", body)
}

export const fetchAccount = () => {
    return axios.get("/user/me")
}
