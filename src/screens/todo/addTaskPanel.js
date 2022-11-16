import React, { useState, useEffect, useContext } from 'react';
import { LogOut } from '../../components/logFunction.js'
import {
    Button,
    Title,
    AddPanel, 
    AddPanelInputWrapper, 
    AddPanelInput,
    AddPanelButtonWrapper 

} from '../../components/globalStyles.js';
import { AppContext } from '../../components/contextItem.js'; 

const RenderAddPanel = props => {
    const { closePanel, panelRef, displayAddPanel } = props; 
    const { addTask } = useContext(AppContext); 
    const [newTask, setNewTask] = useState('');
    const handleInput = event => {
        setNewTask(event.target.value)
    }


    const checkIfClickedOutside = event => {
        if (panelRef.current && displayAddPanel && !panelRef.current.contains(event.target)) {
            closePanel();
        }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    useEffect(() => {
        return () => { document.removeEventListener('mousedown', checkIfClickedOutside) }
    }, [])

    return (
        <AddPanel
            ref={panelRef}
        >
            <Title>Create a new task</Title>
            <AddPanelInputWrapper>
                <AddPanelInput
                    value={newTask}
                    placeholder="Name of your new task"
                    onChange={handleInput}
                /> 
            </AddPanelInputWrapper>
            <AddPanelButtonWrapper>
                <Button
                    BackgroundColor="#3847d9"
                    Color="#fff"
                    onClick={() => {
                        addTask(newTask)
                        closePanel(); 
                    }}
                >Add</Button>
                <Button
                    BackgroundColor="#ffffff"
                    Color="#000"
                    onClick={closePanel}
                >Cancel</Button>
            </AddPanelButtonWrapper>

        </AddPanel> 
        )
}


export default RenderAddPanel; 

