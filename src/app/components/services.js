'use client'
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Services = () => {
  const [clickedService, setClickedService] = useState(null);

  return (
    <>
      <Head>
        <title>Our Services</title>
        <meta name="description" content="Discover our wide range of services tailored to your needs." />
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">Our Services</h1>
          <div className="columns is-multiline">
            {services.map((service, index) => (
              <div className="column is-one-third" key={index}>
                <motion.div 
                  className="card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setClickedService(service)}
                >
                  <div className="card-content">
                    <p className="title is-4">{service.title}</p>
                    <p className="subtitle is-6">{service.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {clickedService && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setClickedService(null)}></div>
          <div className="modal-card" style={{ padding: '20px' }}>
            <header className="modal-card-head">
              <p className="modal-card-title">{clickedService.title}</p>
              <button className="delete" onClick={() => setClickedService(null)}></button>
            </header>
            <section className="modal-card-body">
              <p>{clickedService.description}</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={() => setClickedService(null)}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

const services = [
  { title: "Web Development", description: "We build modern and responsive websites." },
  { title: "SEO Optimization", description: "Improve your site's search engine rankings." },
  { title: "Graphic Design", description: "High-quality design solutions for your brand." },
  { title: "Digital Marketing", description: "Expand your reach with targeted campaigns." },
  { title: "App Development", description: "Custom mobile applications tailored to your needs." },
  { title: "Consulting", description: "Expert advice to help your business grow." }
];

