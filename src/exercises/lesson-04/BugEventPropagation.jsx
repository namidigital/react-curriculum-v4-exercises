// TOPIC: Event Bubbling & Stopping Propagation
// TASK: Ensure only the inner button's action triggers an alert when the button is pushed

export default function BugEventPropagation() {
  function handleOuterClick() {
    alert("RED BOX CLICKED ❌ Don't show me!");
  }

  function handleInnerClick(event) {
    event.stopPropagation();
    alert('Button Clicked ✅');
  }

  return (
    <>
      <h2>Stopping Event Propagation</h2>
      <div
        style={{ padding: 20, border: '2px solid red' }}
        onClick={handleOuterClick}
      >
        <button onClick={handleInnerClick}>Click inner button</button>
      </div>
    </>
  );
}

// Explanation:
// Click events bubble upward from the element that was actually clicked
// to all of its parent elements, unless something stops that bubbling.
// Clicking the inner button was triggering handleInnerClick, but the
// event then continued bubbling up to the outer div, which triggered
// handleOuterClick as well — causing both alerts to fire. Calling
// event.stopPropagation() inside handleInnerClick tells the browser to
// stop the event from bubbling any further, so only the inner button's
// handler runs.
