import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">InsureCare</h1>
          <nav className="flex gap-8">
            <a href="#home" className="hover:text-blue-200 transition">Home</a>
            <a href="#about" className="hover:text-blue-200 transition">About</a>
            <a href="#services" className="hover:text-blue-200 transition">Services</a>
            <a href="#contact" className="hover:text-blue-200 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-800 text-white py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">File Your Insurance Claim</h2>
          <p className="text-xl mb-12 text-blue-100">
            Quick, simple, and secure claim processing. Get your compensation<br />
            faster with our streamlined digital platform.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              User Login
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-700 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Admin Login
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose InsureCare?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Fast Processing Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">Fast Processing</h3>
              <p className="text-gray-600 text-center">
                Claims processed within 24-48 hours with our advanced digital system.
              </p>
            </div>

            {/* Secure & Safe Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">Secure & Safe</h3>
              <p className="text-gray-600 text-center">
                Bank-level encryption to protect your personal and financial information.
              </p>
            </div>

            {/* 24/7 Support Card */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">24/7 Support</h3>
              <p className="text-gray-600 text-center">
                Round-the-clock customer support to help you through every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-800 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to File Your Claim?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust InsureCare for their insurance needs.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-white text-blue-700 px-10 py-3 rounded-md font-semibold hover:bg-blue-50 transition shadow-lg text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2024 InsureCare. All rights reserved.</p>
          <div className="flex gap-6 justify-center text-sm">
            <a href="#privacy" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
