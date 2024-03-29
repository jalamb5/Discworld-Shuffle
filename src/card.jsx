import { useState, useEffect } from "react";
import novels from "./novels.json";

function Card({ key, index, onClick }) {
  const [apiData, setApiData] = useState({ url: "" });
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://covers.openlibrary.org/b/${novels.key}/${novels.value[index]}-${novels.size}.jpg`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch image: ${response.status} ${response.statusText}`,
          );
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setApiData({ ...apiData, url: imageObjectURL });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to revoke the object URL when the component is unmounted
    return () => {
      if (apiData.url) {
        URL.revokeObjectURL(apiData.url);
      }
    };
  }, [apiData.url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <div className={"card"}>
      <img
        src={apiData.url}
        alt="book cover"
        width="180px"
        height="278px"
        id={novels.value[index]}
        key={key}
        onClick={handleClick}
      />
    </div>
  );
}

export default Card;
