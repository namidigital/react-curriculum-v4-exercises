// src/exercises/lesson-03/BugProps.jsx

/*
  BUG #3 — Props Not Updating

  This component displays a message based on a prop and includes
  a button that should change that message.

  Right now, the message is being stored in a way that React does not track,
  so the UI does not update when the value changes.

  Use the commented "Explanation" section at the bottom of this lesson's components.
*/

import { useState } from 'react';

export default function BugProps({ name = 'friend' }) {
  const [message, setMessage] = useState(`Hello, ${name}`);

  function handleChange() {
    setMessage(`Hi, ${name}!`);
  }

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleChange}>Change Greeting</button>
    </div>
  );
}

// Explanation:
// The message value was a plain variable, not React state, so reassigning
// it inside handleChange changed the value in memory but gave React no
// signal that anything happened — meaning no re-render occurred and the
// UI stayed the same. Moving message into useState and updating it through
// setMessage lets React track the change and re-render the component when
// it happens.
