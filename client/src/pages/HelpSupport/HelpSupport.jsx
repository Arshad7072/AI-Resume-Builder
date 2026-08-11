import "./HelpSupport.css";

import { useState } from "react";

import {
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const HelpSupport = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "How do I create a resume?",
      answer:
        "Go to Create Resume, fill in your details, and click Save Resume.",
    },
    {
      question: "How can I download my resume?",
      answer: "Open any resume from My Resumes and click Download PDF.",
    },
    {
      question: "Can I edit my resume later?",
      answer: "Yes. Open My Resumes and click the Edit button.",
    },
    {
      question: "Is my resume ATS friendly?",
      answer: "Yes. All templates are designed to be ATS compatible.",
    },
  ];

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>
          <HelpCircle size={34} />
          Help & Support
        </h1>

        <p>Find answers to common questions or contact our support team.</p>
      </div>

      {/* Contact */}

      <div className="contact-grid">
        <div className="contact-card">
          <Mail size={35} />

          <h3>Email</h3>

          <p>support@airesumebuilder.com</p>
        </div>

        <div className="contact-card">
          <Phone size={35} />

          <h3>Phone</h3>

          <p>+91 9876543210</p>
        </div>

        <div className="contact-card">
          <MessageCircle size={35} />

          <h3>Live Chat</h3>

          <p>Available 24 × 7</p>
        </div>
      </div>

      {/* FAQs */}

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        {faqs.map((faq, index) => (
          <div className="faq-card" key={index}>
            <button
              className="faq-btn"
              onClick={() => setOpen(open === index ? null : index)}
            >
              <span>{faq.question}</span>

              {open === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {open === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSupport;
