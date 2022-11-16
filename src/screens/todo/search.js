import React, { useState, useEffect, useContext } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import {
    MainCont,
    Button,
    SearchInput,
    SearchWrapper,
    IconWrapper
} from '../../components/globalStyles.js'; 

const RenderSearchBar = props => {
    const {
        dispatch,
        query
    } = props; 
    const handleInput = event => {
        dispatch(event.target.value)
    }
    return (
        <SearchWrapper>
            <IconWrapper><BiSearchAlt2 /></IconWrapper>
            <SearchInput
            type="text"
            value={query}
            onChange={handleInput}
            />
        </SearchWrapper>
        )
}

export default RenderSearchBar; 