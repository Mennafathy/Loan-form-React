import { useState, useCallback } from 'react';
import {
  ApplicantInfo,
  FinancialInfo,
  LoanPurpose,
  LoanTerms,
  LoanApplication,
} from '../models/loan';
import { loanService } from '../services/loanService';
import { isValidEmail, isValidPhone, isValidSSN, isAdult } from '@/utils/validation';
import { LOAN_CONSTANTS } from '@/config/constants';

export interface FormErrors {
  [key: string]: string | undefined;
}

interface DraftState {
  applicant?: ApplicantInfo;
  financial?: FinancialInfo;
  terms?: { amount: number; termMonths: number; purpose: LoanPurpose };
  currentStep?: number;
}

export function useLoanApplication() {
  const [draft] = useState<DraftState | null>(() => loanService.getDraft<DraftState>());

  const [currentStep, setCurrentStep] = useState<number>(() => {
    return draft?.currentStep && draft.currentStep < 4 ? draft.currentStep : 1;
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<LoanApplication | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [applicant, setApplicant] = useState<ApplicantInfo>(() => {
    return (
      draft?.applicant || {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      }
    );
  });

  const [financial, setFinancial] = useState<FinancialInfo>(() => {
    return (
      draft?.financial || {
        employmentStatus: 'employed_full_time',
        employerName: '',
        annualIncome: 65000,
        monthlyHousingPayment: 1500,
        creditScoreTier: 'good',
      }
    );
  });

  const [terms, setTerms] = useState<{
    amount: number;
    termMonths: number;
    purpose: LoanPurpose;
  }>(() => {
    return (
      draft?.terms || {
        amount: LOAN_CONSTANTS.DEFAULT_AMOUNT,
        termMonths: LOAN_CONSTANTS.DEFAULT_TERM_MONTHS,
        purpose: 'debt_consolidation',
      }
    );
  });

  // Auto-save draft
  const saveDraft = useCallback(() => {
    loanService.saveDraft({
      applicant,
      financial,
      terms,
      currentStep,
    });
  }, [applicant, financial, terms, currentStep]);

  const updateApplicant = useCallback((field: keyof ApplicantInfo, value: string) => {
    setApplicant((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateFinancial = useCallback(
    <K extends keyof FinancialInfo>(field: K, value: FinancialInfo[K]) => {
      setFinancial((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const updateTerms = useCallback(
    <K extends keyof typeof terms>(field: K, value: (typeof terms)[K]) => {
      setTerms((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // Validation per step
  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};

      if (step === 1) {
        if (!applicant.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!applicant.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!applicant.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!isValidEmail(applicant.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!applicant.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!isValidPhone(applicant.phone)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!applicant.dateOfBirth) {
          newErrors.dateOfBirth = 'Date of birth is required';
        } else if (!isAdult(applicant.dateOfBirth)) {
          newErrors.dateOfBirth = 'Borrower must be at least 18 years old';
        }
        if (!applicant.ssn.trim()) {
          newErrors.ssn = 'Social Security Number is required';
        } else if (!isValidSSN(applicant.ssn)) {
          newErrors.ssn = 'SSN must be exactly 9 digits';
        }
        if (!applicant.address.trim()) newErrors.address = 'Street address is required';
        if (!applicant.city.trim()) newErrors.city = 'City is required';
        if (!applicant.state.trim()) newErrors.state = 'State is required';
        if (!applicant.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      }

      if (step === 2) {
        if (!financial.employmentStatus) {
          newErrors.employmentStatus = 'Please select your employment status';
        }
        if (
          (financial.employmentStatus === 'employed_full_time' ||
            financial.employmentStatus === 'employed_part_time') &&
          !financial.employerName.trim()
        ) {
          newErrors.employerName = 'Employer name is required';
        }
        if (!financial.annualIncome || financial.annualIncome < LOAN_CONSTANTS.MIN_ANNUAL_INCOME) {
          newErrors.annualIncome = `Minimum annual income requirement is $${LOAN_CONSTANTS.MIN_ANNUAL_INCOME.toLocaleString()}`;
        }
        if (financial.monthlyHousingPayment === undefined || financial.monthlyHousingPayment < 0) {
          newErrors.monthlyHousingPayment = 'Please enter monthly housing cost';
        }
      }

      if (step === 3) {
        if (terms.amount < LOAN_CONSTANTS.MIN_AMOUNT || terms.amount > LOAN_CONSTANTS.MAX_AMOUNT) {
          newErrors.amount = `Loan amount must be between $${LOAN_CONSTANTS.MIN_AMOUNT} and $${LOAN_CONSTANTS.MAX_AMOUNT}`;
        }
        if (!terms.purpose) {
          newErrors.purpose = 'Please select the loan purpose';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [applicant, financial, terms]
  );

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      saveDraft();
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  }, [currentStep, validateStep, saveDraft]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const submitApplication = useCallback(async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const calc = loanService.calculateLoan(
        terms.amount,
        terms.termMonths,
        financial.creditScoreTier
      );

      const finalTerms: LoanTerms = {
        amount: terms.amount,
        termMonths: terms.termMonths,
        purpose: terms.purpose,
        interestRate: calc.interestRate,
        monthlyPayment: calc.monthlyPayment,
        totalPayment: calc.totalPayment,
        totalInterest: calc.totalInterest,
        originationFee: calc.originationFee,
      };

      const result = await loanService.submitApplication({
        applicant,
        financial,
        terms: finalTerms,
      });

      setSubmittedApp(result);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [applicant, financial, terms, validateStep]);

  return {
    currentStep,
    setCurrentStep,
    applicant,
    financial,
    terms,
    errors,
    isSubmitting,
    submittedApp,
    updateApplicant,
    updateFinancial,
    updateTerms,
    nextStep,
    prevStep,
    submitApplication,
    saveDraft,
  };
}
