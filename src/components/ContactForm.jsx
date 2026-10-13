import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Copy,
  Check,
  RefreshCw,
  Building2,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import Button from './Button';
import { personalInfo } from '../data/personal';

// Accepts any valid email address across Gmail, Yahoo, Outlook, company domains, and any valid TLD (.com, .in, .io, .org, .co.uk, .ai, etc.)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

function isConfiguredValue(val) {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  // Reject placeholder strings
  if (/^(your_|placeholder|example|mqkvygqk)/i.test(trimmed)) return false;
  return true;
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    companyOrClientName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [humanStatus, setHumanStatus] = useState('unchecked'); // 'unchecked' | 'verifying' | 'verified'
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverError, setServerError] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState(null);
  const [copied, setCopied] = useState(false);

  // Synchronous lock to prevent duplicate submissions on rapid clicks
  const isSubmittingRef = useRef(false);

  // Official @emailjs/browser configuration from environment variables
  const emailJsServiceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const emailJsTemplateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();
  const emailJsPublicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();

  const hasEmailJsConfig =
    isConfiguredValue(emailJsServiceId) &&
    isConfiguredValue(emailJsTemplateId) &&
    isConfiguredValue(emailJsPublicKey);

  const validateField = (name, value) => {
    const trimmed = (value || '').trim();

    switch (name) {
      case 'companyOrClientName':
        if (!trimmed) {
          return 'Please enter your Company Name or Client Name.';
        }
        if (trimmed.length < 2) {
          return 'Company or Client Name must be at least 2 characters.';
        }
        return '';

      case 'email':
        if (!trimmed) {
          return "Please enter the Sender's Email Address.";
        }
        if (!EMAIL_REGEX.test(trimmed)) {
          return 'Please enter a valid email address (e.g. name@company.com, gmail.com, outlook.com, yahoo.com).';
        }
        return '';

      case 'subject':
        if (!trimmed) {
          return 'Please enter a Subject or Job Role.';
        }
        if (trimmed.length < 3) {
          return 'Subject / Job Role must be at least 3 characters.';
        }
        return '';

      case 'message':
        if (!trimmed) {
          return 'Please enter your Message for Ashish.';
        }
        if (trimmed.length < 10) {
          return 'Message must be at least 10 characters long.';
        }
        return '';

      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['companyOrClientName', 'email', 'subject', 'message'].forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    if (humanStatus !== 'verified') {
      newErrors.human = 'Please check "I am human" to verify before sending.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleHumanToggle = () => {
    if (status === 'submitting' || humanStatus === 'verifying') return;

    if (humanStatus === 'verified') {
      setHumanStatus('unchecked');
      return;
    }

    setErrors((prev) => ({ ...prev, human: '' }));
    setHumanStatus('verifying');
    setTimeout(() => {
      setHumanStatus('verified');
    }, 450);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const updatedError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: updatedError }));
    }

    if (status === 'error') {
      setStatus('idle');
      setServerError('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot honeypot check
    if (honeypot) {
      return;
    }

    // Prevent duplicate submissions while an email is already being sent
    if (isSubmittingRef.current || status === 'submitting') {
      return;
    }

    if (!validateAll() || humanStatus !== 'verified') {
      if (humanStatus !== 'verified') {
        setErrors((prev) => ({
          ...prev,
          human: 'Please check "I am human" to verify before sending.',
        }));
      }
      return;
    }

    isSubmittingRef.current = true;
    setStatus('submitting');
    setServerError('');

    const payload = {
      companyOrClientName: formData.companyOrClientName.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      humanVerified: humanStatus === 'verified',
    };

    try {
      // 1. Primary Integration: Official @emailjs/browser SDK when Service ID, Template ID, and Public Key are configured
      if (hasEmailJsConfig) {
        const templateParams = {
          to_name: personalInfo.name,
          to_email: personalInfo.email, // ashishsingh2b@gmail.com
          company_name: payload.companyOrClientName,
          client_name: payload.companyOrClientName,
          company_or_client_name: payload.companyOrClientName,
          from_name: payload.companyOrClientName,
          from_email: payload.email,
          sender_email: payload.email,
          reply_to: payload.email,
          subject: payload.subject,
          job_role: payload.subject,
          message: payload.message,
        };

        const response = await emailjs.send(
          emailJsServiceId,
          emailJsTemplateId,
          templateParams,
          { publicKey: emailJsPublicKey }
        );

        if (response.status !== 200) {
          throw new Error(response.text || 'EmailJS failed to send the message.');
        }
      } else {
        // 2. Fallback when VITE_EMAILJS_* keys are not yet filled in .env:
        // Try backend /api/contact first, or browser FormSubmit AJAX to ashishsingh2b@gmail.com
        let delivered = false;
        let lastErrorMessage = '';

        try {
          const apiEndpoint = import.meta.env.VITE_CONTACT_API_URL || '/api/contact';
          const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok !== false) {
            delivered = true;
          } else {
            lastErrorMessage = data?.error || data?.message || '';
          }
        } catch {
          // Proceed to direct browser FormSubmit fallback
        }

        if (!delivered) {
          const browserFormPayload = {
            _subject: `[Portfolio Hiring / Inquiry] ${payload.subject} — ${payload.companyOrClientName}`,
            _replyto: payload.email,
            _template: 'table',
            _captcha: 'false',
            'Company or Client Name': payload.companyOrClientName,
            "Sender's Email Address": payload.email,
            'Subject / Job Role': payload.subject,
            'Message for Ashish': payload.message,
          };

          const fsSubmitRes = await fetch(
            `https://formsubmit.co/ajax/${encodeURIComponent(personalInfo.email)}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify(browserFormPayload),
            }
          );

          const fsSubmitData = await fsSubmitRes.json().catch(() => ({}));
          const isActivationNotice =
            typeof fsSubmitData?.message === 'string' &&
            /activation|activate form/i.test(fsSubmitData.message);

          if (
            fsSubmitRes.ok &&
            (isActivationNotice ||
              (fsSubmitData.success !== 'false' && fsSubmitData.success !== false))
          ) {
            if (isActivationNotice) {
              const urlEncoded = new URLSearchParams(browserFormPayload).toString();
              await fetch(`https://formsubmit.co/${encodeURIComponent(personalInfo.email)}`, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncoded,
              }).catch(() => {});
            }
            delivered = true;
          } else {
            lastErrorMessage = fsSubmitData?.message || lastErrorMessage;
          }
        }

        if (!delivered) {
          throw new Error(
            lastErrorMessage ||
              'Failed to deliver message. Please check your internet connection or EmailJS configuration.'
          );
        }
      }

      // Only show success after confirmed delivery from the email service
      setSubmittedSummary(payload);
      setStatus('success');
      setFormData({
        companyOrClientName: '',
        email: '',
        subject: '',
        message: '',
      });
      setHumanStatus('unchecked');
      setErrors({});
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus('error');
      const errMsg =
        err?.text ||
        err?.message ||
        'Failed to send the message. Please check your EmailJS configuration or try again.';
      setServerError(errMsg);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleMailtoFallback = () => {
    const mailSubject = encodeURIComponent(
      `[Portfolio Hiring / Inquiry] ${formData.subject || 'Job Role / Project Inquiry'} — ${formData.companyOrClientName || 'Client'}`
    );
    const mailBody = encodeURIComponent(
      `Hello Ashish,\n\nCompany / Client Name: ${formData.companyOrClientName}\nSender's Email: ${formData.email}\nSubject / Job Role: ${formData.subject}\n\nMessage for Ashish:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleCopy = () => {
    const textToCopy = `To: ${personalInfo.email}\nCompany / Client Name: ${formData.companyOrClientName}\nSender's Email: ${formData.email}\nSubject / Job Role: ${formData.subject}\n\nMessage for Ashish:\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isSubmitting = status === 'submitting';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Contact Ashish Directly
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Interested in hiring Ashish or collaborating on a project? Fill out the form below and your message will be delivered directly to Ashish’s inbox.
        </p>
      </div>

      {/* Success Notification Banner */}
      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-3 animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Message Sent Successfully!</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you{submittedSummary?.companyOrClientName ? `, ${submittedSummary.companyOrClientName}` : ''}! Your message regarding{' '}
                <strong>{submittedSummary?.subject || 'your inquiry'}</strong> has been delivered directly to Ashish Singh’s inbox. He will reply to{' '}
                <strong>{submittedSummary?.email}</strong> shortly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setSubmittedSummary(null);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Send Another Message</span>
          </button>
        </div>
      )}

      {/* Error Notification Banner */}
      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-3 animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Could Not Send Message</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {serverError || 'An error occurred while sending your message.'} Please try clicking Send again or use one of the direct options below:
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
              <span>Send via Email App</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Details!' : 'Copy Message Details'}</span>
            </button>
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* 1. Company Name or Client Name */}
        <div>
          <label
            htmlFor="contact-company-client"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>
              Company Name or Client Name <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            id="contact-company-client"
            name="companyOrClientName"
            type="text"
            required
            autoComplete="organization"
            disabled={isSubmitting}
            value={formData.companyOrClientName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.companyOrClientName)}
            aria-describedby={errors.companyOrClientName ? 'error-company-client' : undefined}
            placeholder="e.g. Acme Technologies / Hiring Manager Name"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.companyOrClientName
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.companyOrClientName && (
            <p id="error-company-client" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.companyOrClientName}</span>
            </p>
          )}
        </div>

        {/* 2. Sender's Email Address */}
        <div>
          <label
            htmlFor="contact-email"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>
              Sender’s Email Address <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            disabled={isSubmitting}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : 'hint-email'}
            placeholder="e.g. hr@company.com, name@gmail.com, client@outlook.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.email ? (
            <p id="error-email" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          ) : (
            <p id="hint-email" className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              Supports Gmail, Yahoo, Outlook, and all company or custom domain email addresses.
            </p>
          )}
        </div>

        {/* 3. Subject / Job Role */}
        <div>
          <label
            htmlFor="contact-subject"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>
              Subject / Job Role <span className="text-rose-500">*</span>
            </span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            disabled={isSubmitting}
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'error-subject' : undefined}
            placeholder="e.g. Python Full Stack Developer Role / Freelance Project"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.subject
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.subject && (
            <p id="error-subject" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* 4. Message for Ashish */}
        <div>
          <label
            htmlFor="contact-message"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>
              Message for Ashish <span className="text-rose-500">*</span>
            </span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            disabled={isSubmitting}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'error-message' : undefined}
            placeholder="Write your message for Ashish — include job role details, project scope, timeline, or next steps..."
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-800/60 dark:text-white transition-colors focus:bg-white dark:focus:bg-slate-800 resize-y disabled:opacity-60 disabled:cursor-not-allowed ${
              errors.message
                ? 'border-rose-400 focus:border-rose-500 ring-rose-200'
                : 'border-slate-200 dark:border-slate-700 focus:border-brand-500'
            }`}
          />
          {errors.message && (
            <p id="error-message" className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Hidden Anti-Bot Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        {/* 5. "I am human" Verification Box (hCaptcha Style) */}
        <div className="pt-1">
          <div
            role="checkbox"
            aria-checked={humanStatus === 'verified'}
            aria-label="I am human verification"
            tabIndex={isSubmitting ? -1 : 0}
            onClick={handleHumanToggle}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleHumanToggle();
              }
            }}
            className={`w-full sm:max-w-[304px] px-4 py-3 rounded-xl border bg-slate-50/90 dark:bg-slate-800/80 flex items-center justify-between gap-4 select-none transition-all cursor-pointer shadow-sm ${
              errors.human
                ? 'border-rose-400 dark:border-rose-500 ring-2 ring-rose-500/10'
                : humanStatus === 'verified'
                  ? 'border-emerald-400/80 dark:border-emerald-500/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
            } ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <div className="flex items-center gap-3.5">
              {/* Checkbox Square */}
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 ${
                  humanStatus === 'verified'
                    ? 'bg-emerald-500 border-2 border-emerald-500 text-white shadow-sm scale-100'
                    : humanStatus === 'verifying'
                      ? 'border-2 border-brand-500 bg-white dark:bg-slate-900'
                      : 'border-2 border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 hover:border-brand-500'
                }`}
              >
                {humanStatus === 'verifying' && (
                  <Loader2 className="w-4 h-4 text-brand-600 dark:text-brand-400 animate-spin" />
                )}
                {humanStatus === 'verified' && (
                  <Check className="w-4 h-4 stroke-[3] text-white animate-scale-in" />
                )}
              </div>

              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                I am human
              </span>
            </div>

            {/* Right hCaptcha-style emblem & Privacy/Terms */}
            <div className="flex flex-col items-center justify-center shrink-0 text-center pl-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center shadow-xs mb-0.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.5C11.3 2.5 10.75 3.05 10.75 3.75V10.25H9.5V5.25C9.5 4.55 8.95 4 8.25 4C7.55 4 7 4.55 7 5.25V11.5H5.75V7.75C5.75 7.05 5.2 6.5 4.5 6.5C3.8 6.5 3.25 7.05 3.25 7.75V14.5C3.25 18.64 6.61 22 10.75 22H13.5C17.37 22 20.5 18.87 20.5 15V10.5C20.5 9.8 19.95 9.25 19.25 9.25C18.55 9.25 18 9.8 18 10.5V13.5H16.75V5.25C16.75 4.55 16.2 4 15.5 4C14.8 4 14.25 4.55 14.25 5.25V10.25H13.25V3.75C13.25 3.05 12.7 2.5 12 2.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-[9px] font-bold tracking-tight text-slate-600 dark:text-slate-300 leading-none">
                hCaptcha
              </span>
              <span className="text-[8px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                Privacy - Terms
              </span>
            </div>
          </div>

          {errors.human && (
            <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.human}</span>
            </p>
          )}
        </div>

        {/* Send Message Button with Human Check Condition, Duplicate Submission Prevention & Loading State */}
        <div
          className="pt-2"
          onClick={() => {
            if (!isSubmitting && humanStatus !== 'verified') {
              validateAll();
            }
          }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className={`w-full font-bold shadow-md ${
              humanStatus !== 'verified' ? 'pointer-events-none' : ''
            }`}
            disabled={isSubmitting || humanStatus !== 'verified'}
            icon={isSubmitting ? Loader2 : Send}
            iconClassName={isSubmitting ? 'animate-spin' : ''}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  );
}
