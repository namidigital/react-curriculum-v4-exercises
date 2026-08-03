// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// Explanation:
// StrictMode intentionally mounts, unmounts, and re-mounts components in
// development to expose effects that don't clean up after themselves. The
// original effect started a setInterval but never cleared it, so each
// mount created a new, independent timer that kept running. With two
// timers both calling setCount every second, the counter climbed by 2
// instead of 1. Returning a cleanup function that calls clearInterval
// ensures the old timer is stopped before a new one starts, so only one
// interval is ever active at a time.
