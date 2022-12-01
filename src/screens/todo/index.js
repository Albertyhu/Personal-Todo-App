import React, { useState, useEffect, useContext, useRef } from 'react';
import { LogOut } from '../../hooks/logFunction.js';
import {
  Button,
  Title,
  TodoBody,
  TodoPanel,
  MainColumn,
  SideColumn,
  LogOutButton,
  TopSection
} from '../../style/globalStyles.js';
import { AppContext } from '../../contextItem.js';
import RenderList from './renderList.js';
import RenderAddPanel from './addTaskPanel.js';
import RenderSearchBar from './search.js';
import { SearchQuery } from '../../hooks/searchFunction.js';

//component for the Todo app
const App = () => {
  const { setToken, todoList } = useContext(AppContext);

  const [displayAddPanel, setDisplayAddPanel] = useState(false);

  //results displays the list on the search results
  //it changes based on the queried results from the search bar
  const [results, setResults] = useState(todoList);

  //This handles  the search query on the search bar
  const [query, setQuery] = useState('');

  const closePanel = () => {
    setDisplayAddPanel(false);
  };

  //ref for the panel that allows the user to create a new task
  //This supplements the feature of allowing the user to click out of the panel
  const AddPanelRef = useRef();

  //Everytime the user types in a query on the search bar, display the search results
  useEffect(() => {
    setResults(SearchQuery(query, todoList));
  }, [query]);

  //As the todo list gets updated, update the search query results as well.
  useEffect(() => {
    setResults(todoList);
  }, [todoList]);

  return (
    <>
      <TodoBody>
        <SideColumn />
        <MainColumn>
          <Title>My To-Do List</Title>
          <TodoPanel id="TodoPanel">
            <TopSection>
              <RenderSearchBar dispatch={setQuery} query={query} />
              <Button
                BackgroundColor="#648046"
                Color="#fff"
                onClick={() => {
                  setDisplayAddPanel(true);
                }}>
                New
              </Button>
            </TopSection>
            {displayAddPanel && (
              <RenderAddPanel
                closePanel={closePanel}
                panelRef={AddPanelRef}
                displayAddPanel={displayAddPanel}
              />
            )}
            <RenderList list={results} />
          </TodoPanel>
        </MainColumn>
        <SideColumn>
          <LogOutButton
            BackgroundColor="#ffffff"
            Color="#000"
            onClick={() => {
              LogOut(setToken);
            }}>
            Logout
          </LogOutButton>
        </SideColumn>
      </TodoBody>
    </>
  );
};

export default App;
