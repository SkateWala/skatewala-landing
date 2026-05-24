import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RefreshCw, ShieldCheck, XCircle, CheckCircle, MessageCircle } from 'lucide-react'

export default function ReturnsPage() {
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
              <span className="text-foreground font-semibold">Returns</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Returns & Refunds</h1>
            <p className="text-muted-foreground">Hassle-free returns within 7 days of delivery.</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl space-y-16">

            {/* Policy Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: RefreshCw, title: '7-Day Returns', desc: 'Return unused items within 7 days of delivery.' },
                { icon: ShieldCheck, title: 'Easy Process', desc: 'Just WhatsApp us — we handle the rest.' },
                { icon: RefreshCw, title: '5–7 Day Refunds', desc: 'Refunds processed after we receive the item.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            {/* Eligible vs Not Eligible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Eligible for Return
                </h2>
                <ul className="space-y-3">
                  {[
                    'Item received in damaged or defective condition',
                    'Wrong product delivered',
                    'Unused product in original packaging',
                    'Return initiated within 7 days of delivery',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Not Eligible for Return
                </h2>
                <ul className="space-y-3">
                  {[
                    'Used or assembled products',
                    'Items without original packaging',
                    'Return requested after 7 days',
                    'Damage caused by misuse or normal wear',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Return Process */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">How to Return</h2>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Contact us on WhatsApp', desc: 'Message us within 7 days of delivery with your order details and reason for return.' },
                  { step: '02', title: 'Share photos', desc: 'Send clear photos of the product and packaging so we can assess the return quickly.' },
                  { step: '03', title: 'We arrange pickup', desc: 'Once approved, we\'ll schedule a pickup from your address at no cost to you.' },
                  { step: '04', title: 'Refund processed', desc: 'After we receive and inspect the item, your refund is processed within 5–7 business days.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start bg-card border border-border rounded-xl p-6">
                    <span className="text-3xl font-bold text-primary/30 leading-none">{item.step}</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Methods */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Refund Methods</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Refunds are issued via the original payment method. If you paid via UPI or bank transfer,
                the refund goes back to the same account. COD orders are refunded via UPI or bank transfer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { method: 'UPI (GPay / PhonePe / Paytm)', time: '3–5 business days' },
                  { method: 'Bank Transfer / NEFT', time: '5–7 business days' },
                  { method: 'Cash on Delivery orders', time: 'Via UPI, 5–7 business days' },
                ].map((r) => (
                  <div key={r.method} className="flex justify-between gap-4 p-4 bg-secondary/50 rounded-xl">
                    <span className="text-foreground font-medium">{r.method}</span>
                    <span className="text-muted-foreground whitespace-nowrap">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-primary/5 border border-primary/20 rounded-2xl p-10">
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Need to start a return?</h3>
              <p className="text-muted-foreground mb-6">Just WhatsApp us — we'll take care of everything.</p>
              
                <a href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Start a Return on WhatsApp
              </a>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}