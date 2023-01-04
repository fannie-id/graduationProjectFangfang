import React from 'react';
import DeedApp from "./components/DeedApp";
import DeedDetail from "./components/DeedDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/allDeeds" element={<DeedApp/>}></Route>
                    <Route path="/allDeeds/:id" element={<DeedDetail/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
