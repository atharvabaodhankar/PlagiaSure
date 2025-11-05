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
      limitations: ['No export options', 'Limited features'],
      popular: false,
      cta: 'Get Started Free'
    },
    basic: {
      name: 'Basic Plan',
      monthlyPrice: 399,
      yearlyPrice: 3990,
      description: 'Great for individual educators',
      features: [
        '50 reports per month',
        'Basic AI detection',
        'Plagiarism checking',
        'Email support',
        'Report history access',
        'PDF export'
      ],
      limitations: ['No batch processing'],
      popular: false,
      cta: 'Start Basic Plan'
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
      cta: 'Start Pro Plan'
    }
  };

  const getPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const yearlyTotal = plan.monthlyPrice * 12;
      const savings = yearlyTotal - plan.yearlyPrice;
      return Math.round((savings / yearlyTotal) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#3282B8] to-[#52DE97] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🔍</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PlagiaSure</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/#features" className="text-gray-700 hover:text-[#3282B8] transition-colors font-medium">
                Features
              </Link>
              <Link to="/pricing" className="text-[#3282B8] font-semibold">
                Pricing
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#3282B8] transition-colors font-medium">
                About
              </Link>
              <Link to="/#contact" className="text-gray-700 hover:text-[#3282B8] transition-colors font-medium">
                Contact
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-[#3282B8] transition-colors font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-gradient-to-r from-[#3282B8] to-[#52DE97] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#3282B8] transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#3282B8] rounded-md font-medium">
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-[#3282B8] bg-blue-50 rounded-md font-semibold">
                Pricing
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#3282B8] rounded-md font-medium">
                About
              </Link>
              <Link to="/#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#3282B8] rounded-md font-medium">
                Contact
              </Link>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#3282B8] rounded-md font-medium">
                Login
              </Link>
              <div className="px-3 py-2">
                <Link to="/signup" className="block bg-gradient-to-r from-[#3282B8] to-[#52DE97] text-white px-4 py-2 rounded-full font-semibold text-center hover:opacity-90 transition-all">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D4B7C] via-[#3282B8] to-[#3AB795] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white text-opacity-80 hover:text-opacity-100 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-white text-opacity-70'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-white bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-black transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-white text-opacity-70'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-[#52DE97] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save up to 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular ? 'ring-4 ring-[#52DE97] ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#52DE97] to-[#3AB795] text-white text-center py-2 font-semibold">
                  <Star className="inline-block w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{getPrice(plan).toLocaleString('en-IN')}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>

                  {getSavings(plan) > 0 && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                      Save {getSavings(plan)}% with yearly billing
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-[#52DE97] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start opacity-60">
                      <span className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-400">×</span>
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/signup"
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#52DE97] to-[#3AB795] text-white hover:shadow-lg hover:scale-105'
                      : key === 'free'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-[#3282B8] text-white hover:bg-[#2D4B7C]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose PlagiaSure?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology meets comprehensive plagiarism detection for unmatched accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-[#3282B8] to-[#52DE97] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600">
              Get results in seconds with our optimized AI algorithms and cloud infrastructure.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-[#3282B8] to-[#52DE97] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">99%+ Accuracy</h3>
            <p className="text-gray-600">
              Industry-leading accuracy with multiple AI models and comprehensive databases.
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-gradient-to-r from-[#3282B8] to-[#52DE97] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trusted by Educators</h3>
            <p className="text-gray-600">
              Join thousands of educators and institutions who trust PlagiaSure for academic integrity.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What file formats do you support?
              </h3>
              <p className="text-gray-600">
                We support PDF, DOCX, DOC, and TXT files. Our system can extract and analyze text from all these formats.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade security, encrypt all data, and never store your documents permanently. Your privacy is our priority.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer institutional discounts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for educational institutions and bulk licenses. Contact our sales team for custom pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#2D4B7C] via-[#3282B8] to-[#3AB795] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Join thousands of educators protecting academic integrity with PlagiaSure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-[#52DE97] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#3AB795] transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/#contact"
              className="bg-white text-[#2D4B7C] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;