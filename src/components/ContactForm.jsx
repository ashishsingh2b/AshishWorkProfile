import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Copy, Check, RefreshCw } from 'lucide-react';
import Button from './Button';
import { personalInfo } from '../data/personal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverError, setServerError] = useState('');
  const [copied, setCopied] = useState(false);

  // Formspree / EmailJS configuration
  const formspreeEndpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT ||
    (import.meta.env.VITE_FORMSPREE_ID
      ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
      : 'https://formspree.io/f/mqkvygqk'); // Default configured Formspree endpoint for portfolio

  const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write a message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (status === 'error') {
      setStatus('idle');
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerError('');

    try {
      // 1. Try EmailJS if configured
      if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
        const emailJsPayload = {
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: personalInfo.email,
          },
        };

        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailJsPayload),
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || 'EmailJS failed to deliver the message');
        }
      } else {
        // 2. Default: Submit directly to Formspree endpoint to deliver directly to ashishsingh2b@gmail.com
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _replyto: formData.email,
            subject: formData.subject,
            _subject: `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`,
            message: formData.message,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorMsg =
            data?.errors?.map((err) => err.message).join(', ') ||
            'Formspree submission error. Please verify service configuration.';
          throw new Error(errorMsg);
        }
      }

      // Success
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
      setServerError(
        err.message || 'Unable to deliver message at this time. Please try again or use direct email.'
      );
    }
  };

  const handleMailtoFallback = () => {
    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject || 'New Inquiry'}`);
    const mailBody = encodeURIComponent(
      `Hello Ashish,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Portfolio Form`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleCopy = () => {
    const textToCopy = `To: ${personalInfo.email}\nSubject: [Portfolio Inquiry] ${formData.subject}\nFrom: ${formData.name} <${formData.email}>\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Send a Direct Message
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Have an inquiry, project, or full-stack opportunity? Send a message directly to{' '}
          <strong className="text-brand-600 dark:text-brand-400">{personalInfo.email}</strong>.
        </p>
      </div>

      {/* Success Notification Banner */}
      {status === 'success' && (
        <div className="mb-6 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Message Sent Successfully!</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Thank you! Your message has been sent directly to Ashish Singh at{' '}
                <strong>{personalInfo.email}</strong>. I will review it and get back to you shortly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Send Another Message</span>
          </button>
        </div>
      )}

      {/* Error Notification Banner with Fallback Options */}
      {status === 'error' && (
        <div className="mb-6 p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Submission Issue</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {serverError || 'Unable to deliver message at this time.'} You can retry or send directly using your email app below:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleMailtoFallback}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Open in Email App</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Message Text'}</span>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            disabled={status === 'submitting'}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Jenkins"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.name
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={status === 'submitting'}
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sarah@company.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            disabled={status === 'submitting'}
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Python Full Stack Developer Role / Contract"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.subject
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            disabled={status === 'submitting'}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, team requirements, or collaboration..."
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.message
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button with Loading Spinner */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full font-bold shadow-md"
            disabled={status === 'submitting'}
            icon={status === 'submitting' ? Loader2 : Send}
          >
            {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
          </Button>
        </div>

        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
          Emails are delivered directly to <span className="font-semibold text-slate-600 dark:text-slate-400">{personalInfo.email}</span>.
        </p>
      </form>
    </div>
  );
}
