import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection information for our website.",
}

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
            <p className="mt-4 leading-relaxed">
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our
              website. By using our services, you agree to the collection and use of information in accordance with this
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number (if provided)</li>
                <li>Messages sent through our contact form</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Data Protection</h2>
            <p className="mt-4 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
            <p className="mt-4 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and improve user
              experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>You have the right to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p className="mt-4 leading-relaxed">
              If you have questions about this Privacy Policy, please{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Updates to This Policy</h2>
            <p className="mt-4 leading-relaxed">
              We may update this Privacy Policy from time to time. The latest version will be posted on this page with
              the effective date.
            </p>
          </section>

          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

