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

export interface BlobMessage {
  id: string;
  blob: string;
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://pladvsvwebapp/TylerVest/TylerVest.aspx';

  constructor(private http: HttpClient) {}

  sendMessage(message: BlobMessage): void {
    console.log('Sending message:', message.blob);
    this.http.post(this.apiUrl + "?id=" +message.id, message.blob).subscribe({
      next: (response) => {
        console.log('Success! Response:', response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });

    this.http.get(this.apiUrl + "?id=" + message.id).subscribe({
      next: (response) => {
        console.log('Success! Response:', response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
}
