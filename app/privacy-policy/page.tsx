"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield, Eye, Lock, Database, Globe, ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll(".policy-section")
      sections.forEach((section) => observer.observe(section))
    }

    return () => {
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll(".policy-section")
        sections.forEach((section) => observer.unobserve(section))
      }
    }
  }, [])

  return (
    <div className="legal-page">
      <Header />

      <main className="legal-main">
        <div className="legal-container">
          {/* Header */}
          <div className="legal-header">
            <Link href="/" className="legal-back-button">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="legal-title-section">
              <div className="legal-icon">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="legal-title">Privacy Policy</h1>
              <p className="legal-subtitle">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="legal-meta">
                <span>Last updated: {new Date().toLocaleDateString()}</span>
                <span>Effective date: January 1, 2024</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="legal-content">
            {/* Introduction */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Eye className="w-6 h-6 text-cyan-500" />
                <h2>Introduction</h2>
              </div>
              <div className="policy-content">
                <p>
                  Welcome to NoWhile.com ("we," "our," or "us"). This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website nowhile.com, including any other
                  media form, media channel, mobile website, or mobile application related or connected thereto.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                  please do not access the site. We reserve the right to make changes to this Privacy Policy at any time
                  and for any reason.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Database className="w-6 h-6 text-cyan-500" />
                <h2>Information We Collect</h2>
              </div>
              <div className="policy-content">
                <h3>Personal Data</h3>
                <p>
                  Personally identifiable information, such as your name, shipping address, email address, and telephone
                  number, and demographic information, such as your age, gender, hometown, and interests, that you
                  voluntarily give to us when you register with the site or when you choose to participate in various
                  activities related to the site.
                </p>

                <h3>Derivative Data</h3>
                <p>
                  Information our servers automatically collect when you access the site, such as your IP address, your
                  browser type, your operating system, your access times, and the pages you have viewed directly before
                  and after accessing the site.
                </p>

                <h3>Financial Data</h3>
                <p>
                  Financial information, such as data related to your payment method (e.g., valid credit card number,
                  card brand, expiration date) that we may collect when you purchase, order, return, exchange, or
                  request information about our services from the site.
                </p>

                <h3>Data from Social Networks</h3>
                <p>
                  User information from social networking sites, such as GitHub, LinkedIn, Twitter, including your name,
                  your social network username, location, gender, birth date, email address, profile picture, and public
                  data for contacts, if you connect your account to such social networks.
                </p>

                <h3>Mobile Device Data</h3>
                <p>
                  Device information, such as your mobile device ID, model, and manufacturer, and information about the
                  location of your device, if you access the site from a mobile device.
                </p>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Globe className="w-6 h-6 text-cyan-500" />
                <h2>How We Use Your Information</h2>
              </div>
              <div className="policy-content">
                <p>
                  Having accurate information about you permits us to provide you with a smooth, efficient, and
                  customized experience. Specifically, we may use information collected about you via the site to:
                </p>
                <ul className="policy-list">
                  <li>Administer sweepstakes, promotions, and contests</li>
                  <li>Assist law enforcement and respond to subpoenas</li>
                  <li>Compile anonymous statistical data and analysis for use internally or with third parties</li>
                  <li>Create and manage your account</li>
                  <li>Deliver targeted advertising, coupons, newsletters, and promotions</li>
                  <li>Email you regarding your account or order</li>
                  <li>Enable user-to-user communications</li>
                  <li>Fulfill and manage purchases, orders, payments, and other transactions</li>
                  <li>Generate a personal profile about you to make future visits more personalized</li>
                  <li>Increase the efficiency and operation of the site</li>
                  <li>Monitor and analyze usage and trends to improve your experience</li>
                  <li>Notify you of updates to the site</li>
                  <li>Offer new products, services, and/or recommendations</li>
                  <li>Perform other business activities as needed</li>
                  <li>Prevent fraudulent transactions, monitor against theft</li>
                  <li>Process payments and refunds</li>
                  <li>Request feedback and contact you about your use of the site</li>
                  <li>Resolve disputes and troubleshoot problems</li>
                  <li>Respond to product and customer service requests</li>
                  <li>Send you a newsletter</li>
                  <li>Solicit support for the site</li>
                </ul>
              </div>
            </section>

            {/* Disclosure of Information */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Lock className="w-6 h-6 text-cyan-500" />
                <h2>Disclosure of Your Information</h2>
              </div>
              <div className="policy-content">
                <p>
                  We may share information we have collected about you in certain situations. Your information may be
                  disclosed as follows:
                </p>

                <h3>By Law or to Protect Rights</h3>
                <p>
                  If we believe the release of information about you is necessary to respond to legal process, to
                  investigate or remedy potential violations of our policies, or to protect the rights, property, and
                  safety of others, we may share your information as permitted or required by any applicable law, rule,
                  or regulation.
                </p>

                <h3>Business Transfers</h3>
                <p>
                  We may share or transfer your information in connection with, or during negotiations of, any merger,
                  sale of company assets, financing, or acquisition of all or a portion of our business to another
                  company.
                </p>

                <h3>Third-Party Service Providers</h3>
                <p>
                  We may share your information with third parties that perform services for us or on our behalf,
                  including payment processing, data analysis, email delivery, hosting services, customer service, and
                  marketing assistance.
                </p>

                <h3>Marketing Communications</h3>
                <p>
                  With your consent, or with an opportunity for you to withdraw consent, we may share your information
                  with third parties for marketing purposes, as permitted by law.
                </p>

                <h3>Online Postings</h3>
                <p>
                  When you post comments, contributions or other content to the site, your posts may be viewed by all
                  users and may be publicly distributed outside the site in perpetuity.
                </p>

                <h3>Affiliates</h3>
                <p>
                  We may share your information with our affiliates, in which case we will require those affiliates to
                  honor this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Security */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Shield className="w-6 h-6 text-cyan-500" />
                <h2>Security of Your Information</h2>
              </div>
              <div className="policy-content">
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal
                  information. While we have taken reasonable steps to secure the personal information you provide to
                  us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                  method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
                <p>
                  Any information disclosed online is vulnerable to interception and misuse by unauthorized parties.
                  Therefore, we cannot guarantee complete security if you provide personal information.
                </p>
              </div>
            </section>

            {/* Policy for Children */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Shield className="w-6 h-6 text-cyan-500" />
                <h2>Policy for Children</h2>
              </div>
              <div className="policy-content">
                <p>
                  We do not knowingly solicit information from or market to children under the age of 13. If you become
                  aware of any data we have collected from children under age 13, please contact us using the contact
                  information provided below.
                </p>
              </div>
            </section>

            {/* Controls for Do-Not-Track Features */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Eye className="w-6 h-6 text-cyan-500" />
                <h2>Controls for Do-Not-Track Features</h2>
              </div>
              <div className="policy-content">
                <p>
                  Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting
                  you can activate to signal your privacy preference not to have data about your online browsing
                  activities monitored and collected. No uniform technology standard for recognizing and implementing
                  DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any
                  other mechanism that automatically communicates your choice not to be tracked online.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Globe className="w-6 h-6 text-cyan-500" />
                <h2>Contact Us</h2>
              </div>
              <div className="policy-content">
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                <div className="contact-info">
                  <p>
                    <strong>NoWhile.com</strong>
                  </p>
                  <p>Email: privacy@nowhile.com</p>
                  <p>Website: https://nowhile.com</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
