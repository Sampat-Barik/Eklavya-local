import React, { createContext, useContext, useState, useCallback } from 'react';

interface DonationModalContextType {
  isOpen: boolean;
  initialAmount: number;
  initialFrequency: 'monthly' | 'one-time';
  openDonationModal: (amount?: number, frequency?: 'monthly' | 'one-time') => void;
  closeDonationModal: () => void;
}

const DonationModalContext = createContext<DonationModalContextType | undefined>(undefined);

export const DonationModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [initialFrequency, setInitialFrequency] = useState<'monthly' | 'one-time'>('monthly');

  const openDonationModal = useCallback((amount?: number, frequency?: 'monthly' | 'one-time') => {
    if (amount) setInitialAmount(amount);
    if (frequency) setInitialFrequency(frequency);
    setIsOpen(true);
  }, []);

  const closeDonationModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DonationModalContext.Provider
      value={{
        isOpen,
        initialAmount,
        initialFrequency,
        openDonationModal,
        closeDonationModal,
      }}
    >
      {children}
    </DonationModalContext.Provider>
  );
};

export const useDonationModal = (): DonationModalContextType => {
  const context = useContext(DonationModalContext);
  if (!context) {
    throw new Error('useDonationModal must be used within a DonationModalProvider');
  }
  return context;
};
