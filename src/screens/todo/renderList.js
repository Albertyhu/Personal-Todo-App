import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    ListElement, 
} from '../../components/globalStyles.js'; 
import { AppContext } from '../../components/contextItem.js'; 
import RenderListItem from './listItem.js'; 
import uuid from 'react-uuid'

//Renders the list of tasks onto the To-do panel
const RenderList = props => {
    const { list } = props; 

    return (
        <ListElement id = "ListElement">
            {list !== null ? list.map((item, ind) =>
                <RenderListItem
                    task={item}
                    index={ind}
                    key={uuid()}
                />)
                : 
                null
                }
        </ListElement>
        )
}

export default RenderList; 

