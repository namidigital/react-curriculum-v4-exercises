// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.
import { useRef } from 'react';

export default function FillRefFocus() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input ref={inputRef} type="text" placeholder="Type here..." />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Explanation:
// useRef gives us a persistent handle to the actual DOM input element,
// without causing any re-renders. Attaching inputRef to the input via
// the ref prop lets us call inputRef.current.focus() directly inside
// focusInput, imperatively moving keyboard focus to that field whenever
// the button is clicked.
