import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageSenderComponent } from './MessageSenderComponent';


export interface LoanFormData {
  Principal: number;
  InterestRate: number;
  NumPayments: number;
  StartDate: string;
  LoanName: string;
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
    principal: number;
    interestRate: number;
    numPayments: number;
    startDate: string;
    loanName: string;
    } | null = null;

    constructor() {
        this.loanForm = this.formBuilder.group({
            principal: [null, [Validators.required, Validators.min(0.01)]],
            interestRate: [null, [Validators.required, Validators.min(0.01)]],
            numPayments: [null, [Validators.required, Validators.min(1)]],
            startDate: [null, Validators.required],
            loanName: [null, Validators.required]
          });
    }

    getFormValues(): LoanFormData {
        const values = {
            Principal: this.loanForm.get('principal')?.value || 0,
            InterestRate: this.loanForm.get('interestRate')?.value || 0,
            NumPayments: this.loanForm.get('numPayments')?.value || 0,
            StartDate: this.loanForm.get('startDate')?.value || '',
            LoanName: this.loanForm.get('loanName')?.value || ''
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