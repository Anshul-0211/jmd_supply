import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OurClients from './components/OurClients';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <SmoothScroll>
      <div className="font-sans antialiased text-gray-900 overflow-x-hidden w-full">
        <Header />
        <main className="overflow-x-hidden w-full">
          <Hero />
          <section id="clients" className="overflow-x-hidden ">
            <OurClients />
          </section>
          <Services />
          
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
