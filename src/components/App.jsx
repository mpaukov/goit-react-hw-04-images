import { useState } from 'react';
import ImageGallery from './ImageGallery';
import { Searchbar } from './Searchbar';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = newSearchQuery => {
    if (searchQuery !== newSearchQuery) {
      setSearchQuery(newSearchQuery);
    }
    return;
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery query={searchQuery} />
    </div>
  );
}
