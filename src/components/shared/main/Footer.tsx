import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/buy-phone", label: "Buy Phone" },
  { href: "/accessories", label: "Accessories" },
  { href: "/sell-phone", label: "Sell Phone" },
  { href: "/pre-order", label: "Pre-Order" },
  { href: "/offers", label: "Offers" },
  { href: "/emi", label: "EMI" },
  { href: "/contact", label: "Contact Us" },
];

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Complain / Advice" },
  { href: "/contact", label: "Contact Us" },
  { href: "/contact", label: "FAQs" },
];

const policyLinks = [
  { href: "/warranty", label: "Warranty Policy" },
  { href: "/return", label: "Exchange Policy" },
  { href: "/return", label: "Delivery Policy" },
  { href: "/pre-order", label: "Pre-Order Policy" },
  { href: "/return", label: "Refund Policy" },
  { href: "/return", label: "Return Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + Contact */}
          <div className="space-y-5">
            <Link href="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Mobile GANJ" className="h-[72px] w-auto invert brightness-0" />
            </Link>
            <div className="space-y-3 text-sm">
              <a href="tel:+8801234567890" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                +880 1234-567890
              </a>
              <a href="mailto:info@mobileganj.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                info@mobileganj.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
                { href: "https://wa.me/8801234567890", icon: MessageCircle, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-primary/80 flex items-center justify-center transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About Us</h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Policy</h3>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} MobileGanj. All rights reserved.</p>
          <p>Built with ❤️ for Mobile GANJ</p>
        </div>
      </div>
    </footer>
  );
}
