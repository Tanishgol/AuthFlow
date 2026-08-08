import { useState, useEffect, useCallback } from 'react';

const useCountdown = (initialSeconds = 60) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(
    (duration = initialSeconds) => {
      setSeconds(duration);
      setIsActive(true);
    },
    [initialSeconds]
  );

  useEffect(() => {
    if (!isActive) return;

    if (seconds <= 0) {
      setIsActive(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  return { seconds, isActive, start };
};

export default useCountdown;
