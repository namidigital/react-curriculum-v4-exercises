import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section>
      <h2>404: Not Found</h2>
      <p>
        No route matches <code>{pathname}</code>.
      </p>
      <div style={{ marginTop: 12 }}>
        <Link to="/lessons/lesson-10">Go Home</Link>
      </div>
    </section>
  );
}
