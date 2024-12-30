import "socket.io";

declare module "socket.io" {
  interface Socket {
    query: {
      token: string; // Existing token property
      [key: string]: string; // Allow additional fields
    };
    decoded: {
      sub: string;
    };
  }
}
