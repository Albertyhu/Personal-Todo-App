import React from 'react';
import { ListElement } from '../../components/globalStyles.js';
import RenderListItem from './listItem.js';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
/* eslint-disable */

//Renders the list of tasks onto the To-do panel
const RenderList = (props) => {
  const { list } = props;

  return (
    <ListElement id="ListElement">
      {list !== null
        ? list.map((item, ind) => <RenderListItem task={item} index={ind} key={uuid()} />)
        : null}
    </ListElement>
  );
};

RenderList.propTypes = {
  list: PropTypes.array 
}

export default RenderList;
