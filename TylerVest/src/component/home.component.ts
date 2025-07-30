import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.tmpl.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {}
}