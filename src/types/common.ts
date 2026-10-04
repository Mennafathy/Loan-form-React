export type StatusVariant = 'idle' | 'pending' | 'success' | 'warning' | 'danger';

export type ComponentSize = 'sm' | 'md' | 'lg';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: string;
}
