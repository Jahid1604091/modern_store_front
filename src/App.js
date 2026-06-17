import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Nav/Header';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/Footer';
import { setCompany, setCompanyError, setCompanyLoading } from './slices/companySlice';
import { BASE_URL } from './utils/constants';

// ─── Company bootstrapper ─────────────────────────────────────────────────────

function useResolveCompany() {
  const dispatch = useDispatch();

  useEffect(() => {
    const companyId = process.env.REACT_APP_COMPANY_ID;
    if (!companyId) {
      dispatch(setCompanyLoading(false));
      return;
    }
    fetch(`${BASE_URL}/api/companies/${companyId}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) dispatch(setCompany(res.data));
        else dispatch(setCompanyError('Company not found'));
      })
      .catch(() => dispatch(setCompanyError('Failed to connect')));
  }, [dispatch]);
}

// ─── SaaS top banner (shown only when no company is loaded) ──────────────────

const NO_BANNER_PATHS = ['/start', '/pricing', '/welcome', '/forgot-password', '/reset-password'];

const SaaSTopBanner = () => {
  const { pathname } = useLocation();
  const company = useSelector(s => s.company.data);
  const [dismissed, setDismissed] = React.useState(
    () => sessionStorage.getItem('saas_banner_dismissed') === '1'
  );

  if (company || dismissed || NO_BANNER_PATHS.some(p => pathname.startsWith(p))) return null;

  return (
    <div style={{
      background: '#111', color: '#fff', textAlign: 'center',
      padding: '8px 16px', fontSize: '13px', display: 'flex',
      alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap',
    }}>
      <span>Want to sell online? Start your own store for free.</span>
      <Link to="/start" style={{
        background: '#fff', color: '#111', borderRadius: '4px',
        padding: '3px 12px', fontWeight: 700, fontSize: '12px', textDecoration: 'none',
      }}>
        Start Free Trial
      </Link>
      <button
        onClick={() => { sessionStorage.setItem('saas_banner_dismissed', '1'); setDismissed(true); }}
        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '0 4px' }}
      >
        &times;
      </button>
    </div>
  );
};

// ─── Full-page states ─────────────────────────────────────────────────────────

const CompanyLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
    <div style={{ width: 44, height: 44, border: '4px solid #e5e7eb', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <p style={{ color: '#6b7280', fontSize: 14 }}>Loading store...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const CompanyNotFound = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
    <h1 style={{ fontSize: 48, fontWeight: 800, color: '#111' }}>404</h1>
    <h2 style={{ fontSize: 20, fontWeight: 600, color: '#374151' }}>Store not found</h2>
    <p style={{ color: '#6b7280', fontSize: 14 }}>
      Could not load store. Check your <code>REACT_APP_COMPANY_ID</code> and make sure the backend is running.
    </p>
  </div>
);

// ─── Root layout ──────────────────────────────────────────────────────────────

const App = () => {
  useResolveCompany();

  const { loading, error } = useSelector(s => s.company);

  if (loading) return <CompanyLoader />;
  if (error) return <CompanyNotFound />;

  return (
    <>
      <SaaSTopBanner />
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
