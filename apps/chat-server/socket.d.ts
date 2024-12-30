import "socket.io";

declare module "socket.io" {
    interface Socket {
        decoded: string | JwtPayload | undefined
    }
}
