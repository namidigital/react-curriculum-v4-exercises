import { useState, useEffect } from 'react';
import { getPosts } from './api.js';
import './Lesson07Styles.css';

export default function FetchOnRender() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      <div className="content">
        {isLoading && <p>Loading posts...</p>}
        {errorMessage && <p role="alert">{errorMessage}</p>}
        {!isLoading &&
          !errorMessage &&
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
