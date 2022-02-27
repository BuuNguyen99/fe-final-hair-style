import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { SearchOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import { formatPriceVND } from 'utils/common';

function getSuggestionValue() {
  return '';
}

function renderSuggestion(suggestion) {
  return (
    <Link to={`/products/${suggestion?.slug}`} className="item-search">
      <div className="image">
        <img src={suggestion?.images[0]?.url} alt="" />
      </div>
      <div className="content-search mx-3">
        <p className="title">{suggestion?.title}</p>
        <div className="price-rating">
          <p>
            <Rate
              defaultValue={suggestion?.averageRating}
              disabled
              className="rating"
            />
          </p>
          <p className="price">
            {formatPriceVND(suggestion?.price?.toString())} VND
          </p>
        </div>
      </div>
    </Link>
  );
}

function SearchSuggestions({ data }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([...data]);

  const onChange = (event, { newValue }) => {
    setSearch(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');

    return data.filter(language => regex.test(language.title));
  }

  const inputProps = {
    placeholder: 'Search products',
    value: search,
    onChange,
  };

  return (
    <div className="search-input">
      <Autosuggest
        suggestions={suggestions || []}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <span className="icon-search">
        <SearchOutlined />
      </span>
    </div>
  );
}

export default SearchSuggestions;
