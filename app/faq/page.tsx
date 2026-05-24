import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Orders & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, tap "Order on WhatsApp" on any product page, and we\'ll confirm your order directly over chat. Simple, fast, and personal.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI (GPay, PhonePe, Paytm), bank transfer, and cash on delivery for select pin codes. All payments are confirmed before dispatch.',
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'Yes — contact us on WhatsApp within 12 hours of placing your order. Once dispatched, cancellations are not possible but returns are available.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 4–7 business days across India. Metro cities usually receive orders within 3–4 days.',
      },
      {
        q: 'Do you ship pan-India?',
        a: 'Yes, we ship to all major cities and most pin codes across India. WhatsApp us if you\'re unsure about your location.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order is dispatched, we\'ll send you a tracking link directly on WhatsApp.',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are your products authentic?',
        a: 'Absolutely. We source directly from trusted manufacturers and verified distributors. Every product is quality-checked before shipping.',
      },
      {
        q: 'Do you offer assembly or setup guidance?',
        a: 'Yes! We\'re happy to guide you through setup over WhatsApp. Just drop us a message after your purchase.',
      },
      {
        q: 'What if a product is out of stock?',
        a: 'Message us on WhatsApp and we\'ll let you know the restock timeline or suggest a similar alternative.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of delivery for unused products in original packaging. Contact us on WhatsApp to initiate a return.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 5–7 business days after we receive and inspect the returned item.',
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-secondary/50 border-b border-border py-8 px-4">
          <div className="container mx-auto">
            <div className="flex gap-2 text-sm mb-4">
              <a href="/" className="text-primary hover:underline font-medium">Home</a>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-semibold">FAQs</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Everything you need to know about Skatewala.</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-12">
              {faqs.map((section) => (
                <div key={section.category}>
                  <h2 className="text-xl font-bold text-primary mb-4 uppercase tracking-wider">
                    {section.category}
                  </h2>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <details
                        key={item.q}
                        className="group bg-card border border-border rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-foreground hover:text-primary transition-colors">
                          {item.q}
                          <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                        </summary>
                        <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border pt-4">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center bg-card border border-border rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">Our team is happy to help over WhatsApp.</p>
              
                <a href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Chat with Us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}