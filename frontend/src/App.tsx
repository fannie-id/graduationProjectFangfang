import React from 'react';
import DeedApp from "./components/DeedApp";
import ViewDeed from "./components/ViewDeed";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditDeed from "./components/EditDeed";
import AddDeed from "./components/AddDeed";
import NavigationBar from "./components/NavigationBar";


function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>

                <Routes>
                    <Route path="" element={<p>Welcome!</p>}></Route>
                    <Route path="/deeds" element={<DeedApp/>}></Route>
                    <Route path="/deeds/add" element={<AddDeed/>}></Route>
                    <Route path="/deeds/:id" element={<ViewDeed/>}></Route>
                    <Route path="/deeds/:id/edit" element={<EditDeed/>}></Route>
                </Routes>
                <NavigationBar/>
            </BrowserRouter>
        </div>
    );
}

export default App;
