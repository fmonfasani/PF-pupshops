export interface ChatResponse {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    replies: ChatResponse[];
  }
  