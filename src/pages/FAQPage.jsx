import React, { useState } from "react";
import PageShell, { S } from "./PageShell";
import useCompany from "../hooks/useCompany";

const DEFAULT_FAQS = [
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 2-5 business days depending on your location.",
  },
  {
    question: "What payment methods are available?",
    answer: "We accept bKash, Nagad, Rocket, and major debit/credit cards, plus cash on delivery.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, products can be returned within 7 days if they are unused and in original condition.",
  },
];

const FAQPage = () => {
  const { data: company } = useCompany();
  const faqs = Array.isArray(company?.faq) && company.faq.length ? company.faq : DEFAULT_FAQS;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageShell
      active="FAQ"
      title="FAQ"
      subtitle="Answers to common questions about ordering, shipping, and returns"
    >
      <div style={S.section}>
        <span style={S.sectionTitle}>Frequently Asked Questions</span>
        <div style={{ marginTop: "18px" }}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={S.faqItem}>
                <div
                  style={{ ...S.faqQ, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.question}</span>
                  <span style={{ fontSize: "16px" }}>{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <p style={S.faqA}>{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>

      <div style={S.contactBox}>
        <div>
          <p style={S.contactBoxTitle}>Still have questions?</p>
          <p style={S.contactBoxText}>Reach out to our support team</p>
        </div>
        {company?.contact?.support_mobile && (
          <a href={`tel:${company.contact.support_mobile}`} style={S.btn}>
            📞 {company.contact.support_mobile}
          </a>
        )}
      </div>
    </PageShell>
  );
};

export default FAQPage;
