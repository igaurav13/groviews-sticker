export type ChatUser = {
  id: string;
  name: string;
  email: string;
};

export type ChatMessage = {
  id: string;          
  clientId?: string;  
  text: string;
  sender: "user" | "admin";
  status: "sending" | "sent" | "read";
  createdAt: number;
};
