import { WebSocketServer, WebSocket, Server, createWebSocketStream} from "ws";
import { runCommand } from "./cli";

interface WsServerOptions {
    port: number;
}

export class WSServer {
    server: Server<WebSocket> | null;

    constructor(options: WsServerOptions) {
        this.server = new WebSocketServer(options);

        this.server.on('connection', function connection(ws) {

            const duplex = createWebSocketStream(ws, { decodeStrings: false });
            duplex.on('data', async (data) => {
              console.log('received: %s', data);
              const responce = await runCommand(data.toString());
              const msg = responce? responce.data : '';
             
              duplex.write(`${data.toString().split(' ')[0]} ${msg}`);
            });
            duplex.on('close', () => { 
              console.log("the duplex channel has closed");
            });
        }); 
    }
}

