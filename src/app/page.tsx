"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CountdownUnit from './components/CountdownUnit';

const HomePage: React.FC = () => {
  const launchDate = new Date('2025-06-02T12:30:00Z').getTime();

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [prevSeconds, setPrevSeconds] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeRemaining(current => {
            setPrevSeconds(current.seconds);
            return { days, hours, minutes, seconds };
        });

      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setPrevSeconds(0);
      }
    };

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [launchDate]);

  const backgroundImageUrl = '/nebula.png'; 

  if (!isClient) {
    return null; 
  }

  const secondsKey = prevSeconds !== null && timeRemaining.seconds !== prevSeconds 
    ? `sec-${timeRemaining.seconds}-${Date.now()}` 
    : `sec-${timeRemaining.seconds}`;

  return (
    <>
      <Head>
        <title>NEBULA - Coming Soon</title>
        <meta name="description" content="Nebula is launching soon! Countdown to the future." />
        <link rel="icon" href="/favicon.ico" /> {/* Example favicon, replace or remove */}
      </Head>

      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center p-4 selection:bg-gray-300 selection:text-black overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-75"></div>

        <div className="absolute top-8 sm:top-12 left-0 right-0 z-20">
            <p className="text-2xl sm:text-3xl text-gray-300 font-orbitron tracking-wider">
                Introducing
            </p>
        </div>

        <main className="relative z-10 flex flex-col items-center w-full px-4 mt-12 sm:mt-16">
          
          <h1 className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-widest mb-10 sm:mb-12 nebula-text-effect title">
            NEBULA
          </h1>
          
          {timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? (
            <p className="font-orbitron text-4xl sm:text-5xl md:text-6xl text-gray-100 font-bold animate-bounce mb-6">LAUNCHED!</p>
          ) : (
            <div className="flex flex-col items-center">  
              <div className="flex justify-center items-start mb-4 sm:mb-6 group">
                <CountdownUnit value={timeRemaining.days} unit="Days" showSeparator={true} />
                <CountdownUnit value={timeRemaining.hours} unit="Hours" showSeparator={true} />
                <CountdownUnit value={timeRemaining.minutes} unit="Minutes" showSeparator={true} />
                <div className={timeRemaining.seconds !== prevSeconds ? 'digit-change' : ''} key={secondsKey}>
                  <CountdownUnit value={timeRemaining.seconds} unit="Seconds" showSeparator={false} />
                </div>
              </div>
              <p className="text-xl sm:text-2xl text-gray-300 font-orbitron tracking-wide mb-10 sm:mb-12">
                Coming Soon...
              </p>
            </div>
          )}
          
        </main>
        <footer className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-200 mt-1 font-orbitron tracking-wider">
              BЧ SΛST
            </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;