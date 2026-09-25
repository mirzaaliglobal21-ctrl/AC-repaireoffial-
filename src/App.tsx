/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AdminSettingsProvider } from './context/AdminSettingsContext';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { LocationMapSection } from './components/LocationMapSection';
import { EmergencySection } from './components/EmergencySection';
import { WhyUsSection } from './components/WhyUsSection';
import { PricingCalculator } from './components/PricingCalculator';
import { PricingPackages } from './components/PricingPackages';
import { CityCoverage } from './components/CityCoverage';
import { BookingSection } from './components/BookingSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AdminSettingsProvider>
      <div className="min-h-screen bg-[#fcfbfa] text-slate-800 font-['Tajawal',sans-serif] selection:bg-amber-400 selection:text-slate-950">
        
        {/* Top Header & Navigation Bar */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Area */}
        <main>
          {/* 1. Cinematic Hero Section with Makkah Al Aziziyah Map & Technician */}
          <Hero onOpenBooking={handleOpenBooking} />

          {/* 2. Makkah Al Aziziyah Location Map Box (Positioned immediately after Hero Section) */}
          <LocationMapSection onOpenBooking={handleOpenBooking} />

          {/* 3. All Services Showcase with Dynamic Admin-Controlled Prices */}
          <ServicesSection onOpenBooking={handleOpenBooking} />

          {/* 4. Emergency 24/7 Service Showcase */}
          <EmergencySection onOpenBooking={handleOpenBooking} />

          {/* 5. Why Choose Us with Saudi Technicians Team */}
          <WhyUsSection onOpenBooking={() => handleOpenBooking('طلب استشارة فنية')} />

          {/* 6. Interactive Cost & Quote Calculator with Dynamic Rates */}
          <PricingCalculator onOpenBooking={handleOpenBooking} />

          {/* 7. Pricing Packages Section with Dynamic Rates & Deals */}
          <PricingPackages onOpenBooking={handleOpenBooking} />

          {/* 8. Comprehensive City & District Coverage */}
          <CityCoverage onOpenBooking={handleOpenBooking} />

          {/* 9. Verified Testimonials from Saudi Customers */}
          <Testimonials />

          {/* 10. Interactive Booking Form connected to Admin Booking System */}
          <BookingSection 
            preselectedService={preselectedService} 
            onClearPreselected={() => setPreselectedService(undefined)}
          />

          {/* 11. Frequently Asked Questions Accordion */}
          <FAQSection />
        </main>

        {/* Footer with quick Admin link */}
        <Footer onOpenBooking={() => handleOpenBooking()} />

        {/* Floating Call & WhatsApp Triggers */}
        <FloatingActions onOpenBooking={() => handleOpenBooking()} />

        {/* Admin Login Modal */}
        <AdminLoginModal />

        {/* Admin Comprehensive Management Dashboard Modal */}
        <AdminDashboardModal />
      </div>
    </AdminSettingsProvider>
  );
}
