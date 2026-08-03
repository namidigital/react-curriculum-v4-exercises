// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useRef } from 'react';

export default function FindCorrectHook() {
  const clickCountRef = useRef(0);
  const buttonRef = useRef(null);

  function handleClick() {
    clickCountRef.current += 1;
    buttonRef.current.textContent = `${clickCountRef.current} Clicks`;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button ref={buttonRef} onClick={handleClick}>
        0 Clicks
      </button>
    </div>
  );
}

// Explanation:
// useState triggers a re-render every time it updates, which would be
// wasteful here since the task explicitly asks for an update without
// a re-render. useRef persists a value across renders without causing
// React to re-render the component, making it the right tool for this
// case. Since useRef doesn't automatically update the UI on its own,
// we manually update the button's visible text via a second ref
// pointing directly at the DOM element.
