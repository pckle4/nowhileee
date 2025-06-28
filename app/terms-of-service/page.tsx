"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { FileText, Scale, AlertTriangle, Users, Globe, ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h1 className="legal-title">Terms of Service</h1>
              <p className="legal-subtitle">Please read these terms carefully before using our website and services.</p>
              <div className="legal-meta">
                <span>Last updated: {new Date().toLocaleDateString()}</span>
                <span>Effective date: January 1, 2024</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="legal-content">
            {/* Agreement to Terms */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <FileText className="w-6 h-6 text-cyan-500" />
                <h2>Agreement to Terms</h2>
              </div>
              <div className="policy-content">
                <p>
                  These Terms of Service ("Terms") govern your use of our website located at nowhile.com (the "Service")
                  operated by NoWhile.com ("us", "we", or "our").
                </p>
                <p>
                  Our Privacy Policy also governs your use of the Service and explains how we collect, safeguard and
                  disclose information that results from your use of our web pages. Please read it here:
                  https://nowhile.com/privacy-policy.
                </p>
                <p>
                  Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge
                  that you have read and understood Agreements, and agree to be bound by them.
                </p>
                <p>
                  If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but
                  please let us know by emailing at contact@nowhile.com so we can try to find a solution.
                </p>
              </div>
            </section>

            {/* Communications */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Globe className="w-6 h-6 text-cyan-500" />
                <h2>Communications</h2>
              </div>
              <div className="policy-content">
                <p>
                  By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional
                  materials and other information we may send. However, you may opt out of receiving any, or all, of
                  these communications from us by following the unsubscribe link or by emailing at contact@nowhile.com.
                </p>
              </div>
            </section>

            {/* Purchases */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Scale className="w-6 h-6 text-cyan-500" />
                <h2>Purchases</h2>
              </div>
              <div className="policy-content">
                <p>
                  If you wish to purchase any product or service made available through the Service ("Purchase"), you
                  may be asked to supply certain information relevant to your Purchase including, without limitation,
                  your credit card number, the expiration date of your credit card, your billing address, and your
                  shipping information.
                </p>
                <p>
                  You represent and warrant that: (i) you have the legal right to use any credit card(s) or other
                  payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is
                  true, correct and complete.
                </p>
                <p>
                  The service may employ the use of third party services for the purpose of facilitating payment and the
                  completion of Purchases. By submitting your information, you grant us the right to provide the
                  information to these third parties subject to our Privacy Policy.
                </p>
                <p>
                  We reserve the right to refuse or cancel your order at any time for reasons including but not limited
                  to: product or service availability, errors in the description or price of the product or service,
                  error in your order or other reasons.
                </p>
              </div>
            </section>

            {/* Contests, Sweepstakes and Promotions */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Users className="w-6 h-6 text-cyan-500" />
                <h2>Contests, Sweepstakes and Promotions</h2>
              </div>
              <div className="policy-content">
                <p>
                  Any contests, sweepstakes or other promotions (collectively, "Promotions") made available through the
                  Service may be governed by rules that are separate from these Terms of Service. If you participate in
                  any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a
                  Promotion conflict with these Terms of Service, Promotion rules will apply.
                </p>
              </div>
            </section>

            {/* Subscriptions */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <FileText className="w-6 h-6 text-cyan-500" />
                <h2>Subscriptions</h2>
              </div>
              <div className="policy-content">
                <p>
                  Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed
                  in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a
                  monthly or annual basis, depending on the type of subscription plan you select when purchasing a
                  Subscription.
                </p>
                <p>
                  At the end of each Billing Cycle, your Subscription will automatically renew under the exact same
                  conditions unless you cancel it or NoWhile.com cancels it. You may cancel your Subscription renewal
                  either through your online account management page or by contacting NoWhile.com customer support team.
                </p>
                <p>
                  A valid payment method, including credit card or PayPal, is required to process the payment for your
                  subscription. You shall provide NoWhile.com with accurate and complete billing information including
                  full name, address, state, zip code, telephone number, and a valid payment method information.
                </p>
              </div>
            </section>

            {/* Free Trial */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <AlertTriangle className="w-6 h-6 text-cyan-500" />
                <h2>Free Trial</h2>
              </div>
              <div className="policy-content">
                <p>
                  NoWhile.com may, at its sole discretion, offer a Subscription with a free trial for a limited period
                  of time ("Free Trial").
                </p>
                <p>You may be required to enter your billing information in order to sign up for Free Trial.</p>
                <p>
                  If you do enter your billing information when signing up for Free Trial, you will not be charged by
                  NoWhile.com until Free Trial has expired. On the last day of Free Trial period, unless you cancelled
                  your Subscription, you will be automatically charged the applicable Subscription fees for the type of
                  Subscription you have selected.
                </p>
                <p>
                  At any time and without notice, NoWhile.com reserves the right to (i) modify Terms of Service of Free
                  Trial offer, or (ii) cancel such Free Trial offer.
                </p>
              </div>
            </section>

            {/* Fee Changes */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Scale className="w-6 h-6 text-cyan-500" />
                <h2>Fee Changes</h2>
              </div>
              <div className="policy-content">
                <p>
                  NoWhile.com, in its sole discretion and at any time, may modify Subscription fees for the
                  Subscriptions. Any Subscription fee change will become effective at the end of the then-current
                  Billing Cycle.
                </p>
                <p>
                  NoWhile.com will provide you with a reasonable prior notice of any change in Subscription fees to give
                  you an opportunity to terminate your Subscription before such change becomes effective.
                </p>
                <p>
                  Your continued use of Service after Subscription fee change comes into effect constitutes your
                  agreement to pay the modified Subscription fee amount.
                </p>
              </div>
            </section>

            {/* Refunds */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <FileText className="w-6 h-6 text-cyan-500" />
                <h2>Refunds</h2>
              </div>
              <div className="policy-content">
                <p>Except when required by law, paid Subscription fees are non-refundable.</p>
                <p>
                  Certain refund requests for Subscriptions may be considered by NoWhile.com on a case-by-case basis and
                  granted in sole discretion of NoWhile.com.
                </p>
              </div>
            </section>

            {/* Content */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Globe className="w-6 h-6 text-cyan-500" />
                <h2>Content</h2>
              </div>
              <div className="policy-content">
                <p>
                  Our Service allows you to post, link, store, share and otherwise make available certain information,
                  text, graphics, videos, or other material ("Content"). You are responsible for Content that you post
                  on or through Service, including its legality, reliability, and appropriateness.
                </p>
                <p>By posting Content on or through Service, You represent and warrant that:</p>
                <ul className="policy-list">
                  <li>
                    Content is yours (you own it) and/or you have the right to use it, and you have the right to grant
                    us the rights and license as provided in these Terms
                  </li>
                  <li>
                    Your Content does not infringe, violate or misappropriate the rights of any third party, including
                    any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or
                    any other intellectual property or proprietary right
                  </li>
                </ul>
                <p>
                  NoWhile.com has the right but not the obligation to monitor and edit all Content provided by users.
                </p>
                <p>
                  In addition, Content found on or through this Service are the property of NoWhile.com or used with
                  permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said
                  Content, whether in whole or in part, for commercial purposes or for personal gain, without express
                  advance written permission from us.
                </p>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <AlertTriangle className="w-6 h-6 text-cyan-500" />
                <h2>Prohibited Uses</h2>
              </div>
              <div className="policy-content">
                <p>You may not use our Service:</p>
                <ul className="policy-list">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>
                    To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on
                    gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability
                  </li>
                  <li>To submit false or misleading information</li>
                  <li>
                    To upload or transmit viruses or any other type of malicious code that will or may be used in any
                    way that will affect the functionality or operation of the Service or of any related website, other
                    websites, or the Internet
                  </li>
                  <li>To collect or track the personal information of others</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>
                    To interfere with or circumvent the security features of the Service or any related website, other
                    websites, or the Internet
                  </li>
                </ul>
                <p>
                  We reserve the right to terminate your use of the Service or any related website for violating any of
                  the prohibited uses.
                </p>
              </div>
            </section>

            {/* Intellectual Property Rights */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Scale className="w-6 h-6 text-cyan-500" />
                <h2>Intellectual Property Rights</h2>
              </div>
              <div className="policy-content">
                <p>
                  The Service and its original content, features and functionality are and will remain the exclusive
                  property of NoWhile.com and its licensors. The Service is protected by copyright, trademark, and other
                  laws of both the Country and foreign countries. Our trademarks and trade dress may not be used in
                  connection with any product or service without our prior written consent.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <AlertTriangle className="w-6 h-6 text-cyan-500" />
                <h2>Termination</h2>
              </div>
              <div className="policy-content">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever and without limitation,
                  including but not limited to a breach of the Terms.
                </p>
                <p>If you wish to terminate your account, you may simply discontinue using the Service.</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <AlertTriangle className="w-6 h-6 text-cyan-500" />
                <h2>Disclaimer</h2>
              </div>
              <div className="policy-content">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by
                  law, this Company:
                </p>
                <ul className="policy-list">
                  <li>excludes all representations and warranties relating to this website and its contents</li>
                  <li>
                    excludes all liability for damages arising out of or in connection with your use of this website
                  </li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Scale className="w-6 h-6 text-cyan-500" />
                <h2>Governing Law</h2>
              </div>
              <div className="policy-content">
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of Gujarat, India, without
                  regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                  rights.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <FileText className="w-6 h-6 text-cyan-500" />
                <h2>Changes to Terms</h2>
              </div>
              <div className="policy-content">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material we will provide at least 30 days notice prior to any new terms taking effect.
                  What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound
                  by the revised terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="policy-section opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <div className="policy-section-header">
                <Globe className="w-6 h-6 text-cyan-500" />
                <h2>Contact Information</h2>
              </div>
              <div className="policy-content">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="contact-info">
                  <p>
                    <strong>NoWhile.com</strong>
                  </p>
                  <p>Email: legal@nowhile.com</p>
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
