import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface for message data
export interface Message {
  id?: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {}

  /**
   * Sends a message by logging it to the console
   * @param message - The message object to send
   */
  sendMessage(message: Message): void {
    // Add timestamp if not provided
    const messageWithTimestamp: Message = {
      ...message,
      timestamp: message.timestamp || new Date()
    };

    console.log('Message sent:', messageWithTimestamp);

      this.http.post('https://jsonplaceholder.typicode.com/posts', messageWithTimestamp).subscribe({
      next: (response) => {
        console.log('Success! Response:', response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

    private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}