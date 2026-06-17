import { useSelector } from 'react-redux';

/**
 * Returns the resolved company data from Redux.
 * Components that need company info (name, currency, logo, etc.) should use this.
 *
 * Returns:
 *  { data, loading, error }
 *  - data    : company object from API, or null while loading / not found
 *  - loading : true while the subdomain resolve is in flight
 *  - error   : error string if company not found, null otherwise
 */
const useCompany = () => {
    const { data, loading, error } = useSelector((s) => s.company);
    return { data, loading, error };
};

export default useCompany;
