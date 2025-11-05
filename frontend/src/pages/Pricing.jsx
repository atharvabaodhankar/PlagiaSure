import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Star, Zap, Shield, Users, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const plans = {
    free: {
      name: 'Free Plan',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for trying out our service',
      features: [
        '2 scans only',
        'Basic plagiarism checking',
        'Limited AI detection',
        'Watermarked reports',
        'Basic support only'
      ],
      limitations: ['No integrations', 'No advanced features'],
      popular: false,
      cta: 'Get Started Free',
      buttonStyle: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    },
    basic: {
      name: 'Basic Plan',
      monthlyPrice: 399,
      yearlyPrice: 3990,
      description: 'Great for individual educators',
      features: [
        '50 reports per month',
        'Basic AI detection',
        'Advanced checking',
        'Email support',
        'Report history access',
        'PDF export'
      ],
      limitations: ['No batch processing'],
      popular: false,
      cta: 'Start Basic Plan',
      buttonStyle: 'bg-blue-700 text-white hover:bg-blue-800'
    },
    pro: {
      name: 'Pro Plan',
      monthlyPrice: 599,
      yearlyPrice: 5990,
      description: 'Perfect for institutions and heavy users',
      features: [
        '200 reports per month',
        'Advanced AI detection',
        'Detailed plagiarism reports',
        'Priority support',
        'Batch processing',
        'Full export options (PDF, Word)',
        'Advanced analytics',
        'Custom branding'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Pro Plan',
      buttonStyle: 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90'
    }
  };

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-600 antialiased">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-colors">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <img
              src="/plagiasure.png"
              alt="PlagiaSure logo"
              className="h-8 w-8"
            />
            <span>PlagiaSure</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/#features" className="text-sm font-medium hover:text-green-500 transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-green-500">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-green-500 transition-colors">
              About
            </Link>
            <Link to="/#contact" className="text-sm font-medium hover:text-green-500 transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-green-500 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-green-500 bg-green-50 rounded-md font-semibold">
                Pricing
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                About
              </Link>
              <Link to="/#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Contact
              </Link>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Login
              </Link>
              <div className="px-3 py-2">
                <Link to="/signup" className="block bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-semibold text-center hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 opacity-10 blur-3xl"></div>
          <div className="container mx-auto px-6 z-10 relative text-center">
            <h1 className="font-bold text-5xl md:text-6xl text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-800' : 'text-gray-500'}`}>
                Monthly
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={billingCycle === 'yearly'}
                  onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                <span className="absolute top-0.5 left-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all duration-300 peer-checked:translate-x-full"></span>
              </label>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-800' : 'text-gray-500'}`}>
                Yearly
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {Object.entries(plans).map(([key, plan]) => (
                <div
                  key={key}
                  className={`bg-white p-8 rounded-2xl border text-left h-full flex flex-col ${
                    plan.popular 
                      ? 'border-2 border-green-500 relative' 
                      : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span className="font-bold text-5xl text-gray-800">
                      ₹{getPrice(plan).toLocaleString('en-IN')}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-500">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-400">
                        <X className="h-5 w-5" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/signup"
                    className={`w-full text-center font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                Why Choose PlagiaSure?
              </h2>
              <p className="text-lg text-gray-600">
                Advanced AI technology meets comprehensive plagiarism detection for unmatched accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="inline-block p-4 mb-4 rounded-full bg-blue-100 text-blue-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get results in seconds with our optimized AI algorithms and cloud infrastructure.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="inline-block p-4 mb-4 rounded-full bg-green-100 text-green-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">99%+ Accuracy</h3>
                <p className="text-gray-600">
                  Industry-leading accuracy with multiple AI models and comprehensive databases.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="inline-block p-4 mb-4 rounded-full bg-sky-100 text-sky-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted by Educators</h3>
                <p className="text-gray-600">
                  Join thousands of educators and institutions who trust PlagiaSure for academic integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  Can I upgrade or downgrade my plan anytime?
                </h3>
                <p className="text-gray-600 mt-2">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  What file formats do you support?
                </h3>
                <p className="text-gray-600 mt-2">
                  We support PDF, DOCX, DOC, and TXT files. Our system can extract and analyze text from all these formats.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  Is my data secure?
                </h3>
                <p className="text-gray-600 mt-2">
                  Absolutely. We use enterprise-grade security, encrypt all data, and never store your documents permanently. Your privacy is our priority.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  Do you offer institutional discounts?
                </h3>
                <p className="text-gray-600 mt-2">
                  Yes, we offer special pricing for educational institutions and bulk licenses. Contact our sales team for custom pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-12 lg:p-20 text-center text-white">
              <h2 className="font-bold text-4xl lg:text-5xl mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                Join thousands of educators protecting academic integrity with PlagiaSure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/signup"
                  className="bg-white text-green-500 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/#contact"
                  className="bg-white/20 text-white font-medium px-8 py-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <img
                  src="/plagiasure.png"
                  alt="PlagiaSure logo"
                  className="h-8 w-8"
                />
                <span>PlagiaSure</span>
              </Link>
              <p className="text-sm text-gray-500">
                Advanced AI and Plagiarism detection for academic institutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/#features" className="text-sm hover:text-green-500 transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-sm hover:text-green-500 transition-colors">Pricing</Link></li>
                <li><a href="#" className="text-sm hover:text-green-500 transition-colors">Integrations</a></li>
                <li><a href="#" className="text-sm hover:text-green-500 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm hover:text-green-500 transition-colors">About Us</Link></li>
                <li><a href="#" className="text-sm hover:text-green-500 transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm hover:text-green-500 transition-colors">Blog</a></li>
                <li><Link to="/#contact" className="text-sm hover:text-green-500 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm hover:text-green-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm hover:text-green-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund" className="text-sm hover:text-green-500 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© 2025 PlagiaSure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;