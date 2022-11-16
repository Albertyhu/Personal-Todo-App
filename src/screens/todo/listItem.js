import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    ListItem, 
    ListItemIconWrapper, 
    IconWrapper, 
    TaskText
} from '../../components/globalStyles.js';
import { AppContext } from '../../components/contextItem.js';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';

const RenderListItem = props => {
    const { task } = props;  
    const { } = useContext(AppContext);
    return (
        <ListItem>
            <TaskText>{task}</TaskText>
            <ListItemIconWrapper>
                <IconWrapper><BsFillPencilFill /></IconWrapper>
                <IconWrapper><FiTrash2 /></IconWrapper>
            </ListItemIconWrapper>
        </ListItem>
    )
}

export default RenderListItem;

