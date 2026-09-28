import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DonationModalProvider } from './context/DonationModalContext';
import { DonationModal } from './components/donation/DonationModal';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter provides routing context for our app */}
    <BrowserRouter>
      {/* AuthProvider wraps the app to provide global authentication state */}
      <AuthProvider>
        <DonationModalProvider>
          <App />
          <DonationModal />
        </DonationModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
