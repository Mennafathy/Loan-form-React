import { useState, useMemo } from 'react';
import { CreditScoreTier, LoanCalculationResult } from '../models/loan';
import { loanService } from '../services/loanService';
import { LOAN_CONSTANTS } from '@/config/constants';

export function useLoanCalculation(
  initialAmount: number = LOAN_CONSTANTS.DEFAULT_AMOUNT,
  initialTerm: number = LOAN_CONSTANTS.DEFAULT_TERM_MONTHS,
  initialCreditTier: CreditScoreTier = 'good'
) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [termMonths, setTermMonths] = useState<number>(initialTerm);
  const [creditTier, setCreditTier] = useState<CreditScoreTier>(initialCreditTier);

  const calculation: LoanCalculationResult = useMemo(() => {
    return loanService.calculateLoan(amount, termMonths, creditTier);
  }, [amount, termMonths, creditTier]);

  return {
    amount,
    setAmount,
    termMonths,
    setTermMonths,
    creditTier,
    setCreditTier,
    calculation,
  };
}
