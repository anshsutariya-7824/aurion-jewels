import ContactFormClient from './ContactFormClient';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: "Contact Us & Book an Appointment | Aurion Jewels",
  description: "Schedule a private consultation at our 5th Avenue studio or reach out to our concierge team. Submit custom design or diamond catalog inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
        <ScrollReveal animation="fadeIn">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-2 block">
            Get In Touch
          </span>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={100}>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-charcoal font-light">
            Contact Our Concierge
          </h1>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={200}>
          <p className="text-brand-slate text-sm leading-relaxed mt-4">
            We are here to assist with catalog details, custom commissions, diamond sourcing, or scheduling private viewings.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="slideUp" delay={300}>
          <div className="w-12 h-[1px] bg-brand-gold mt-6" />
        </ScrollReveal>
      </div>

      {/* Main Form & details layout */}
      <ContactFormClient />
    </div>
  );
}
