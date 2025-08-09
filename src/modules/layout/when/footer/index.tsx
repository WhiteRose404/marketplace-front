"use client"


import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowRight,
  Shield,
  Truck,
  RefreshCw,
  Star,
  Globe,
  Heart
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const footerSections = {
    shop: {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/store' },
        { name: 'Fashion', href: '/collections/fashion' },
        { name: 'Home & Decor', href: '/collections/home' },
        { name: 'Jewelry', href: '/collections/jewelry' },
        { name: 'Beauty', href: '/collections/beauty' },
        { name: 'New Arrivals', href: '/collections/new' }
      ]
    },
    creators: {
      title: 'For Creators',
      links: [
        { name: 'Start Selling', href: '/sell' },
        { name: 'Creator Guidelines', href: '/creator-guidelines' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Seller Resources', href: '/seller-resources' },
        { name: 'Creator Community', href: '/community' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Track Order', href: '/track' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About When', href: '/about' },
        { name: 'Our Mission', href: '/mission' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' }
      ]
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/when.ma', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/when.ma', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/when_ma', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/when.ma', label: 'YouTube' }
  ];

  const trustFeatures = [
    { icon: Shield, text: 'Secure payments' },
    { icon: Truck, text: 'Free shipping' },
    { icon: RefreshCw, text: '30-day returns' },
    { icon: Star, text: 'Authenticity guaranteed' }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'PayPal', logo: '💰' },
    { name: 'Apple Pay', logo: '📱' }
  ];

  return (
    <footer className="bg-gradient-to-b from-stone-50 to-stone-100 border-t border-stone-200">
      
      {/* Newsletter Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-light text-stone-900 mb-4">
            Stay in the loop
          </h3>
          <p className="text-stone-600 mb-8">
            Get early access to new collections and exclusive creator stories
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all text-stone-900 placeholder-stone-500"
              />
            </div>
            <button
              onClick={handleSubscribe}
              disabled={!email || isSubscribed}
              className="px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all font-medium disabled:bg-green-500 flex items-center justify-center gap-2"
            >
              {isSubscribed ? (
                <>
                  <span>✓ Subscribed!</span>
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-2xl font-light text-stone-900 mb-4">when</h4>
              <p className="text-stone-600 leading-relaxed">
                The premier marketplace for authentic MENA creators. 
                Discover unique pieces that tell stories and support local artisans.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-stone-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Rabat, Morocco</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@when.ma</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+212 6XX XXX XXX</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-white border border-stone-200 rounded-xl flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-amber-400 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h4 className="font-medium text-stone-900">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Features Bar */}
      <div className="border-t border-stone-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustFeatures.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-stone-600">
                <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-stone-500">
              <span>© 2025 When.ma. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="/privacy" className="hover:text-stone-700 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-stone-700 transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-stone-700 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500">We accept:</span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-8 h-6 bg-stone-100 rounded flex items-center justify-center text-xs"
                    title={method.name}
                  >
                    {method.logo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating "Made with ❤️ in Morocco" Badge */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in Morocco</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;