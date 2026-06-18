import useCompany from "../hooks/useCompany";
import "./WhatsAppButton.css";

// Converts a local BD number (01XXXXXXXXX) or one already in international
// form into the digits-only format wa.me requires (country code + number,
// no leading + or 0).
function toWhatsAppNumber(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `880${digits.slice(1)}`;
  return digits;
}

// Plain wa.me click-to-chat link - no API, no credentials. Opens WhatsApp
// (app or web) with the company's support number and a pre-filled message.
const WhatsAppButton = () => {
  const { data: company } = useCompany();
  const number = toWhatsAppNumber(company?.contact?.support_mobile);

  if (!number) return null;

  const text = encodeURIComponent(`Hi ${company?.company_name || ""}, I have a question about my order.`);

  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.872-2.888-1.557-4.034-3.534-.305-.524.305-.486.872-1.618.097-.196.05-.372-.05-.521-.099-.148-.669-1.611-.916-2.207-.241-.579-.486-.5-.67-.51-.173-.01-.371-.012-.57-.012-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.057 3.146 4.989 4.287 2.932 1.141 2.932.76 3.479.71.546-.05 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.04 2c-5.523 0-10 4.477-10 10 0 1.821.487 3.53 1.338 5.003L2 22l5.117-1.342A9.96 9.96 0 0 0 12.04 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.2a8.17 8.17 0 0 1-4.166-1.14l-.299-.177-3.04.798.812-2.964-.194-.305A8.176 8.176 0 0 1 3.84 12c0-4.528 3.687-8.2 8.2-8.2 4.528 0 8.2 3.672 8.2 8.2 0 4.528-3.672 8.2-8.2 8.2z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
