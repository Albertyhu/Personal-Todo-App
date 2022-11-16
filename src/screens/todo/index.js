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
import RenderSearchBar from './search.js'; 
import { SearchQuery } from './searchFunction.js'; 

//component for the Todo app 
const App = () => {
    const {
        setToken,
        todoList, 
    } = useContext(AppContext)

    const [displayAddPanel, setDisplayAddPanel] = useState(false)

    //results displays the list on the search results 
    //it changes based on the queried results from the search bar
    const [results, setResults] = useState(todoList)

    //This handles  the search query on the search bar
    const [query, setQuery] = useState('')

    const closePanel = () => {
        setDisplayAddPanel(false)
    }

    const AddPanelRef = useRef(); 

    useEffect(() => {
       // if (query.length > 0) {
            setResults(SearchQuery(query, todoList));
        //}
    }, [query])

    useEffect(() => {
        setResults(todoList)
    }, [todoList])


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
                            <RenderSearchBar dispatch={setQuery} query={query}/>
                            <Button
                                BackgroundColor="#3847d9"
                                Color="#fff"
                                onClick={() => { setDisplayAddPanel(true)}}
                            >New</Button>
                        </TopSection>
                        <RenderList list={results} />
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