import React from "react";
import PageShell, { S } from "./PageShell";
import useCompany from "../hooks/useCompany";

const PrivacyPolicyPage = () => {
  const { data: company } = useCompany();

  return (
    <PageShell
      active="Privacy Policy"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information"
    >
      <div style={S.section}>
        <span style={S.sectionTitle}>Our Privacy Policy</span>
        <div style={S.sectionBody}>
          {company?.privacy_policy ? (
            <p style={{ whiteSpace: "pre-wrap" }}>{company.privacy_policy}</p>
          ) : (
            <p>This store has not published a privacy policy yet. Please contact us if you have any questions about how your data is handled.</p>
          )}
        </div>
      </div>
    </PageShell>
  );
};

export default PrivacyPolicyPage;
