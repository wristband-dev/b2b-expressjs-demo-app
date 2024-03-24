import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import { FullScreenSpinner, Navbar, NewCompanyDialog } from 'components';
import { useAuth } from 'context';
import { sessionHooks } from 'hooks';
import { HomePage, SettingsPage } from 'pages';

// This demo app does not have any unprotected routes or pages.  If your app needed
// that functionality, then this is where you could add the unprotected routes.
function UnauthenticatedApp() {
  return <FullScreenSpinner />;
}

function AuthenticatedApp() {
  const { data: company } = sessionHooks.useSessionCompany();
  const { id, invoiceEmail } = company;
  const companyIsComplete = !!invoiceEmail;

  return (
    <>
      <Navbar />
      <NewCompanyDialog companyId={id} open={!companyIsComplete} />
      {companyIsComplete ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      ) : (
        <FullScreenSpinner />
      )}
    </>
  );
}

export function App() {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
