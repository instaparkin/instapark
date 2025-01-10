'use client';

import { MessagesSidebarNew } from "./messages-sidebar-new";
import { MessagesChatNew } from "./messages-chat-new";
import { Page } from "../components/page";

interface WhatsAppInterfaceProps {
  receiverId: string;
}
export const WhatsAppInterface: React.FC<WhatsAppInterfaceProps> = ({ receiverId }) => {
  return (
    <Page className="pb-0">
      <div className="flex relative top-0 h-[calc(100vh-5.5rem)]">
        <MessagesSidebarNew receiverId={receiverId} />
        <MessagesChatNew receiverId={receiverId} />
      </div >
    </Page>
  );
};
