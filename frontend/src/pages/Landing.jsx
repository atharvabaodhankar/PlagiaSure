import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Brain,
  Search,
  CheckCircle,
  Star,
  Users,
  BarChart3,
  FileText,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Play,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          subject: 'Contact from Landing Page',
          type: 'general'
        }),
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-600 antialiased">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-colors ${scrolled ? 'shadow-lg' : ''}`}>
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
            <a href="#features" className="text-sm font-medium hover:text-green-500 transition-colors">
              Features
            </a>
            <Link to="/pricing" className="text-sm font-medium hover:text-green-500 transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-green-500 transition-colors">
              About
            </Link>
            <a href="#contact" className="text-sm font-medium hover:text-green-500 transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-green-500 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
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
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Features
              </a>
              <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Pricing
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                About
              </Link>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Contact
              </a>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Login
              </Link>
              <div className="px-3 py-2">
                <Link to="/signup" className="block bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-center hover:opacity-90 transition-all">
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
          <div className="container mx-auto px-6 z-10 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-gray-800 mb-6">
                  Advanced AI & Plagiarism Detection
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Protect academic integrity with our cutting-edge AI technology. Detect plagiarism and AI-generated content with 99%+ accuracy using multiple free APIs and advanced machine learning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/signup" className="bg-green-500 text-white font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                    Start Free Trial
                  </Link>
                  <button className="bg-white border border-gray-200 text-gray-800 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/50 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 lg:p-8 w-full max-w-md shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex justify-between items-center">
                    Analysis Results
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      High Risk
                    </span>
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-medium text-gray-700">AI Detection</span>
                        <span className="text-2xl font-bold text-red-500">87.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "87.3%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-medium text-gray-700">Plagiarism Score</span>
                        <span className="text-2xl font-bold text-red-500">34.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "34.7%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                Powerful Features for Academic Integrity
              </h2>
              <p className="text-lg text-gray-600">
                Our comprehensive suite of tools helps educators maintain the highest standards of academic integrity with cutting-edge AI technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Brain}
                title="AI Content Detection"
                description="Advanced machine learning models detect ChatGPT, GPT-4, and other AI-generated content with 99%+ accuracy."
              />
              <FeatureCard
                icon={Search}
                title="Multi-Source Plagiarism"
                description="Check against academic databases, web sources, and internal submissions using multiple free APIs."
              />
              <FeatureCard
                icon={Shield}
                title="Real-time Analysis"
                description="Get instant results with detailed reports, source attribution, and actionable recommendations."
              />
              <FeatureCard
                icon={Globe}
                title="Free API Integration"
                description="Powered by DuckDuckGo, Semantic Scholar, CrossRef, and arXiv - no expensive API keys required."
              />
              <FeatureCard
                icon={BarChart3}
                title="Comprehensive Reports"
                description="Detailed analytics with source breakdown, risk assessment, and citation helpers."
              />
              <FeatureCard
                icon={Users}
                title="Multi-Institution"
                description="Designed for schools, universities, and educational institutions of all sizes."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                How PlagiaSure Works
              </h2>
              <p className="text-lg text-gray-600">
                Simple, fast, and accurate in just three steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-gray-200 hidden md:block" style={{ top: "44px" }}></div>
              
              <ProcessStep
                step="1"
                title="Upload Assignment"
                description="Simply upload PDF, DOCX, or TXT files through our intuitive interface."
              />
              <ProcessStep
                step="2"
                title="AI Analysis"
                description="Our advanced algorithms analyze content using multiple AI models and plagiarism databases."
              />
              <ProcessStep
                step="3"
                title="Get Results"
                description="Receive detailed reports with scores, source attribution, and actionable recommendations."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                Trusted by Educators
              </h2>
              <p className="text-lg text-gray-600">
                See what educators are saying about PlagiaSure
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="PlagiaSure has revolutionized how we handle academic integrity. The AI detection is incredibly accurate."
                author="Dr. Sarah Johnson"
                role="Professor, Stanford University"
                rating={5}
              />
              <TestimonialCard
                quote="The multi-source plagiarism detection caught issues our previous tools missed. Highly recommended!"
                author="Prof. Michael Chen"
                role="Department Head, MIT"
                rating={5}
              />
              <TestimonialCard
                quote="Easy to use, comprehensive reports, and excellent support. Perfect for our institution."
                author="Dr. Emily Rodriguez"
                role="Academic Director, Harvard"
                rating={5}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-12 lg:p-20 text-center text-white">
              <h2 className="font-bold text-4xl lg:text-5xl mb-4">
                Ready to Protect Academic Integrity?
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                Join thousands of educators using PlagiaSure to maintain the highest standards of academic integrity.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="bg-white text-green-500 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/login" className="bg-white/20 text-white font-medium px-8 py-3 rounded-lg hover:bg-white/30 transition-colors">
                  Login to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-4xl lg:text-5xl text-gray-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Have questions about PlagiaSure? We're here to help you protect academic integrity.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <ContactInfo
                  icon={Mail}
                  title="Email Us"
                  details={["support@plagiasure.in", "sales@plagiasure.in"]}
                />
                <ContactInfo
                  icon={Phone}
                  title="Call Us"
                  details={["+91 98765 43210", "Monday - Friday, 9 AM - 6 PM IST"]}
                />
                <ContactInfo
                  icon={MapPin}
                  title="Visit Us"
                  details={["Tech Park, Sector 18", "Gurugram, Haryana 122015, India"]}
                />
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Your Message"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
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
                <li><a href="#features" className="text-sm hover:text-green-500 transition-colors">Features</a></li>
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
                <li><a href="#contact" className="text-sm hover:text-green-500 transition-colors">Contact Us</a></li>
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 animate-fadeIn">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
    <div className="inline-block p-3 mb-4 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 text-white">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Process Step Component
const ProcessStep = ({ step, title, description }) => (
  <div className="relative">
    <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold z-10 relative border-4 border-white">
      {step}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role, rating }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col">
    <div className="flex items-center text-yellow-400 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 mb-6 flex-grow italic">"{quote}"</p>
    <div>
      <p className="font-semibold text-gray-800">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

// Contact Info Component
const ContactInfo = ({ icon: Icon, title, details }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-gradient-to-r from-blue-600 to-green-500 p-3 rounded-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {details.map((detail, index) => (
        <p key={index} className="text-gray-600">{detail}</p>
      ))}
    </div>
  </div>
);

export default Landing;