import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    ListItem, 
    ListItemWrapper, 
    ListItemIconWrapper, 
    IconWrapper, 
    TaskText, 
    EditInput, 
} from '../../components/globalStyles.js';
import {
    ErrorField, 
    ErrorMessage, 
} from '../guest/guestStyle.js'; 
import { AppContext, ListItemContext } from '../../components/contextItem.js';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';

const RenderListItem = props => {
    const {
        task,
        index, 
    } = props;  

    //if displayMode is true, only display the task
    //if it's false, display the component that allows the user to edit the task 
    const [displayMode, setDisplayMode] = useState(true) 

    const context = {
        task,
        index, 
        setDisplayMode, 
    } 

    return (
        <ListItemContext.Provider value={context}>
            <ListItem id="ListItem">
                {displayMode ? 
                    <DisplayComponent /> 
                    : 
                    <EditComponent /> 
                    }
            </ListItem>
        </ListItemContext.Provider>
    )
}

export default RenderListItem;

const DisplayComponent = () => {
    const { task, setDisplayMode, index } = useContext(ListItemContext); 
    const { removeTask } = useContext(AppContext)
    return (
        <ListItemWrapper id="ListItemWrapper">
            <TaskText>{task}</TaskText>
            <ListItemIconWrapper id="ListItemIconWrapper">
                <IconWrapper
                    className="ListIconWrapper"
                    onClick={()=>setDisplayMode(false)}
                >
                    <BsFillPencilFill />
                </IconWrapper>
                <IconWrapper
                    className="ListIconWrapper"
                    onClick={() => { removeTask(index) }}
                >
                    <FiTrash2 />
                </IconWrapper>
            </ListItemIconWrapper>
        </ListItemWrapper>
        )
}

const EditComponent = () => {
    const {
        task,
        index, 
        setDisplayMode
    } = useContext(ListItemContext); 
    const {
        editTask,
    } = useContext(AppContext);
    const [userInput, setInput] = useState(task); 
    const [error, setError] = useState('') 

    //Handles the submission of changes to the task name
    const handleUserInput = event => {
        var user_input = event.target.value;
        if (user_input.length <= 25) {
            setInput(user_input)
        }

    }

    const handleSave = () => {
        setError(''); 
        var isValid = true; 
        var errMessage = ''
        if (userInput.length < 1) {
            isValid = false; 
            errMessage = "Your task name should be at least one character long.";
        }
        if (isValid) {
            editTask(userInput, index)
            setDisplayMode(true); 
        }
        else {
            setError(errMessage)
        }
    }

    useEffect(() => {
        setError('')
    }, [userInput])

    return (
        <>
            <ListItemWrapper id="ListItemWrapper">
                <EditInput
                    value={userInput}
                    onChange={handleUserInput}
                />
                <Button
                    BackgroundColor="#000"
                    Color="#ffffff"
                    onClick={handleSave}
                >Save</Button>
            </ListItemWrapper>
            {error !== '' && error !== null &&
                <ErrorField id="EditError">
                     <ErrorMessage>{error}</ErrorMessage>
                </ErrorField>
            }
        </>

            )
} 

