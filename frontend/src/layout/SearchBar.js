import React, { useState } from 'react';
import axios from 'axios';
import {Search} from '@mui/icons-material'
import {Button} from '@mui/material'
import './SearchBar.css'
import { mediaBaseUrl } from '../constants/url.constant';
import SearchRes from './SearchRes';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(mediaBaseUrl +`Search/?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a book or movie..."
        />
        <Button className='Button' onClick={handleSubmit}><Search /></Button>
      </form>
      <SearchRes results={results} />
    </div>
  );
};

export default SearchBar;
