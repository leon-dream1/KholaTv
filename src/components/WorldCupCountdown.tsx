'use client';

import { useState, useEffect } from 'react';

interface Props {
  targetDate: string; // ISO string of the next match
}

export default function WorldCupCountdown({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!targetDate) return;
    const targetTime = new Date(targetDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (unit: number) => String(unit).padStart(2, '0');

  if (!mounted) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="font-bold text-white">Next match starts in</span>
        <span className="text-gray-400">Bangladesh Standard Time</span>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINS', value: timeLeft.minutes },
          { label: 'SECS', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#0b132c] border border-[#162145] rounded-xl flex flex-col items-center justify-center p-4">
            <span className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatUnit(item.value)}
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 font-bold tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
