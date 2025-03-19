import { io } from "socket.io-client";

export const useCreateSocketConnection = (token: string) => {
    if(!token) return
    return io(import.meta.env.VITE_HOST_URL_SOCKET, {
        auth: { token },
    })
}