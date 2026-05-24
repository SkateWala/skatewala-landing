import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Truck, Clock, MapPin, Package, ShieldCheck, MessageCircle } from 'lucide-react'

const shippingZones = [
  { zone: 'Metro Cities', cities: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata', days: '2–4 days', price: 'Free above ₹999' },
  { zone: 'Tier 2 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Surat, and more', days: '4–6 days', price: 'Free above ₹999' },
  { zone: 'Rest of India', cities: 'All other pin codes we deliver to', days: '5–8 days', price: '₹99 flat' },
]

export default function ShippingPage() {
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
              <span className="text-foreground font-semibold">Shipping Info</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Shipping Info</h1>
            <p className="text-muted-foreground">Everything about how we get your gear to you.</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl space-y-16">

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Pan-India Shipping', desc: 'We deliver to all major cities and most pin codes across India.' },
                { icon: Clock, title: '2–8 Business Days', desc: 'Delivery time depends on your location. Metro cities are faster.' },
                { icon: ShieldCheck, title: 'Insured Packaging', desc: 'All orders are securely packed and insured during transit.' },
                { icon: Package, title: 'Order Tracking', desc: 'Get a tracking link on WhatsApp once your order ships.' },
                { icon: MapPin, title: 'Free Shipping', desc: 'Free delivery on all orders above ₹999. Flat ₹99 below that.' },
                { icon: MessageCircle, title: 'WhatsApp Updates', desc: 'We keep you informed at every step directly on WhatsApp.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-6 space-y-3">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Delivery Zones */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Delivery Zones</h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50 text-left">
                      <th className="px-6 py-4 font-semibold text-foreground">Zone</th>
                      <th className="px-6 py-4 font-semibold text-foreground hidden sm:table-cell">Covers</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Est. Delivery</th>
                      <th className="px-6 py-4 font-semibold text-foreground">Shipping</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {shippingZones.map((row) => (
                      <tr key={row.zone} className="bg-card hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{row.zone}</td>
                        <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{row.cities}</td>
                        <td className="px-6 py-4 text-foreground">{row.days}</td>
                        <td className="px-6 py-4">
                          <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                            {row.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Place your order', desc: 'Order via WhatsApp or our website. We confirm within a few hours.' },
                  { step: '02', title: 'We pack your gear', desc: 'Your order is carefully packed and quality-checked before dispatch.' },
                  { step: '03', title: 'Dispatched & tracked', desc: 'We ship your order and send you a live tracking link on WhatsApp.' },
                  { step: '04', title: 'Delivered to your door', desc: 'Your gear arrives safely. Any issues? We\'re one message away.' },
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

            {/* Note */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="font-bold text-foreground mb-2">Important Notes</h3>
              <ul className="text-muted-foreground text-sm space-y-2 leading-relaxed list-disc list-inside">
                <li>Delivery times are estimates and may vary during peak seasons or festivals.</li>
                <li>We currently do not offer express or same-day delivery.</li>
                <li>Shipping charges (if any) are shown at checkout before payment.</li>
                <li>For remote or difficult-to-reach locations, additional time may be required.</li>
              </ul>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}