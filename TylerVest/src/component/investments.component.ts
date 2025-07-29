import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageSenderComponent } from './MessageSenderComponent';


interface LoanFormData {
  loanAmount: number;
  interestRate: number;
  term: number;
  lenderName: string;
}

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule, MessageSenderComponent, ReactiveFormsModule ],
  template: `
    <form [formGroup]="loanForm" class="space-y-6">
        <div class="investments-container">
            <header class="investments-header">
                <h1 class="investments-title">Investments</h1>
            </header>
            <div class="text-field-container">
                <label for="textInput" class="text-field-label">Loan Amount</label>
                <input 
                    type="number"
                    id="textInput"
                    class="text-field-input"
                    formControlName="loanAmount"
                />
                <div *ngIf="loanForm.get('loanAmount')?.invalid && loanForm.get('loanAmount')?.touched" 
                    class="text-red-500 text-sm">
                    Loan amount is required and must be greater than 0
                </div>
            </div>

            <div class="text-field-container">
                <label for="textInput" class="text-field-label">Interest Rate</label>
                <input
                    id="textInput" 
                    class="text-field-input"
                    type="number"
                    step="0.01"
                    formControlName="interestRate"
                />

                <div *ngIf="loanForm.get('interestRate')?.invalid && loanForm.get('interestRate')?.touched" 
                    class="text-red-500 text-sm">
                    Interest rate is required and must be greater than 0
                </div>
            </div>

            <div class="text-field-container">
                <label for="textInput" class="text-field-label">Term</label>
                <input 
                    id="term"
                    type="number"
                    formControlName="term"
                    class="text-field-input"
                />

                <div *ngIf="loanForm.get('term')?.invalid && loanForm.get('term')?.touched" 
                    class="text-red-500 text-sm">
                    Term is required and must be greater than 0
                </div>
            </div>

            <div class="text-field-container">
                <label for="textInput" class="text-field-label">Lender Name</label>
                <input 
                    id="lenderName"
                    type="text"
                    formControlName="lenderName"
                    class="text-field-input">

                <div *ngIf="loanForm.get('lenderName')?.invalid && loanForm.get('lenderName')?.touched" 
                    class="text-red-500 text-sm">
                    Lender name is required
                </div>
            </div>



            <div>
                <app-message-sender [loanData]="getFormValues()" [isLoanMessage]="true">
                </app-message-sender>
            </div>

        </div>
    </form>
  `,
  styles: [`
    .investments-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .investments-header {
      margin-bottom: 30px;
      text-align: center;
    }

    .investments-title {
      color: #333;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #e0e0e0;
    }

    .investments-content {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .investments-container {
        padding: 15px;
      }
      
      .investments-title {
        font-size: 1.5rem;
      }
      
      .investments-content {
        padding: 15px;
      }
    }

    .text-field-container {
  margin-bottom: 16px;
}

    .text-field-label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: #333;
    }

    .text-field-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    }

    .text-field-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  `]
})
export class InvestmentsComponent {
    private formBuilder = inject(FormBuilder);

    loanForm: FormGroup;
    calculationResults: {
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    lenderName: string;
    } | null = null;

    constructor() {
        this.loanForm = this.formBuilder.group({
            loanAmount: [0, [Validators.required, Validators.min(1)]],
            interestRate: [0, [Validators.required, Validators.min(0.01)]],
            term: [0, [Validators.required, Validators.min(1)]],
            lenderName: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    getFormValues(): LoanFormData {
        const values = {
            loanAmount: this.loanForm.get('loanAmount')?.value || 0,
            interestRate: this.loanForm.get('interestRate')?.value || 0,
            term: this.loanForm.get('term')?.value || 0,
            lenderName: this.loanForm.get('lenderName')?.value || ''
        }
        console.log('Form values being passed:', values); // Add this line
        return values;
    }

    hasError(controlName: string): boolean {
        const control = this.loanForm.get(controlName);
        return !!(control && control.invalid && control.touched);
    }

    getErrorMessage(controlName: string): string {
        const control = this.loanForm.get(controlName);
        if (control?.errors) {
        if (control.errors['required']) {
            return `${controlName} is required`;
        }
        if (control.errors['min']) {
            return `${controlName} must be greater than ${control.errors['min'].min}`;
        }
        if (control.errors['minlength']) {
            return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
        }
        }
        return '';
  }
}