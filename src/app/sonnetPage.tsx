'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LandingPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">StudyShare</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleNavigation('/login')}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation('/register')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Share, Learn,</span>
                <span className="block text-blue-600">Excel Together</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                A centralized platform for students to share, organize, and access quality study resources - notes, books, past papers, and project materials.
              </p>
              <div className="mt-10 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => handleNavigation('/register')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => handleNavigation('/resources')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Resources
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                  <h3 className="text-lg font-medium text-gray-900">Join the community</h3>
                  <div className="mt-6">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNavigation(`/register?email=${encodeURIComponent(email)}`)}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign up for free
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Key Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to excel in your academic journey.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Organized Resources</h3>
              <p className="mt-2 text-gray-600">
                Access categorized study materials by subjects, semesters, and types.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Quality Control</h3>
              <p className="mt-2 text-gray-600">
                Upvote and rate resources to help others find the best materials.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Recommendations</h3>
              <p className="mt-2 text-gray-600">
                Get personalized resource recommendations based on tags and your interests.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Community Discussions</h3>
              <p className="mt-2 text-gray-600">
                Join forums to ask questions and engage with fellow students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                About Us
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                StudyShare was created by students who understood the frustration of searching for quality academic resources. 
                We believe that knowledge should be accessible to all and that students can achieve more when they collaborate.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our mission is to create a community where students can easily share resources, help each other succeed, 
                and make education more accessible and efficient for everyone.
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">Our Values</h3>
                </div>
                <div className="mt-2 text-gray-600">
                  <p className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Collaboration over competition
                  </p>
                  <p className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Quality education for all
                  </p>
                  <p className="flex items-center mt-2">
                    <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Community-driven innovation
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h3 className="text-lg font-medium text-white">Join Our Community</h3>
                </div>
                <div className="px-6 py-6 bg-blue-50">
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">5000+</div>
                      <div className="mt-1 text-sm text-gray-600">Students</div>
                    </div>
                    <div className="text-center ml-8">
                      <div className="text-4xl font-bold text-blue-600">10000+</div>
                      <div className="mt-1 text-sm text-gray-600">Resources</div>
                    </div>
                    <div className="text-center ml-8">
                      <div className="text-4xl font-bold text-blue-600">50+</div>
                      <div className="mt-1 text-sm text-gray-600">Institutions</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => handleNavigation('/register')}
                      className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Join Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your academic success?</span>
            <span className="block text-blue-100">Join StudyShare today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => handleNavigation('/register')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <button
                onClick={() => handleNavigation('/login')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-gray-600">
                support@studyshare.com
              </p>
              <p className="mt-2 text-gray-600">
                feedback@studyshare.com
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Social Media</h3>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Contact Form</h3>
              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="sr-only">Email</label>
                  <input
                    id="contactEmail"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Your message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Home
              </a>
              <a href="#about" className="text-gray-300 hover:text-white">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-300">
            <p>&copy; 2022 StudyShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
