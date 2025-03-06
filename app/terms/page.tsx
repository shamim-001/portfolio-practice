import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our website and services.",
}

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
        <div className="mt-8 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">Agreement to Terms</h2>
            <p className="mt-4 leading-relaxed">
              By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with
              any part of these terms, you may not access our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Services</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>Our services include:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Web Design and Development</li>
                <li>Local SEO Services</li>
                <li>Google Business Profile Optimization</li>
                <li>Technical SEO Services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
            <p className="mt-4 leading-relaxed">
              The content, features, and functionality of our website are owned by us and are protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">User Responsibilities</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>When using our services, you agree to:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use our services in compliance with applicable laws</li>
                <li>Not engage in any unauthorized or harmful activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Payment Terms</h2>
            <p className="mt-4 leading-relaxed">
              Payment terms and conditions will be specified in individual service agreements. All fees are
              non-refundable unless otherwise stated in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
            <p className="mt-4 leading-relaxed">
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting
              from your use of our services or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
            <p className="mt-4 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via
              email or through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
            <p className="mt-4 leading-relaxed">
              For questions about these Terms of Service, please{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </section>

          <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

