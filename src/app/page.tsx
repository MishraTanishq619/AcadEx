'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center p-6">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-5xl font-bold">
          Welcome to AcadEx
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl">
          A centralized platform for students to share, organize, and access academic resources effortlessly.
        </p>
        <div className="mt-6 flex gap-4">
          <Button onClick={() => router.push('/auth/login')} variant="outline" className="bg-white text-blue-600 hover:bg-gray-200">
            Login
          </Button>
          <Button onClick={() => router.push('/auth/register')} variant="default">
            Register
          </Button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
        <Card className="max-w-3xl mx-auto shadow-lg mt-6">
          <CardContent className="p-6 text-lg text-gray-700">
            AcadEx is built to help students easily find and share quality study materials. We believe in the power of open learning and collaboration.
          </CardContent>
        </Card>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-200 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        <Card className="max-w-lg mx-auto shadow-lg mt-6">
          <CardContent className="p-6 text-lg text-gray-700">
            <p>Have questions? Reach out to us at:</p>
            <p className="text-lg font-semibold text-blue-600">support@acadex.com</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
