import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { SearchInput, SearchWrapper, IconWrapper } from '../../style/globalStyles.js';
import PropTypes from 'prop-types';
/* eslint-disable */

//Renders the search bar component
const RenderSearchBar = (props) => {
  const { dispatch, query } = props;

  const handleInput = (event) => {
    dispatch(event.target.value);
  };
  return (
    <SearchWrapper>
      <IconWrapper>
        <BiSearchAlt2 />
      </IconWrapper>
      <SearchInput type="text" value={query} onChange={handleInput} />
    </SearchWrapper>
  );
};

RenderSearchBar.propTypes = {
  dispatch: PropTypes.func, 
  query: PropTypes.string
}

export default RenderSearchBar;
