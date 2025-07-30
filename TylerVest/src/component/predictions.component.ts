import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './predictions.tmpl.html',
  styleUrls: ['./predictions.component.css'],
})
export class PredictionsComponent {

  newPrediction1: string = '';
  newPrediction2: string = '';

  categories: string[] = ['All', 'Loan1', 'Loan2', 'Loan3'];
  selectedCategory: string = 'All';

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
    this.selectedCategory = category;
    console.log('Select a Loan to Evaluate:', category);
  }
}