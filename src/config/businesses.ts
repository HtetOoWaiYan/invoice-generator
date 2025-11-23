import type { BusinessProfile } from '../types';

const defaultBusinesses: BusinessProfile[] = [
  {
    id: 'generic-store',
    name: 'My General Store',
    phone: '09123456789',
    description: 'KBZPay - 09123456789 / Owner Name',
    themeColor: '#0f766e', // teal-700
  },
];

const getBusinesses = (): BusinessProfile[] => {
  const envBusinesses = import.meta.env.VITE_BUSINESSES;
  if (envBusinesses) {
    try {
      return JSON.parse(envBusinesses);
    } catch (e) {
      console.error('Failed to parse VITE_BUSINESSES', e);
    }
  }
  return defaultBusinesses;
};

export const businesses: BusinessProfile[] = getBusinesses();
