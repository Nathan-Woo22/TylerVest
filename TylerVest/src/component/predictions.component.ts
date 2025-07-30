import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './predictions.tmpl.html',
  styleUrls: ['./predictions.component.css'],
})
export class PredictionsComponent implements OnInit {

  newPrediction1: string = '';
  newPrediction2: string = '';

  loans: string[] = ['All']; // Default option
  selectedLoan: string = 'All';

  ngOnInit() {
    fetch('/TestPage.aspx?op=retrieveAllLoanInfo')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.loans = ['All', ...data]; // Merge 'All' with fetched loans
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching loan names:', error));
  }

  chartOptions: ApexOptions = {
    chart: {
      type: 'line',
    },
    series: [
      {
        name: 'Growth (%)',
        data: [5, 10, 15, 20],
      },
    ],
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    title: {
      text: 'Growth Forecast',
    } as ApexTitleSubtitle,
  };

  addPredictions() {
    if (this.newPrediction1.trim() || this.newPrediction2.trim()) {
      console.log('First Prediction:', this.newPrediction1);
      console.log('Second Prediction:', this.newPrediction2);
      this.newPrediction1 = '';
      this.newPrediction2 = '';
    }
  }

  onCategoryChange(category: string) {
    this.selectedLoan = category;
    console.log('Select a Loan to Evaluate:', category);
  }
}