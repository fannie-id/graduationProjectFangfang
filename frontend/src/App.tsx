import React from 'react';
import DeedApp from "./components/DeedApp";
import ViewDeed from "./components/ViewDeed";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditDeed from "./components/EditDeed";
import AddDeed from "./components/AddDeed";


function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/deeds" element={<DeedApp/>}></Route>
                    <Route path="/deeds/add" element={<AddDeed/>}></Route>
                    <Route path="/deeds/:id" element={<ViewDeed/>}></Route>
                    <Route path="/deeds/:id/edite" element={<EditDeed/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
