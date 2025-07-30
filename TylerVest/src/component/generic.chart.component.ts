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
  // yaxis: ApexYAxis;
  // tooltip: ApexTooltip;
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
  @Input() isHomeScreen: boolean = false;

  chartOptions: ChartOptions | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.loans && this.loans.length > 0 && this.isHomeScreen) {
      this.chartOptions = this.calculateCountyFinanceChart(this.loans);
    }
    else if (this.loans && this.loans.length > 0){
      this.chartOptions = this.calculateChart(this.loans);
    }
     else {
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
      title: { text: 'Loan Estimate' }
    };
  }

  private calculateCountyFinanceChart(
    // incomes: {TotalCharges: number, UnpaidBalances: number, UnpaidPayment: number}[],
    loans: {LoanName: string, Principal: number, InterestRate: number, NumPayments: number}[],
    months: number = 12
  ): ChartOptions {
  
    const incomes = [
      {
        TotalCharges: 1703958.83727,
        UnpaidBalances: 1647116.90627,
        UnpaidPayment: 43953.29
      }
    ];
    // ==== Generate Income Series ====
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
    // Generate per-month income streams
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
  
    // ==== Generate Loan/Debt Series ====
    // Will show outstanding principal per loan over time (negative values)
    const monthsArray = Array.from({ length: months }, (_, idx) => `Month ${idx + 1}`);
  
    const loanSeries = loans.map(loan => {
      const monthlyRate = loan.InterestRate / 12;
      const numPayments = loan.NumPayments;
      const monthlyPayment = loan.Principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments));
      let remaining = loan.Principal;
      const balances: number[] = [];
      for (let i = 1; i <= months; i++) {
        if (i <= numPayments) {
          const interest = remaining * monthlyRate;
          const principalPayment = monthlyPayment - interest;
          remaining = Math.max(0, remaining - principalPayment);
          balances.push(-Number(remaining.toFixed(2))); // negative, since it's a liability
        } else {
          balances.push(0);
        }
      }
      return {
        name: loan.LoanName + ' (Debt)',
        data: balances
      };
    });
  
    // ==== Calculate Net Position ====
    // Net = sum of income streams - sum of outstanding debts at each month
    const netPosition: number[] = [];
    for (let i = 0; i < months; i++) {
      const totalIncome = totalMonthlyIncome[i];
      // Sum all negative loan balances at this month
      const totalDebt  = loanSeries.reduce((sum, s) => sum + s.data[i], 0);
      // Net = income + (negative debt)
      netPosition.push(Number((totalIncome + totalDebt).toFixed(2)));
    }
  
    // ==== Assemble all series for chart ====
    const allSeries = [
      { name: 'Charges',    data: totalChargesData },
      { name: 'Unpaid Balances',  data: unpaidBalancesData },
      { name: 'Unpaid Payment',   data: unpaidPaymentsData },
      { name: 'Total Monthly Income', data: totalMonthlyIncome },
      ...loanSeries,
      { name: 'Net Position', data: netPosition }
    ];
  
    return {
      series: allSeries,
      chart: { type: 'line', height: 500 },
      stroke: { width: 2 },
      xaxis: { categories: monthsArray,
        // labels: { style: { colors: '#fff', fontSize: '14px' } }
      },
      // yaxis: {
      //   logarithmic: true,
      //   labels: { style: { colors: '#fff', fontSize: '14px' } }
      // },
      // tooltip: { style: { fontSize: '14px' } },
      title: { text: 'Mile-High County Finance Overview' }
    };
  }}