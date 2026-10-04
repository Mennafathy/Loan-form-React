import React from 'react';
import styles from './Footer.module.scss';
import { ShieldCheck, Lock, Award, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <ShieldCheck className={styles.brandIcon} size={20} />
              <span className={styles.brandName}>LoanFlow</span>
            </div>
            <p className={styles.tagline}>
              Empowering individuals and businesses with fast, fair, and transparent financial loans.
            </p>
            <div className={styles.securityBadges}>
              <div className={styles.badge}>
                <Lock size={14} />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className={styles.badge}>
                <Award size={14} />
                <span>FDIC Partner Insured</span>
              </div>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Loan Products</h4>
            <ul>
              <li><a href="#personal">Personal Loans</a></li>
              <li><a href="#debt">Debt Consolidation</a></li>
              <li><a href="#home">Home Improvement</a></li>
              <li><a href="#business">Small Business</a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Resources</h4>
            <ul>
              <li><a href="#calculator">Loan Calculator</a></li>
              <li><a href="#rates">Current Rates</a></li>
              <li><a href="#faq">Borrower FAQ</a></li>
              <li><a href="#privacy">Privacy & Terms</a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Compliance & Disclosures</h4>
            <p className={styles.disclosure}>
              All loan approvals and annual percentage rates (APR) are subject to creditworthiness and verification. Loans are originated by FDIC-insured lending partners. Equal Housing Lender.
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} LoanFlow Inc. All rights reserved.</p>
          <p className={styles.builtWith}>
            Engineered with <Heart size={14} className={styles.heart} /> for modern lending
          </p>
        </div>
      </div>
    </footer>
  );
}
