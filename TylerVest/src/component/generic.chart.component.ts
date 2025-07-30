import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexStroke, NgApexchartsModule } from 'ng-apexcharts';
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
  stroke: ApexStroke;
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
      this.chartOptions = this.calculateNewChart(this.loans);
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
      const aggregateBalances: number[] = [];
      for (let i = 0; i < maxNumPayments; i++) {
        const totalAtMonth = series.reduce((sum, loanSeries) => sum + loanSeries.data[i], 0);
        aggregateBalances.push(Number(totalAtMonth.toFixed(2)));
      }
      // Add aggregate series
      series.push({
        name: 'Total Outstanding',
        data: aggregateBalances
      });

    return {
      series,
      chart: { type: 'line', height: 350 },
      stroke: {
        width: [2, 2, 2, 2, 4], // Make last line (aggregate) thicker
        dashArray: [0, 0, 0, 0, 5] // Make last line dashed
      },
      xaxis: { categories: months },
      title: { text: 'Amortization For All Loans' }
    };
  }

  private calculateNewChart(loans: LoanFormData[]): ChartOptions {
      const maxNumPayments = Math.max(...loans.map(l => l.NumPayments));
    const months = Array.from({ length: maxNumPayments }, (_, i) => `Month ${i + 1}`);

    // Calculate loan balances (negative values)
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
          
          balances.push(-Number(remaining.toFixed(2))); // Make negative
        } else {
          balances.push(0);
        }
      }

      return {
        name: loan.LoanName + ' (Debt)',
        data: balances
      };
    });

    // Add income series (positive values)
    const monthlyIncome = 5000; // You can make this configurable
    const incomeData = Array(maxNumPayments).fill(monthlyIncome);
    
    series.push({
      name: 'Monthly Income',
      data: incomeData
    });

    // Calculate net position (income - total debt)
    const aggregateDebt: number[] = [];
    for (let i = 0; i < maxNumPayments; i++) {
      const totalDebtAtMonth = series.slice(0, -1).reduce((sum, loanSeries) => sum + Math.abs(loanSeries.data[i]), 0);
      const netPosition = monthlyIncome - totalDebtAtMonth;
      aggregateDebt.push(Number(netPosition.toFixed(2)));
    }

    series.push({
      name: 'Net Position',
      data: aggregateDebt
    });

    return {
      series,
      chart: { type: 'line', height: 350 },
      stroke: {
        width: [2, 2, 2, 2, 3, 4],
        dashArray: [0, 0, 0, 0, 0, 5]
      },
      //colors: ['#FF6B6B', '#FF8E8E', '#FFB3B3', '#FFC0C0', '#4CAF50', '#2196F3'],
      xaxis: { categories: months },
      // yaxis: {
      //   labels: {
      //     formatter: function(val) {
      //       return val >= 0 ? '+$' + val.toLocaleString() : '-$' + Math.abs(val).toLocaleString();
      //     }
      //   }
      // },
      title: { text: 'Cash Flow Analysis: Debt vs Income' }
    };
  }
}