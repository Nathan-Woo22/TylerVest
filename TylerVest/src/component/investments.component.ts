import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageSenderComponent } from './MessageSenderComponent';


interface LoanFormData {
  loanAmount: number;
  interestRate: number;
  term: number;
  lenderName: string;
  loanName: string;
}

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule, MessageSenderComponent, ReactiveFormsModule ],
  templateUrl: './investments.tmpl.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {
    private formBuilder = inject(FormBuilder);

    loanForm: FormGroup;
    calculationResults: {
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
    lenderName: string;
    loanName: string;
    } | null = null;

    constructor() {
        this.loanForm = this.formBuilder.group({
            loanAmount: [0, [Validators.required, Validators.min(1)]],
            interestRate: [0, [Validators.required, Validators.min(0.01)]],
            term: [0, [Validators.required, Validators.min(1)]],
            lenderName: ['', [Validators.required, Validators.minLength(2)]],
            loanName: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    getFormValues(): LoanFormData {
        const values = {
            loanAmount: this.loanForm.get('loanAmount')?.value || 0,
            interestRate: this.loanForm.get('interestRate')?.value || 0,
            term: this.loanForm.get('term')?.value || 0,
            lenderName: this.loanForm.get('lenderName')?.value || '',
            loanName: this.loanForm.get('loanName')?.value || ''
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