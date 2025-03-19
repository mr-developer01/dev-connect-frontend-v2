import { io } from "socket.io-client";

export const useCreateSocketConnection = (token: string) => {
    if(!token) return
    return io('https://dev-connect-service.onrender.com', {
        auth: { token },
    })
}