import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

export interface IncomeData {
  TotalCharges: number;
  UnpaidBalances: number;
  UnpaidPayment: number;
}

@Component({
  selector: 'app-income-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  styleUrls: ['./income.chart.component.css'],
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
export class IncomeChartComponent implements OnInit {
  // const myIncomes: IncomeData[] = [
  //   {   
  //     TotalCharges: 1703958837.27,
  //     UnpaidBalances: 1647116906.27,
  //     UnpaidPayment: 43953.29
  //   }
  // ];
  @Input() income: IncomeData[] = [];
  @Input() isHomeScreen: boolean = false;

  chartOptions: ChartOptions | null = null;

  ngOnInit() {
    this.chartOptions = this.calculateMonthlyIncomeChart();
    // if (this.income && this.income.length > 0){
    //   this.chartOptions = this.calculateNewChart(this.income);
    // }
    //  else {
    //   this.chartOptions = null;
    // }
  }

  // private calculateChart(loans: LoanFormData[]): ChartOptions {
  //   // Use the maximum term among all loans for X axis
  //   const maxNumPayments = Math.max(...loans.map(l => l.NumPayments));
  //   const months = Array.from({ length: maxNumPayments }, (_, i) => `Month ${i + 1}`);

  //   const series = loans.map(loan => {
  //     const monthlyRate = loan.InterestRate / 12;
  //     const numPayments = loan.NumPayments;
  //     const monthlyPayment = loan.Principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments));

  //     let remaining = loan.Principal;
  //     const balances: number[] = [];
  //     for (let i = 1; i <= maxNumPayments; i++) {
  //       if (i <= numPayments) {
  //         const interest = remaining * monthlyRate;
  //         const principalPayment = monthlyPayment - interest;
  //         remaining = Math.max(0, remaining - principalPayment);

  //         balances.push(Number(remaining.toFixed(2)));
  //       } else {
  //         balances.push(0); // pad with 0 after loan is paid off
  //       }
  //     }

  //     return {
  //       name: loan.LoanName,
  //       data: balances
  //     };
  //   });
  //     const aggregateBalances: number[] = [];
  //     for (let i = 0; i < maxNumPayments; i++) {
  //       const totalAtMonth = series.reduce((sum, loanSeries) => sum + loanSeries.data[i], 0);
  //       aggregateBalances.push(Number(totalAtMonth.toFixed(2)));
  //     }
  //     // Add aggregate series
  //     series.push({
  //       name: 'Total Outstanding',
  //       data: aggregateBalances
  //     });

  //   return {
  //     series,
  //     chart: { type: 'line', height: 350 },
  //     stroke: {
  //       width: [2, 2, 2, 2, 4], // Make last line (aggregate) thicker
  //       dashArray: [0, 0, 0, 0, 5] // Make last line dashed
  //     },
  //     xaxis: { categories: months },
  //     title: { text: 'Loan Estimate' }
  //   };
  // }

  private calculateMonthlyIncomeChart(months: number = 12): ChartOptions {
    const incomes = [
      {
        TotalCharges: 1703958837.27,
        UnpaidBalances: 1647116906.27,
        UnpaidPayment: 43953.29
      }
    ];
    const income = incomes[0];
  
    function splitMonotonicDecreasing(total: number, months: number): number[] {
      const vals: number[] = [];
      let remaining = total;
      let lastValue = total;
      for (let i = 0; i < months; i++) {
        // Decrease by a random 5-15% from last
        let factor = 0.85 + Math.random() * 0.1; // between 0.85 and 0.95
        let value: number;
        if (i === months - 1) {
          value = remaining;
        } else {
          value = lastValue * factor;
          value = +value.toFixed(2);
          if (value < 0) value = 0;
        }
        vals.push(value);
        remaining -= (lastValue - value);
        lastValue = value;
      }
      return vals;
    }
  
    // Generate monthly data for each series
    const totalChargesData   = splitMonotonicDecreasing(income.TotalCharges, months);
    const unpaidBalancesData = splitMonotonicDecreasing(income.UnpaidBalances, months);
    const unpaidPaymentsData = splitMonotonicDecreasing(income.UnpaidPayment, months);
  
    // Calculate monthly sum for "Total Monthly Income"
    const totalMonthlyIncome: number[] = [];
    for (let i = 0; i < months; i++) {
      totalMonthlyIncome.push(
        Number(
          totalChargesData[i] + unpaidBalancesData[i] + unpaidPaymentsData[i]
        )
      );
    }
  
    // Month labels
    const categories = Array.from({ length: months }, (_, idx) => `Month ${idx + 1}`);
  
    return {
      series: [
        { name: 'Charges',    data: totalChargesData },
        { name: 'Unpaid Balances',  data: unpaidBalancesData },
        { name: 'Unpaid Payment',   data: unpaidPaymentsData },
        { name: 'Total Monthly Income', data: totalMonthlyIncome }
      ],
      chart: { type: 'line', height: 350 },
      stroke: { width: 2 },
      xaxis: { categories },
      yaxis: { logarithmic: true },
      tooltip: {
        style: {
          fontSize: '14px',
          // color: '#000' // black text on tooltip
        }
      },
      title: { text: 'Monthly Income Over Time' }
    };
  }
}