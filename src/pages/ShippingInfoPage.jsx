import React from "react";
import { PageShell, S } from "./PageShell";

const ShippingInfoPage = () => (
  <PageShell
    active="Shipping Info"
    title="Shipping Info"
    subtitle="Delivery times, costs, and coverage across Bangladesh"
  >
    {/* Delivery methods */}
    <div style={S.section}>
      <span style={S.sectionTitle}>Delivery Options</span>
      <table style={S.table}>
        <thead>
          <tr>
            <th style={S.th}>Method</th>
            <th style={S.th}>Coverage</th>
            <th style={S.th}>Estimated Time</th>
            <th style={S.th}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Standard Delivery", "Dhaka City", "2–3 Business Days", "৳ 60"],
            ["Standard Delivery", "Outside Dhaka", "3–5 Business Days", "৳ 120"],
            ["Express Delivery", "Dhaka City", "Next Business Day", "৳ 150"],
            ["Express Delivery", "Outside Dhaka", "2–3 Business Days", "৳ 200"],
            ["Free Shipping", "All Bangladesh", "3–5 Business Days", "On orders ৳ 3,000+"],
          ].map(([method, coverage, time, cost], i) => (
            <tr key={i}>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}>{method}</td>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}>{coverage}</td>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}>{time}</td>
              <td style={i % 2 === 0 ? S.td : S.tdAlt}><strong>{cost}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Order processing */}
    <div style={S.section}>
      <span style={S.sectionTitle}>Order Processing</span>
      <div style={S.sectionBody}>
        <p style={{ marginBottom: "12px" }}>
          All orders are processed within 1–2 business days after payment confirmation.
          Orders placed on Fridays or public holidays will be processed the next working day.
        </p>
        <p>
          You will receive an SMS and email confirmation with your tracking number once
          your order has been dispatched.
        </p>
      </div>
    </div>

    {/* Courier partners */}
    <div style={S.section}>
      <span style={S.sectionTitle}>Our Courier Partners</span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "18px" }}>
        {[
          { name: "Pathao Courier", note: "Dhaka metro & major cities" },
          { name: "Sundarban Courier", note: "Nationwide coverage" },
          { name: "SA Paribahan", note: "District-level delivery" },
          { name: "Redex", note: "Express same-day Dhaka" },
        ].map((c) => (
          <div key={c.name} style={S.infoCard}>
            <p style={S.infoCardTitle}>{c.name}</p>
            <p style={S.infoCardBody}>{c.note}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Tracking */}
    <div style={S.section}>
      <span style={S.sectionTitle}>Track Your Order</span>
      <div style={S.sectionBody}>
        <p>
          Once your order ships, you'll receive a tracking ID via SMS. Use it on the
          courier's website or call us at <strong>01303097191</strong> for a live update.
        </p>
      </div>
    </div>

    {/* Contact CTA */}
    <div style={S.contactBox}>
      <div>
        <p style={S.contactBoxTitle}>Still have questions?</p>
        <p style={S.contactBoxText}>Our team is available Sat–Thu, 10am–8pm</p>
      </div>
      <a href="tel:01303097191" style={S.btn}>📞 Call Us Now</a>
    </div>
  </PageShell>
);

export default ShippingInfoPage;