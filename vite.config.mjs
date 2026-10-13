import dns from 'node:dns';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('ipv4first');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

function createContactApiMiddleware(env) {
  // Ashish's receiver email is configured on the backend
  const receiverEmail = env.CONTACT_RECEIVER_EMAIL || 'ashishsingh2b@gmail.com';

  return async (req, res, next) => {
    if (!req.url || !req.url.startsWith('/api/contact')) {
      return next();
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed. Use POST.' }));
      return;
    }

    try {
      const rawBody = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
          if (data.length > 1e6) {
            reject(new Error('Payload too large'));
          }
        });
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });

      const payload = JSON.parse(rawBody || '{}');
      const companyOrClientName = (payload.companyOrClientName || '').trim();
      const senderEmail = (payload.email || '').trim();
      const subject = (payload.subject || '').trim();
      const message = (payload.message || '').trim();

      // Backend validation of all required fields and email format
      if (!companyOrClientName || companyOrClientName.length < 2) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Please provide a valid Company Name or Client Name.' }));
        return;
      }
      if (!senderEmail || !EMAIL_REGEX.test(senderEmail)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Please provide a valid Sender Email Address.' }));
        return;
      }
      if (!subject || subject.length < 3) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Please provide a valid Subject or Job Role.' }));
        return;
      }
      if (!message || message.length < 10) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Please provide a message of at least 10 characters.' }));
        return;
      }
      if (payload.humanVerified !== true) {
        res.statusCode = 400;
        res.end(JSON.stringify({ ok: false, error: 'Please check "I am human" to verify before sending.' }));
        return;
      }

      const formattedSubject = `[Portfolio Hiring / Inquiry] ${subject} — ${companyOrClientName}`;

      // 1. Resend API (if RESEND_API_KEY is configured in backend .env)
      if (env.RESEND_API_KEY) {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [receiverEmail],
            reply_to: senderEmail,
            subject: formattedSubject,
            text: `New message for Ashish Singh:\n\nCompany / Client Name: ${companyOrClientName}\nSender's Email: ${senderEmail}\nSubject / Job Role: ${subject}\n\nMessage:\n${message}`,
          }),
        });

        if (!resendRes.ok) {
          const errData = await resendRes.json().catch(() => ({}));
          throw new Error(errData?.message || 'Resend email service failed to deliver the message.');
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, message: 'Message delivered successfully to Ashish Singh.' }));
        return;
      }

      // 2. Web3Forms API (if WEB3FORMS_ACCESS_KEY is configured in backend .env)
      if (env.WEB3FORMS_ACCESS_KEY) {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: env.WEB3FORMS_ACCESS_KEY,
            subject: formattedSubject,
            from_name: companyOrClientName,
            email: senderEmail,
            replyto: senderEmail,
            company_or_client_name: companyOrClientName,
            sender_email: senderEmail,
            job_role_or_subject: subject,
            message,
          }),
        });

        const web3Data = await web3Res.json().catch(() => ({}));
        if (!web3Res.ok || !web3Data.success) {
          throw new Error(web3Data?.message || 'Web3Forms email service failed to deliver the message.');
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, message: 'Message delivered successfully to Ashish Singh.' }));
        return;
      }

      // 3. EmailJS REST API (if EMAILJS or VITE_EMAILJS credentials are configured in .env)
      const emailJsServiceId = env.EMAILJS_SERVICE_ID || env.VITE_EMAILJS_SERVICE_ID;
      const emailJsTemplateId = env.EMAILJS_TEMPLATE_ID || env.VITE_EMAILJS_TEMPLATE_ID;
      const emailJsPublicKey = env.EMAILJS_PUBLIC_KEY || env.VITE_EMAILJS_PUBLIC_KEY;

      if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
        const emailJsPayload = {
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          accessToken: env.EMAILJS_PRIVATE_KEY,
          template_params: {
            to_name: 'Ashish Singh',
            to_email: receiverEmail,
            company_name: companyOrClientName,
            client_name: companyOrClientName,
            company_or_client_name: companyOrClientName,
            from_name: companyOrClientName,
            from_email: senderEmail,
            sender_email: senderEmail,
            reply_to: senderEmail,
            subject,
            job_role: subject,
            message,
          },
        };

        const emailJsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailJsPayload),
        });

        if (!emailJsRes.ok) {
          const errText = await emailJsRes.text();
          throw new Error(errText || 'EmailJS service failed to deliver the message.');
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, message: 'Message delivered successfully to Ashish Singh.' }));
        return;
      }

      // 4. Formspree (configured via backend FORMSPREE_ENDPOINT or FORMSPREE_ID in .env, ignoring broken placeholder mqkvygqk)
      const validFormspreeId =
        env.FORMSPREE_ID && env.FORMSPREE_ID !== 'mqkvygqk' ? env.FORMSPREE_ID : null;
      const formspreeEndpoint =
        env.FORMSPREE_ENDPOINT && !env.FORMSPREE_ENDPOINT.includes('mqkvygqk')
          ? env.FORMSPREE_ENDPOINT
          : validFormspreeId
            ? `https://formspree.io/f/${validFormspreeId}`
            : null;

      if (formspreeEndpoint) {
        const fsRes = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            companyOrClientName,
            name: companyOrClientName,
            email: senderEmail,
            _replyto: senderEmail,
            subject,
            _subject: formattedSubject,
            message: `Company / Client Name: ${companyOrClientName}\nSender Email: ${senderEmail}\nSubject / Job Role: ${subject}\n\nMessage for Ashish:\n${message}`,
          }),
        });

        const fsData = await fsRes.json().catch(() => ({}));
        if (!fsRes.ok) {
          const errorMsg =
            fsData?.errors?.map((e) => e.message).join(', ') ||
            'Email delivery service rejected the request. Please verify backend email configuration.';
          throw new Error(errorMsg);
        }

        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, message: 'Message delivered successfully to Ashish Singh.' }));
        return;
      }

      // 5. Default direct delivery to receiverEmail (ashishsingh2b@gmail.com) via FormSubmit service
      const originHeader = req.headers.origin || 'http://localhost:3000';
      const refererHeader = req.headers.referer || 'http://localhost:3000/';
      const userAgentHeader =
        req.headers['user-agent'] ||
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

      const formPayload = {
        _subject: formattedSubject,
        _replyto: senderEmail,
        _template: 'table',
        _captcha: 'false',
        'Company or Client Name': companyOrClientName,
        "Sender's Email Address": senderEmail,
        'Subject / Job Role': subject,
        'Message for Ashish': message,
      };

      const fsSubmitRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(receiverEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: originHeader,
          Referer: refererHeader,
          'User-Agent': userAgentHeader,
        },
        body: JSON.stringify(formPayload),
      });

      const fsSubmitData = await fsSubmitRes.json().catch(() => ({}));
      const isActivationNotice =
        typeof fsSubmitData?.message === 'string' &&
        /activation|activate form/i.test(fsSubmitData.message);

      if (isActivationNotice) {
        // Trigger standard endpoint so FormSubmit dispatches the activation/submission email to ashishsingh2b@gmail.com
        const urlEncoded = new URLSearchParams(formPayload).toString();
        await fetch(`https://formsubmit.co/${encodeURIComponent(receiverEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: originHeader,
            Referer: refererHeader,
            'User-Agent': userAgentHeader,
          },
          body: urlEncoded,
        }).catch(() => {});

        res.statusCode = 200;
        res.end(
          JSON.stringify({
            ok: true,
            activationPending: true,
            message: 'Message submitted successfully to Ashish Singh.',
          })
        );
        return;
      }

      if (!fsSubmitRes.ok || fsSubmitData.success === 'false' || fsSubmitData.success === false) {
        throw new Error(
          fsSubmitData?.message || 'Unable to send email through backend provider. Please check backend configuration.'
        );
      }

      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true, message: 'Message delivered successfully to Ashish Singh.' }));
    } catch (err) {
      res.statusCode = 502;
      res.end(
        JSON.stringify({
          ok: false,
          error: err.message || 'Failed to deliver message. Please try again later.',
        })
      );
    }
  };
}

function contactBackendPlugin(env) {
  const middleware = createContactApiMiddleware(env);
  return {
    name: 'contact-email-backend',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all environment variables (including non-VITE_ backend secrets) on the server only
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), contactBackendPlugin(env)],
    server: {
      port: 3000,
      open: false,
      host: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
  };
});
