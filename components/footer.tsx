import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Web Design", href: "/services/web-design" },
    { name: "Local SEO", href: "/services/local-seo" },
    { name: "GBP Optimization", href: "/services/gbp-optimization" },
    { name: "Technical SEO", href: "/services/technical-seo" },
  ],
  social: [
    { name: "GitHub", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Email", icon: Mail, href: "mailto:hello@example.com" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-10 md:py-16 lg:py-20">
        {/* Mobile Footer */}
        <div className="space-y-8 md:hidden">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              Professional web designer and local SEO expert helping businesses grow their online presence.
            </p>
            <div className="flex gap-6">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/70 transition-colors hover:text-primary"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Navigation Accordion */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Navigation</h3>
              <ul className="grid grid-cols-2 gap-2">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="grid grid-cols-2 gap-2">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="mailto:hello@example.com"
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    hello@example.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+1234567890"
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    (123) 456-7890
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              Professional web designer and local SEO expert helping businesses grow their online presence.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/70 transition-colors hover:text-primary"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="mailto:hello@example.com"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  hello@example.com
                </Link>
              </li>
              <li>
                <address className="text-sm text-foreground/80 not-italic">
                  123 Street Name
                  <br />
                  City, State 12345
                </address>
              </li>
              <li>
                <Link
                  href="tel:+1234567890"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  (123) 456-7890
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-foreground/70">© {currentYear} Shamim Ahsan. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

