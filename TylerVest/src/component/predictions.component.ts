import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { GenericLoanChartComponent } from './generic.chart.component';
import { LoanFormData } from './investments.component';
import { IncomeData } from './income.chart.component'
import { IncomeChartComponent } from './income.chart.component';


@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, GenericLoanChartComponent, IncomeChartComponent],
  templateUrl: './predictions.tmpl.html',
  styleUrls: ['./predictions.component.css'],
})
export class PredictionsComponent{

    loans: LoanFormData[] = [];

    income: IncomeData[] = [];
    
  
    async loadGraph() {
      try {
        const response = await fetch('http://pladvsvwebapp/TylerVest/TylerVest.aspx?op=retrieveAllLoanInfo');
        const data = await response.json();
        this.loans = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  
    ngOnInit() {
      this.loadGraph();
    }
  // export class PredictionsComponent {

  newPrediction1: string = '';
  newPrediction2: string = '';

  //loans: string[] = ['All']; // Default option
  selectedLoan: string = 'All';

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

  async addPredictions() {
    try {
      const response = await fetch('http://pladvsvwebapp/TylerVest/TylerVest.aspx?op=retrieveAllLoanInfo');
      const data = await response.json();
      console.log(data);
      // Update your component state here
    } catch (error) {
      console.error('Error:', error);
    }
    // if (this.newPrediction1.trim() || this.newPrediction2.trim()) {
    //   console.log('First Prediction:', this.newPrediction1);
    //   console.log('Second Prediction:', this.newPrediction2);
    //   this.newPrediction1 = '';
    //   this.newPrediction2 = '';
    // }
  }

  onCategoryChange(category: string) {
    this.selectedLoan = category;
    console.log('Select a Loan to Evaluate:', category);
  }
}