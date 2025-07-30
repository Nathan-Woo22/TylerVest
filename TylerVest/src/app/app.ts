import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageSenderComponent } from '../component/MessageSenderComponent';
import { NavigationComponent } from '../component/nav.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NavigationComponent, MessageSenderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TylerVest');
}
