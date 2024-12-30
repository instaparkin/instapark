import { Contact } from "../models/contacts.model";
import { Message } from "../models/messages.model";

const syncIndexes = async () => {
    try {
      await Message.syncIndexes(); // This will create the unique index
      console.log("Indexes synced successfully");
    } catch (err) {
      console.error("Error syncing indexes:", err);
    }
  };
  
  syncIndexes();
  