export const GLOBAL_CONFIG = {
  SERVERS: {
    CHAT_SERVER: "",
    AUTH_SERVER: ""
  },
  CHAT_SERVER: {
    CONNECTION_EVENT: "connect",
    DISCONNECTION_EVENT: "disconnect",
    MESSAGE_EVENT: "MESSAGE",
    PSTATUS_EVENT: "PSTATUS", //Presense of the user (online / offline)
    UNREAD_EVENT: "UNREAD",
    READ_EVENT: "READ",
    CONNECT_TO_EVENT: "CONNECT_TO",
    MSTATUS_EVENT: "MSTATUS" // Message status (Sent / delivered / Read)
  }
}
