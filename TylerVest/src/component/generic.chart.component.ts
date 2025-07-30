import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoanFormData } from './investments.component'; // adjust path
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-generic-loan-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <ng-container *ngIf="chartOptions as opts">
      <apx-chart
        [series]="opts.series"
        [chart]="opts.chart"
        [xaxis]="opts.xaxis"
        [title]="opts.title">
      </apx-chart>
    </ng-container>
    <div *ngIf="!chartOptions" class="text-gray-500">No loan data to display.</div>
  `
})
export class GenericLoanChartComponent implements OnChanges {
  @Input() loans: LoanFormData[] = [];
  chartOptions: ChartOptions | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.loans && this.loans.length > 0) {
      this.chartOptions = this.calculateChart(this.loans);
    } else {
      this.chartOptions = null;
    }
  }

  private calculateChart(loans: LoanFormData[]): ChartOptions {
    // Use the maximum term among all loans for X axis
    const maxNumPayments = Math.max(...loans.map(l => l.NumPayments));
    const months = Array.from({ length: maxNumPayments }, (_, i) => `Month ${i + 1}`);

    const series = loans.map(loan => {
      const monthlyRate = loan.InterestRate / 12;
      const numPayments = loan.NumPayments;
      const monthlyPayment = loan.Principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments));

      let remaining = loan.Principal;
      const balances: number[] = [];
      for (let i = 1; i <= maxNumPayments; i++) {
        if (i <= numPayments) {
          const interest = remaining * monthlyRate;
          const principalPayment = monthlyPayment - interest;
          remaining = Math.max(0, remaining - principalPayment);

          balances.push(Number(remaining.toFixed(2)));
        } else {
          balances.push(0); // pad with 0 after loan is paid off
        }
      }
      return {
        name: loan.LoanName,
        data: balances
      };
    });

    return {
      series,
      chart: { type: 'line', height: 350 },
      xaxis: { categories: months },
      title: { text: 'Amortization For All Loans' }
    };
  }
}