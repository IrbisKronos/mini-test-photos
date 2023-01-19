import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Collection from './Collection';

const categoryNames = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Гори" },
  { "name": "Архітектура" },
  { "name": "Міста" }
];

function App() {
  const [images, setImages] = useState([]);
  const [onChangeValue, setOnChangeValue] = useState(''); // пошуковий запит
  const [categoryId, setCategoryId] = useState(0); // 0 - обрати всі категорії
  const [isLoading, setIsLoading] = useState(true); // візуацізація "завантаження"


  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63c86bc5075b3f3a91e09a76.mockapi.io/Photos?${
        categoryId ? `category=${categoryId}` : ''
      }`)
      .then((res) => res.json())
      .then((json) => {
        setImages(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні даних');
      })
      .finally(() => setIsLoading(false))
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекція фотографій</h1>
      <div className="top">
        <ul className="tags">
          {categoryNames.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input onChange={(e) => setOnChangeValue(e.target.value)} className="search-input" placeholder="Пошук по назві" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Завантажується...</h2>
        ) : (
          images
            .filter((obj) => obj.name.toLowerCase().includes(onChangeValue.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            )))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;