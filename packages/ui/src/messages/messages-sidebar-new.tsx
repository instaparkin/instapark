"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../components/scroll-area";
import { Search } from "lucide-react";
import { Input } from "../components/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";
import { Button } from "../components/button";
import { useRouter } from "next/navigation";
import { axios, logger } from "@instapark/utils";
import { useAuth } from "../hooks/use-auth";
import { Contact } from "@instapark/types";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AppDispatch, profileFullname, RootState, useDispatch, useSelector } from "@instapark/state";

dayjs.extend(localizedFormat);

interface MessageSidebarProps {
  receiverId: string;
}

interface ContactBubbleProps {
  contact: Contact;
}

const ContactBubble: React.FC<ContactBubbleProps> = ({ contact }) => {
  const router = useRouter();

  const handleContactSelect = () => {
    router.push(`/messages/${contact.contactUserId}`);
  };

  const data = useSelector((state: RootState) => state.profile.data)

  return (
    <Button
      variant={"ghost"}
      className="flex items-center gap-3 py-3 md:p-3 cursor-pointer"
      onClick={handleContactSelect}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage />
        <AvatarFallback>?</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 ">
        <div className="flex justify-between items-baseline">
          <p className="font-medium truncate">{data?.firstname}</p>
          <span className="text-xs text-muted-foreground">
            {dayjs(contact.lastMessaged).format("LT")}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {contact.contactUserId || "No status available"}
        </p>
      </div>
    </Button>
  );
};

export const MessagesSidebarNew: React.FC<MessageSidebarProps> = ({ receiverId }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { userId } = useAuth()!;

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8084/contacts/get/${userId}`)
      .then((res) => {
        dispatch(profileFullname(userId))
        setContacts(res.data)
      })
      .catch((error) => {
        logger.error(error);
      })
  }, []);

  return (
    <div className="w-full md:w-[320px] md:border-r flex flex-col py-4 md:p-4">
      {/* Search Bar */}
      <div className="relative pb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search or start a new chat"
          className="pl-9 bg-secondary"
        />
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {contacts.map((contact, index) => (
            <ContactBubble key={contact.contactUserId || index} contact={contact} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
