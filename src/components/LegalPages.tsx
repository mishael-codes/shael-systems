import { Link } from "react-router-dom";

const lastUpdated = "November 13, 2026";

function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
          ← Back to Shael Systems
        </Link>
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Shael Systems
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">{intro}</p>
        <p className="mt-4 text-sm text-slate-500">Last updated: {lastUpdated}</p>
        <div className="mt-12 space-y-10 text-slate-700 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-950 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </article>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This policy explains how Shael Systems handles information submitted through this website and our related enquiry channels."
    >
      <section>
        <h2>1. Who we are</h2>
        <p>
          Shael Systems is the data controller responsible for the personal
          information described in this policy. For privacy questions or
          requests, contact us at{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:hello@shaelsystems.com"
          >
            hello@shaelsystems.com
          </a>
          .
        </p>
      </section>
      <section>
        <h2>2. Information we collect</h2>
        <p>When you use an enquiry form, you may provide:</p>
        <ul>
          <li>Your name and email address.</li>
          <li>Your business or brand name, industry, and website type.</li>
          <li>Your phone or WhatsApp number, if you choose to provide it.</li>
          <li>Your project goals or message.</li>
        </ul>
        <p>
          We also receive basic technical information that your browser and
          hosting provider may process to deliver and secure the website. We do
          not intentionally collect sensitive personal data through these forms.
        </p>
      </section>
      <section>
        <h2>3. How we use your information</h2>
        <p>We use enquiry information to:</p>
        <ul>
          <li>Respond to your request and discuss or prepare our services.</li>
          <li>Send the information to our business email for follow-up.</li>
          <li>Prevent spam and protect the forms and website from misuse.</li>
          <li>
            Meet legal, accounting, or dispute-resolution obligations where
            required.
          </li>
        </ul>
        <p>
          We do not sell your personal information or use it for unrelated
          marketing without a lawful basis and, where required, your consent.
        </p>
      </section>
      <section>
        <h2>4. Legal bases</h2>
        <p>
          Depending on the context, we process information because it is
          necessary to take steps at your request before entering a contract, to
          perform a contract, to comply with a legal obligation, to prevent
          fraud or abuse, or because you have given consent. You may withdraw
          consent where consent is the basis, without affecting processing that
          occurred before withdrawal.
        </p>
      </section>
      <section>
        <h2>5. Service providers and transfers</h2>
        <p>
          We use service providers to host the website and deliver form
          notifications, including Vercel and Resend. They process information
          only as needed to provide those services and may process it outside
          Nigeria. We take reasonable steps to use appropriate contractual,
          organisational, and technical safeguards for any transfer.
        </p>
      </section>
      <section>
        <h2>6. Retention and security</h2>
        <p>
          We keep enquiry information only for as long as reasonably necessary
          to respond, manage a prospective or completed engagement, meet legal
          obligations, resolve disputes, and protect our legitimate interests.
          We use reasonable safeguards, but no internet transmission or storage
          system can be guaranteed completely secure.
        </p>
      </section>
      <section>
        <h2>7. Your rights</h2>
        <p>
          Subject to applicable law, you may ask us for access to, correction,
          deletion, restriction of, or a copy of your personal information, or
          object to certain processing. Send a request to{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:hello@shaelsystems.com"
          >
            hello@shaelsystems.com
          </a>
          . You may also contact the Nigeria Data Protection Commission (NDPC)
          if you believe your rights have not been respected.
        </p>
      </section>
      <section>
        <h2>8. Cookies</h2>
        <p>
          This website does not currently use advertising, analytics, or other
          non-essential cookies. It may use strictly necessary technical storage
          or browser storage, such as a short form-submission cooldown, to
          operate and protect the forms. If our use of cookies changes, we will
          update this policy and provide any notice or choices required by law.
        </p>
      </section>
      <section>
        <h2>9. Changes and contact</h2>
        <p>
          We may update this policy when our services or legal obligations
          change. The date above shows when it was last revised. If you have a
          question or want to exercise a privacy right, email{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:hello@shaelsystems.com"
          >
            hello@shaelsystems.com
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}

export function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These terms govern your use of the Shael Systems website and the initial enquiries you submit through it."
    >
      <section>
        <h2>1. About these terms</h2>
        <p>
          By using this website or submitting an enquiry, you agree to these
          terms. If you do not agree, please do not use the website. A quote,
          enquiry, or consultation does not by itself create a contract for paid
          services.
        </p>
      </section>
      <section>
        <h2>2. Enquiries and proposals</h2>
        <p>
          Information on this website is general information about our services.
          Any scope, price, timeline, deliverables, payment terms, and ownership
          terms will be set out in a separate written agreement accepted by both
          parties. We may decline an enquiry at our discretion.
        </p>
      </section>
      <section>
        <h2>3. Acceptable use</h2>
        <p>You must not use this website to:</p>
        <ul>
          <li>Submit false, misleading, unlawful, abusive, or malicious content.</li>
          <li>Attempt to bypass security, send spam, or interfere with the website.</li>
          <li>Infringe another person&apos;s privacy, intellectual property, or other rights.</li>
        </ul>
      </section>
      <section>
        <h2>4. Intellectual property</h2>
        <p>
          The website&apos;s text, design, branding, and code belong to Shael
          Systems or its licensors unless stated otherwise. You may not copy,
          modify, distribute, or commercially exploit them without permission.
          Ownership and licensing of work created for a client will be governed by
          the separate client agreement.
        </p>
      </section>
      <section>
        <h2>5. Third-party links and availability</h2>
        <p>
          The website may link to third-party services such as WhatsApp or
          LinkedIn. We do not control those services and are not responsible for
          their content, availability, or privacy practices. We aim to keep this
          website available and accurate, but it is provided on an &quot;as
          available&quot; basis.
        </p>
      </section>
      <section>
        <h2>6. Liability</h2>
        <p>
          To the extent permitted by Nigerian law, Shael Systems is not liable for
          indirect, incidental, special, or consequential loss arising from use of
          this website. Nothing in these terms excludes or limits liability that
          cannot lawfully be excluded, including liability for fraud or death or
          personal injury caused by negligence.
        </p>
      </section>
      <section>
        <h2>7. Governing law</h2>
        <p>
          These terms are governed by the laws of the Federal Republic of Nigeria.
          We will try to resolve disputes through good-faith discussion first. If
          that does not resolve a dispute, the courts with appropriate
          jurisdiction in Nigeria may hear it.
        </p>
      </section>
      <section>
        <h2>8. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a className="text-blue-600 hover:underline" href="mailto:hello@shaelsystems.com">
            hello@shaelsystems.com
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
