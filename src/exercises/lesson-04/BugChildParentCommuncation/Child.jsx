export default function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Increment Counter</button>;
}

// Explanation:
// State for the counter lives in Parent, but the button that should
// trigger a change lives in Child — a component further down the tree.
// Since props only flow one direction (parent to child), Child can't
// reach up and change Parent's state directly. Instead, Parent passes
// its own increment function down to Child as a prop (onIncrement).
// When the button is clicked, Child simply calls the function it was
// given, which runs increment back in Parent's scope and updates
// Parent's state — Child never needs to know how the counter actually
// works, just that calling onIncrement does the job.
