import React, { useState, useEffect, useContext, useRef } from 'react';
import {LogOut} from '../../components/logFunction.js'
import {
    MainCont,
    Button,
    Title, 
    TodoBody,
    TodoPanel,
    MainColumn, 
    SideColumn, 
    LogOutButton, 
    TopSection, 
} from '../../components/globalStyles.js'; 
import { AppContext } from '../../components/contextItem.js'; 
import RenderList from './renderList.js'; 
import RenderAddPanel from './addTaskPanel.js'; 

//component for the Todo app 
const App = () => {
    const {
        setToken,
        todoList, 
    } = useContext(AppContext)

    const [displayAddPanel, setDisplayAddPanel] = useState(false)

    const closePanel = () => {
        setDisplayAddPanel(false)
    }

    const AddPanelRef = useRef(); 


    return (
        <>
            {displayAddPanel &&
                <RenderAddPanel
                closePanel={closePanel}
                panelRef={AddPanelRef}
                displayAddPanel={displayAddPanel}
            />
            }
            <TodoBody>
                <SideColumn />
                <MainColumn>
                    <Title>My To-Do List</Title>
                    <TodoPanel>
                        <TopSection>
                            <Button
                                BackgroundColor="#3847d9"
                                Color="#fff"
                                onClick={() => { setDisplayAddPanel(true)}}
                            >New</Button>
                        </TopSection>
                        <RenderList list={todoList} />
                    </TodoPanel>
                </MainColumn>
                <SideColumn>
                    <LogOutButton
                    BackgroundColor="#ffffff"
                    Color="#000"
                    onClick={() => {LogOut(setToken)}}
                    >Logout</LogOutButton>
                </SideColumn>
            </TodoBody>
        </>

    )
}

export default App; 