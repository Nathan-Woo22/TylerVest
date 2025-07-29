import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageSenderComponent } from '../component/MessageSenderComponent';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , MessageSenderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TylerVest');
}
