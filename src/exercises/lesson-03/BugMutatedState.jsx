// src/exercises/lesson-03/BugMutatedState.jsx

/*
  BUG #2 — State Issue

  This component displays a count and updates it when the button is clicked.
  However, the way the count is being changed causes the component to behave
  incorrectly.
*/

import { useState } from 'react';
export default function BugMutatedState() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <p>Bug 2 Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
    </div>
  );
}

// Explanation:
// The count was mutated directly with count++ before calling setCount,
// which is not a safe way to update state — React doesn't detect changes
// to a variable unless they go through the setter function. The fix uses
// the functional update form, setCount(prevCount => prevCount + 1), which
// always reads the most current state value rather than a potentially
// stale one.
