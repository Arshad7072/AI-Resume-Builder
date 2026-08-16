import "./HelpSupport.css";
import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import toast from "react-hot-toast";
import API from "../../api/api";
import {
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

const HelpSupport = () => {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      question: "How do I create my first resume?",
      answer:
        "Go to Create Resume, complete all sections, review your information, and click Save Resume.",
    },
    {
      question: "Can I edit my resume later?",
      answer:
        "Yes. Open My Resumes and click the Edit button to update your resume anytime.",
    },
    {
      question: "How do I download my resume?",
      answer:
        "Open your resume from My Resumes and click the Download PDF button.",
    },
    {
      question: "Are the resume templates ATS-friendly?",
      answer:
        "Yes. All resume templates are designed to be ATS compatible and recruiter-friendly.",
    },
    {
      question: "How do I change my password?",
      answer:
        "Go to Settings → Change Password and enter your current and new password.",
    },
    {
      question: "Can I upload my profile photo?",
      answer:
        "Yes. You can upload your profile picture from your Profile page or while creating your resume.",
    },
    {
      question: "How do I enable Dark Mode?",
      answer:
        "Click the Moon icon in the navigation bar or enable Dark Mode from Settings.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "Navigate to Settings → Delete Account. This action permanently removes your account and all resumes.",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/support", formData);

      toast.success(data.message);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="help-page">
      <Sidebar />
      <div className="help-header">
        <h1>
          <HelpCircle size={34} />
          Help & Support
        </h1>

        <p>Need help? Browse our FAQs or contact our support team anytime.</p>
      </div>

      {/* Contact Cards */}

      <div className="contact-grid">
        <div className="contact-card">
          <Mail size={36} />

          <h3>Email Support</h3>

          <p>
            <a href="mailto:support@airesumebuilder.com">
              support@airesumebuilder.com
            </a>
          </p>

          <small>Response within 24 hours</small>
        </div>

        <div className="contact-card">
          <Phone size={36} />

          <h3>Phone Support</h3>

          <p>
            <a href="tel:+919876543210">+91 98765 43210</a>
          </p>

          <small>Mon – Sat | 10:00 AM – 6:00 PM</small>
        </div>

        <div className="contact-card">
          <MessageCircle size={36} />

          <h3>Live Chat</h3>

          <button onClick={() => toast("Live Chat coming soon!")}>
            Start Chat
          </button>

          <small>Instant support</small>
        </div>
      </div>

      {/* FAQ */}

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

      {/* Contact Form */}

      <div className="support-form">
        <h2>Still Need Help?</h2>

        <p>Send us a message and we'll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpSupport;
