import { createContext, useEffect, useState } from "react";
import SocketService from "../utils/Socket";

export const SocketContext = createContext();
export default function SocketProvider({ children }) {

    const [chats, setChats] = useState({});

    useEffect(() => {
        SocketService.connect();
        SocketService.on("connect", () => {
            console.log("connected");
        });
        SocketService.on("disconnect", () => {
            console.log("disconnected");
        });

        return () => {
            SocketService.disconnect();
        }
    }, []);

    useEffect(() => {
        SocketService.on("6510306afe6b366d3cf1fd9f", (data) => {
            let key = data['sender_id'];
            setChats((prev) => ({...prev, [key]: chats[key] ? [...chats[key], data] : [data]}))
        });
    }, []);

    return (
        <SocketContext.Provider value={{ chats }}>
            {children}
        </SocketContext.Provider>
    )
}