import React, { useState } from 'react';
import styles from './LoanForm.module.scss';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLoanApplication } from '../../hooks/useLoanApplication';
import { LoanPurpose, EmploymentStatus, CreditScoreTier } from '../../models/loan';
import { formatCurrency, formatPhoneNumber, maskSSN } from '@/utils/format';
import { LOAN_CONSTANTS } from '@/config/constants';
import {
  User,
  Briefcase,
  Sliders,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PURPOSES: { value: LoanPurpose; label: string; desc: string }[] = [
  { value: 'debt_consolidation', label: 'Debt Consolidation', desc: 'Combine multiple credit cards & debts into 1 payment' },
  { value: 'home_improvement', label: 'Home Renovation', desc: 'Kitchen remodels, repairs, or additions' },
  { value: 'business', label: 'Small Business', desc: 'Working capital, inventory, or equipment' },
  { value: 'medical', label: 'Medical & Dental', desc: 'Procedures, hospital expenses, or wellness' },
  { value: 'auto', label: 'Auto & Transportation', desc: 'Vehicle purchase, repairs, or refinancing' },
  { value: 'major_purchase', label: 'Major Purchase', desc: 'Appliances, moving, or personal projects' },
  { value: 'other', label: 'Other Purpose', desc: 'General personal loan funding' },
];

export function LoanForm() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    currentStep,
    applicant,
    financial,
    terms,
    errors,
    isSubmitting,
    updateApplicant,
    updateFinancial,
    updateTerms,
    nextStep,
    prevStep,
    submitApplication,
  } = useLoanApplication();

  const steps = [
    { number: 1, title: 'Borrower', icon: <User size={16} /> },
    { number: 2, title: 'Financials', icon: <Briefcase size={16} /> },
    { number: 3, title: 'Loan Terms', icon: <Sliders size={16} /> },
    { number: 4, title: 'Review & Sign', icon: <CheckCircle size={16} /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setSubmitError('Please accept the electronic disclosure agreement to proceed.');
      return;
    }
    setSubmitError(null);
    const result = await submitApplication();
    if (result && result.id) {
      navigate(`/loans/${result.id}`);
    }
  };

  return (
    <Card variant="glass" className={styles.formCard}>
      {/* Wizard Progress Indicator */}
      <div className={styles.stepsNav}>
        {steps.map((step) => {
          const isDone = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div
              key={step.number}
              className={[
                styles.stepItem,
                isActive ? styles.stepActive : '',
                isDone ? styles.stepDone : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={styles.stepCircle}>
                {isDone ? <Check size={14} /> : step.icon}
              </div>
              <span className={styles.stepTitle}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className={styles.formBody}>
        {/* STEP 1: Applicant Information */}
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Borrower Personal Information</h3>
              <p className={styles.sectionSubtitle}>
                Tell us about yourself. Your data is encrypted with bank-level 256-bit SSL.
              </p>
            </div>

            <div className={styles.rowTwo}>
              <Input
                label="First Name"
                required
                value={applicant.firstName}
                onChange={(e) => updateApplicant('firstName', e.target.value)}
                error={errors.firstName}
                placeholder="Jane"
              />
              <Input
                label="Last Name"
                required
                value={applicant.lastName}
                onChange={(e) => updateApplicant('lastName', e.target.value)}
                error={errors.lastName}
                placeholder="Doe"
              />
            </div>

            <div className={styles.rowTwo}>
              <Input
                label="Email Address"
                type="email"
                required
                value={applicant.email}
                onChange={(e) => updateApplicant('email', e.target.value)}
                error={errors.email}
                placeholder="jane.doe@example.com"
                helperText="We will send loan status notifications here"
              />
              <Input
                label="Phone Number"
                type="tel"
                required
                value={applicant.phone}
                onChange={(e) => updateApplicant('phone', e.target.value)}
                error={errors.phone}
                placeholder="(555) 000-0000"
              />
            </div>

            <div className={styles.rowTwo}>
              <Input
                label="Date of Birth"
                type="date"
                required
                value={applicant.dateOfBirth}
                onChange={(e) => updateApplicant('dateOfBirth', e.target.value)}
                error={errors.dateOfBirth}
              />
              <Input
                label="Social Security Number (SSN)"
                type="password"
                required
                maxLength={9}
                value={applicant.ssn}
                onChange={(e) => updateApplicant('ssn', e.target.value.replace(/\D/g, ''))}
                error={errors.ssn}
                placeholder="9-digit SSN"
                helperText="Encrypted for instant identity verification"
              />
            </div>

            <Input
              label="Residential Street Address"
              required
              value={applicant.address}
              onChange={(e) => updateApplicant('address', e.target.value)}
              error={errors.address}
              placeholder="123 Main Street, Apt 4B"
            />

            <div className={styles.rowThree}>
              <Input
                label="City"
                required
                value={applicant.city}
                onChange={(e) => updateApplicant('city', e.target.value)}
                error={errors.city}
                placeholder="San Francisco"
              />
              <Input
                label="State"
                required
                maxLength={2}
                value={applicant.state}
                onChange={(e) => updateApplicant('state', e.target.value.toUpperCase())}
                error={errors.state}
                placeholder="CA"
              />
              <Input
                label="ZIP Code"
                required
                maxLength={5}
                value={applicant.zipCode}
                onChange={(e) => updateApplicant('zipCode', e.target.value)}
                error={errors.zipCode}
                placeholder="94103"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Employment & Financial Information */}
        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Employment & Financial Profile</h3>
              <p className={styles.sectionSubtitle}>
                This information helps our underwriting engine calculate your maximum approved amount.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Employment Status *</label>
              <div className={styles.radioGrid}>
                {[
                  { value: 'employed_full_time', label: 'Full-Time Employed' },
                  { value: 'employed_part_time', label: 'Part-Time Employed' },
                  { value: 'self_employed', label: 'Self-Employed / Freelance' },
                  { value: 'retired', label: 'Retired' },
                  { value: 'other', label: 'Other' },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateFinancial('employmentStatus', item.value as EmploymentStatus)}
                    className={`${styles.radioOption} ${
                      financial.employmentStatus === item.value ? styles.radioSelected : ''
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {errors.employmentStatus && (
                <span className={styles.fieldError}>{errors.employmentStatus}</span>
              )}
            </div>

            <div className={styles.rowTwo}>
              <Input
                label="Current Employer / Company Name"
                required
                value={financial.employerName}
                onChange={(e) => updateFinancial('employerName', e.target.value)}
                error={errors.employerName}
                placeholder="Acme Corp"
              />
              <Input
                label="Gross Annual Income (USD)"
                type="number"
                required
                min={LOAN_CONSTANTS.MIN_ANNUAL_INCOME}
                step={1000}
                value={financial.annualIncome || ''}
                onChange={(e) => updateFinancial('annualIncome', Number(e.target.value))}
                error={errors.annualIncome}
                placeholder="e.g. 75000"
                helperText="Includes salary, bonuses, and investment income"
              />
            </div>

            <div className={styles.rowTwo}>
              <Input
                label="Monthly Housing Payment (Rent or Mortgage)"
                type="number"
                required
                min={0}
                value={financial.monthlyHousingPayment || ''}
                onChange={(e) => updateFinancial('monthlyHousingPayment', Number(e.target.value))}
                error={errors.monthlyHousingPayment}
                placeholder="e.g. 1500"
              />

              <div className={styles.formGroup}>
                <label className={styles.groupLabel}>Credit Range Estimate</label>
                <div className={styles.creditPills}>
                  {(['excellent', 'good', 'fair', 'poor'] as CreditScoreTier[]).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => updateFinancial('creditScoreTier', tier)}
                      className={`${styles.creditPill} ${
                        financial.creditScoreTier === tier ? styles.creditPillActive : ''
                      }`}
                    >
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Loan Customization & Purpose */}
        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Customize Your Loan</h3>
              <p className={styles.sectionSubtitle}>
                Select how much you wish to borrow, preferred duration, and intended use.
              </p>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.amountHeader}>
                <label className={styles.groupLabel}>Requested Loan Amount *</label>
                <span className={styles.amountDisplay}>{formatCurrency(terms.amount)}</span>
              </div>
              <input
                type="range"
                min={LOAN_CONSTANTS.MIN_AMOUNT}
                max={LOAN_CONSTANTS.MAX_AMOUNT}
                step={LOAN_CONSTANTS.AMOUNT_STEP}
                value={terms.amount}
                onChange={(e) => updateTerms('amount', Number(e.target.value))}
                className={styles.rangeBar}
              />
              <div className={styles.rangeBoundaries}>
                <span>${LOAN_CONSTANTS.MIN_AMOUNT.toLocaleString()}</span>
                <span>${LOAN_CONSTANTS.MAX_AMOUNT.toLocaleString()}</span>
              </div>
              {errors.amount && <span className={styles.fieldError}>{errors.amount}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Repayment Duration *</label>
              <div className={styles.termSelector}>
                {LOAN_CONSTANTS.TERM_OPTIONS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateTerms('termMonths', t)}
                    className={`${styles.termOption} ${terms.termMonths === t ? styles.termOptionActive : ''}`}
                  >
                    <span className={styles.termMonths}>{t} mo</span>
                    <span className={styles.termYears}>{t / 12} yrs</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Loan Purpose *</label>
              <div className={styles.purposeGrid}>
                {PURPOSES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => updateTerms('purpose', p.value)}
                    className={`${styles.purposeCard} ${
                      terms.purpose === p.value ? styles.purposeCardActive : ''
                    }`}
                  >
                    <strong className={styles.purposeTitle}>{p.label}</strong>
                    <span className={styles.purposeDesc}>{p.desc}</span>
                  </button>
                ))}
              </div>
              {errors.purpose && <span className={styles.fieldError}>{errors.purpose}</span>}
            </div>
          </div>
        )}

        {/* STEP 4: Review, Disclosures & E-Sign */}
        {currentStep === 4 && (
          <div className={styles.stepContent}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Review & Electronic Signature</h3>
              <p className={styles.sectionSubtitle}>
                Please verify all provided details before finalizing your submission.
              </p>
            </div>

            <div className={styles.reviewGrid}>
              <div className={styles.reviewBox}>
                <h4 className={styles.boxTitle}>Applicant Information</h4>
                <div className={styles.reviewList}>
                  <p><strong>Name:</strong> {applicant.firstName} {applicant.lastName}</p>
                  <p><strong>Email:</strong> {applicant.email}</p>
                  <p><strong>Phone:</strong> {formatPhoneNumber(applicant.phone)}</p>
                  <p><strong>SSN:</strong> {maskSSN(applicant.ssn)}</p>
                  <p><strong>Address:</strong> {applicant.address}, {applicant.city}, {applicant.state} {applicant.zipCode}</p>
                </div>
              </div>

              <div className={styles.reviewBox}>
                <h4 className={styles.boxTitle}>Financial & Employment</h4>
                <div className={styles.reviewList}>
                  <p><strong>Status:</strong> {financial.employmentStatus.replace(/_/g, ' ')}</p>
                  <p><strong>Employer:</strong> {financial.employerName || 'N/A'}</p>
                  <p><strong>Gross Income:</strong> {formatCurrency(financial.annualIncome)}/yr</p>
                  <p><strong>Housing:</strong> {formatCurrency(financial.monthlyHousingPayment)}/mo</p>
                  <p><strong>Credit Tier:</strong> {financial.creditScoreTier.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className={styles.termsAgreementBox}>
              <div className={styles.disclosureHeader}>
                <Lock size={16} className={styles.lockIcon} />
                <strong>Federal Electronic Signature & Credit Authorization (E-SIGN)</strong>
              </div>
              <p className={styles.disclosureText}>
                By checking the box below, you certify that all information provided is true, correct, and complete. You authorize LoanFlow and its FDIC partner banking affiliates to obtain consumer credit reports, verify employment records, and send communications electronically.
              </p>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className={styles.checkboxInput}
                />
                <span>
                  I agree to the <strong>Terms of Service</strong>, <strong>Credit Pull Authorization</strong>, and <strong>Electronic Signatures Act (E-SIGN)</strong>.
                </span>
              </label>
            </div>

            {submitError && (
              <div className={styles.submitErrorAlert} role="alert">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className={styles.formFooter}>
          {currentStep > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={prevStep}
              icon={<ArrowLeft size={16} />}
              disabled={isSubmitting}
            >
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              variant="primary"
              size="md"
              onClick={nextStep}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              icon={<ShieldCheck size={18} />}
            >
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
