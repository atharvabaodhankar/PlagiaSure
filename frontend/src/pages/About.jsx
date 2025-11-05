import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lightbulb, Users, GraduationCap, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { number: '10,000+', label: 'Documents Scanned Daily' },
    { number: '650+', label: 'Partner Institutions' },
    { number: '99.7%', label: 'Detection Accuracy' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and ethical conduct.',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously push the boundaries of technology to stay ahead.',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We partner with educators to build solutions that meet their needs.',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'We are committed to fostering an environment of learning and originality.',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    }
  ];



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
            <Link to="/pricing" className="text-sm font-medium hover:text-green-500 transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium text-green-500">
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
              <Link to="/#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Pricing
              </Link>
              <Link to="/about" className="block px-3 py-2 text-green-500 bg-green-50 rounded-md font-semibold">
                About
              </Link>
              <Link to="/#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md font-medium">
                Contact
              </Link>
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
        <section className="bg-gradient-to-r from-blue-600 to-green-500 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container mx-auto px-6 text-center text-white">
            <p className="text-sm font-semibold mb-2">About PlagiaSure</p>
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              Empowering Academic Integrity with Advanced AI Technology
            </h1>
            <p className="max-w-3xl mx-auto opacity-80">
              Discover the story behind our mission to uphold honesty and originality in education.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our mission is to empower educational institutions with the most advanced and reliable tools to uphold academic integrity. We strive to foster a culture of originality and ethical writing by providing cutting-edge AI and plagiarism detection technology that is accessible, accurate, and easy to use.
                </p>
                <div className="flex items-center gap-2 text-green-500 font-medium">
                  <CheckCircle className="h-5 w-5" />
                  <span>Promoting honest academic practices</span>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800 mb-3">
                  Why We Started PlagiaSure
                </h3>
                <p className="text-gray-600">
                  PlagiaSure was born from a collective of educators and technologists who saw a critical need for a more robust solution to academic dishonesty. With the rise of AI-generated content, traditional plagiarism checkers were no longer sufficient. We created PlagiaSure to provide a comprehensive, future-proof platform that addresses the evolving challenges of academic integrity in the digital age.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-gray-600">
                We are proud of the trust educators worldwide place in our technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="font-bold text-5xl bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide our work and our commitment to academic excellence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-block p-4 mb-4 rounded-full ${value.bgColor} ${value.textColor}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Technology Section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-blue-900/90 rounded-2xl p-8 lg:p-12">
              <div className="text-white">
                <h2 className="font-bold text-3xl lg:text-4xl mb-4">
                  Our Technology Stack
                </h2>
                <p className="opacity-80 mb-6">
                  We use a robust combination of cutting-edge technologies to deliver unparalleled accuracy and performance.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Advanced Machine Learning Models</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Proprietary Natural Language Processing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Scalable Cloud Infrastructure</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Integration with Multiple Data APIs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800 mb-3">
                  Cutting-Edge Technology
                </h3>
                <p className="text-gray-600">
                  Our platform is built on a foundation of sophisticated AI and deep learning algorithms. By leveraging multiple free APIs from leading academic and web search databases, we ensure comprehensive coverage without passing on high costs to our users. This multi-layered approach allows us to detect not only direct plagiarism but also subtle forms of academic dishonesty, such as paraphrasing and AI-generated content, with industry-leading precision.
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
                Ready to Transform Your Institution?
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
                Join thousands of educators using PlagiaSure to maintain the highest standards of academic integrity.
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
                  Learn More
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

export default About;