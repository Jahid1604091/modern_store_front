import React from "react";
import PageShell, { S } from "./PageShell";
import useCompany from "../hooks/useCompany";

const TermsPage = () => {
  const { data: company } = useCompany();

  return (
    <PageShell
      active="Terms & Conditions"
      title="Terms & Conditions"
      subtitle="The terms that govern your use of this store"
    >
      <div style={S.section}>
        <span style={S.sectionTitle}>Terms & Conditions</span>
        <div style={S.sectionBody}>
          {company?.t_and_c ? (
            <p style={{ whiteSpace: "pre-wrap" }}>{company.t_and_c}</p>
          ) : (
            <p>This store has not published its terms & conditions yet. Please contact us if you have any questions.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default TermsPage;
