import { useState, useEffect } from 'react';
import novels from './novels.json';

function Card({ index }) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `http://covers.openlibrary.org/b/${novels.key}/${novels.value[index]}-${novels.size}.jpg`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setApiData(imageObjectURL);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to revoke the object URL when the component is unmounted
    return () => {
      if (apiData) {
        URL.revokeObjectURL(apiData);
      }
    };
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <img src={apiData} alt='book cover' />
  );
}

export default Card;
