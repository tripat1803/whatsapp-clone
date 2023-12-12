import io from "socket.io-client";

// const SOCKET_URL = "http://localhost:4000";
const SOCKET_URL = "http://192.168.29.14:4000";

class WSService {
    connect() {
        this.socket = io(SOCKET_URL);
    }
    
    on(event, callback) {
        this.socket.on(event, callback);
    }
    
    emit(event, data) {
        this.socket.emit(event, data);
    }

    off(event) {
        this.socket.off(event);
    }

    disconnect() {
        this.socket.disconnect();
    }
}

const SocketService = new WSService();
export default SocketService;