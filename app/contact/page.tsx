import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
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
              <span className="text-foreground font-semibold">Contact Us</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you. Reach out anytime!</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Have a question about your order, a product, or just want to talk skate? 
                    We're here for you. The fastest way to reach us is WhatsApp.
                  </p>
                </div>

                <div className="space-y-4">
                  
                    <a href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-muted-foreground text-sm">+91 99999 99999 — fastest response</p>
                    </div>
                  </a>

                  
                    <a href="mailto:hello@skatewala.in"
                    className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground text-sm">hello@skatewala.in</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground text-sm">India — we ship nationwide</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Response Time</p>
                      <p className="text-muted-foreground text-sm">Mon–Sat, 10am–7pm IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                      <option value="">Select a topic</option>
                      <option>Order enquiry</option>
                      <option>Product question</option>
                      <option>Returns &amp; refunds</option>
                      <option>Shipping</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                  >
                    Send Message
                  </button>

                  <p className="text-center text-sm text-muted-foreground">
                    Or reach us instantly on{' '}
                    <a href="https://wa.me/919999999999" className="text-primary font-semibold hover:underline">
                      WhatsApp
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}