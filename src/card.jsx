import { useState, useEffect } from 'react';
import novels from './novels.json'

function Card(index) {
  index = 0
  const url = `http://covers.openlibrary.org/b/${novels.key}/${novels.value[index]}-${novels.size}.jpg`;
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setApiData(imageObjectURL)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <img src={apiData} alt='book cover' />
    </>
  );
}

export default Card
