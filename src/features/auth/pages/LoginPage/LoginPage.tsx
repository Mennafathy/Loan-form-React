import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setError(null);
    await login(email);
    navigate('/');
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    await login(demoEmail);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Card variant="glass" className={styles.card}>
        <div className={styles.brandHeader}>
          <div className={styles.logoCircle}>
            <ShieldCheck size={28} />
          </div>
          <h2 className={styles.title}>Sign In to LoanFlow</h2>
          <p className={styles.subtitle}>Manage your active loans and disbursements</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="borrower@example.com"
            prefixIcon={<Mail size={16} />}
            error={error || undefined}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            prefixIcon={<Lock size={16} />}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loading}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Sign In
          </Button>
        </form>

        <div className={styles.demoSection}>
          <span className={styles.demoLabel}>Or try one-click demo login:</span>
          <div className={styles.demoButtons}>
            <button
              type="button"
              onClick={() => handleQuickLogin('sarah.jenkins@example.com')}
              className={styles.demoBtn}
            >
              Sarah Jenkins (Approved Borrower)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('marcus.vance@example.com')}
              className={styles.demoBtn}
            >
              Marcus Vance (Underwriting Review)
            </button>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <Link to="/" className={styles.footerLink}>
            Return to Dashboard
          </Link>
        </div>
      </Card>
    </div>
  );
}
