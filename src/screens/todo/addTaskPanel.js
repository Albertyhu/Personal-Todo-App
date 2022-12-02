import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Title,
  AddPanel,
  AddPanelInputWrapper,
  AddPanelInput,
  AddPanelButtonWrapper
} from '../../components/globalStyles.js';
import { ErrorField, ErrorMessage } from '../../components/errorMessage.js';
import { AppContext } from '../../contextItem.js';
import PropTypes from 'prop-types';
/* eslint-disable */

const RenderAddPanel = (props) => {
  const { closePanel, panelRef, displayAddPanel } = props;
  const { addTask } = useContext(AppContext);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  const handleInput = (event) => {
    var input = event.target.value;
    if (input.length <= 25) {
      setNewTask(input);
    }
  };

  //handles the submission of a new task item
  const handleSubmit = () => {
    var isValid = true;
    if (newTask.length < 1) {
      isValid = false;
      setError('The task name should be at least 1 character long');
    }
    if (isValid) {
      addTask(newTask);
      closePanel();
    }
  };

  //The following code allows the user to close the panel by clicking outside it.
  const checkIfClickedOutside = (event) => {
    if (panelRef.current && displayAddPanel && !panelRef.current.contains(event.target)) {
      closePanel();
    }
  };
  document.addEventListener('mousedown', checkIfClickedOutside);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    setError('');
    if (newTask.length === 25) {
      setError('Your task name cannot be more than 25 characters.');
    }
  }, [newTask]);

  return (
    <AddPanel ref={panelRef} id="AddPanel">
      <Title>Create a new task</Title>
      <AddPanelInputWrapper>
        <AddPanelInput value={newTask} placeholder="Name of your new task" onChange={handleInput} />
      </AddPanelInputWrapper>
      {error !== '' && (
        <ErrorField id="AddPanelErrorField">
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorField>
      )}
      <AddPanelButtonWrapper id="AddPanelButtonWrapper">
        <Button
          BackgroundColor="#3847d9"
          Color="#fff"
          Transform="translateX(5px) translateY(5px)"
        onClick={handleSubmit}>
        Save
        </Button>
        <Button
          BackgroundColor="#dbdbdb"
          Color="#000"
          Transform="translateX(5px) translateY(5px)"
          onClick={closePanel}
        >
          Cancel
        </Button>
      </AddPanelButtonWrapper>
    </AddPanel>
  );
};

RenderAddPanel.propTypes = {
    closePanel: PropTypes.func, 
    panelRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    displayAddPanel: PropTypes.bool
} 

export default RenderAddPanel;
