// in your home.component.ts or similar
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanFormData } from './investments.component'; // Adjust import
import { GenericLoanChartComponent } from './generic.chart.component';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, GenericLoanChartComponent],
  standalone: true,
  templateUrl: './home.tmpl.html'
})
export class HomeComponent implements OnInit {
  loans: LoanFormData[] = [];

  async addPredictions() {
    try {
      const response = await fetch('http://pladvsvwebapp/TylerVest/TylerVest.aspx?op=retrieveAllLoanInfo');
      const data = await response.json();
      this.loans = Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  ngOnInit() {
    this.addPredictions();
  }
}