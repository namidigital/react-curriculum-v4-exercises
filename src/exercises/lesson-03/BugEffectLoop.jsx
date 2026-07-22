//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// The useEffect had no dependency array, so it ran after every render
// instead of only once on mount. Since the effect itself called setCount,
// each run triggered another render, which triggered the effect again —
// creating an infinite loop. Adding [] tells React to run the effect only
// once, right after the component mounts.
