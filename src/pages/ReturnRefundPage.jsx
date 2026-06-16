import React from "react";
import PageShell, { S } from "./PageShell";


const steps = [
  { n: "01", title: "Contact Us", body: "Call or WhatsApp us at 01303097191 within 3 days of receiving your order. Provide your order number and reason for return." },
  { n: "02", title: "Get Approval", body: "Our team will review your request and confirm eligibility within 24 hours. Unapproved returns will not be accepted." },
  { n: "03", title: "Ship It Back", body: "Pack the item securely in its original packaging and send it to our Uttara Badda, Dhaka address. Customer bears return shipping cost." },
  { n: "04", title: "Refund Issued", body: "Once received and inspected, your refund will be processed within 3–5 business days via bKash or bank transfer." },
];

const ReturnRefundPage = () => (
  <PageShell
    active="Returns & Refunds"
    title="Returns & Refunds"
    subtitle="Our fair and simple return policy"
  >
    {/* Policy summary cards */}
    <div style={S.section}>
      <span style={S.sectionTitle}>Policy at a Glance</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginTop: "18px" }}>
        {[
          { label: "Return Window", value: "3 Days", note: "After delivery" },
          { label: "Refund Method", value: "bKash / Bank", note: "Original payment method" },
          { label: "Processing Time", value: "3–5 Days", note: "After item received" },
        ].map((c) => (
          <div key={c.label} style={{ ...S.infoCard, textAlign: "center" }}>
            <p style={{ ...S.infoCardTitle, marginBottom: "4px" }}>{c.label}</p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#111111", letterSpacing: "0.06em", margin: "6px 0" }}>{c.value}</p>
            <p style={{ ...S.infoCardBody, color: "#aaaaaa", fontSize: "11px" }}>{c.note}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Eligible vs not */}
    <div style={S.section}>
      <span style={S.sectionTitle}>What Can Be Returned</span>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>Item Condition</th>
            <th style={S.th}>Eligible?</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Received wrong item / size", "green"],
            ["Item damaged on arrival", "green"],
            ["Manufacturing defect", "green"],
            ["Item worn or washed", "red"],
            ["Name/number printing applied", "red"],
            ["Sale or discounted items", "red"],
            ["Missing original packaging / tags", "red"],
          ].map(([reason, status], i) => (
            <tr key={i}>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}>{reason}</td>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}>
                <span style={S.tag(status)}>{status === "green" ? "✓ Eligible" : "✗ Not Eligible"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Steps */}
    <div style={S.section}>
      <span style={S.sectionTitle}>How to Return</span>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "0" }}>
        {steps.map((step, i) => (
          <div key={step.n} style={{ display: "flex", gap: "24px", paddingBottom: "24px", borderLeft: i < steps.length - 1 ? "2px solid #e0e0e0" : "2px solid transparent", paddingLeft: "24px", position: "relative" }}>
            <div style={{ position: "absolute", left: "-14px", top: "0", width: "26px", height: "26px", background: "#111111", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em", flexShrink: 0 }}>
              {step.n}
            </div>
            <div>
              <p style={{ ...S.infoCardTitle, marginBottom: "6px" }}>{step.title}</p>
              <p style={S.faqA}>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={S.contactBox}>
      <div>
        <p style={S.contactBoxTitle}>Need to start a return?</p>
        <p style={S.contactBoxText}>WhatsApp or call us with your order ID ready</p>
      </div>
      <a href="tel:01303097191" style={S.btn}>📞 01303097191</a>
    </div>
  </PageShell>
);

export default ReturnRefundPage;