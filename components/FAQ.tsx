'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is your shipping timeframe?',
    answer:
      'We dispatch orders within 2-3 business days. Standard delivery takes 5-7 business days within India. Express shipping is available for faster delivery.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Currently, we ship within India. We are working on expanding our international shipping options. Contact us for special requests.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer easy 30-day returns for unused products in original packaging. Contact our team via WhatsApp to initiate a return.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Simply browse our products and click "Ask on WhatsApp" to inquire or place an order directly. You can also call us for assistance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods including bank transfers, UPI, and cash on delivery. Payment details are provided after WhatsApp inquiry.',
  },
  {
    question: 'Are your products original?',
    answer:
      'Yes, all products are 100% authentic and sourced directly from authorized distributors. We guarantee product authenticity.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors duration-200"
              >
                <h3 className="text-left font-semibold text-foreground text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-secondary/30 border-t border-border animate-in fade-in-50 slide-in-from-top-2">
                  <p className="text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
