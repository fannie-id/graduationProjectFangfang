import React from 'react';
import DeedApp from "./components/DeedApp";
import ViewDeed from "./components/ViewDeed";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditDeed from "./components/EditDeed";
import AddDeed from "./components/AddDeed";
import Register from "./components/Register"
import NavigationBar from "./components/NavigationBar";
import useDeeds from "./hooks/useDeeds";


function App() {
    const {deeds, addNewDeed} = useDeeds()

    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>

                <Routes>
                    <Route path="" element={<p>Welcome!</p>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/deeds" element={<DeedApp deeds={deeds}/>}></Route>
                    <Route path="/deeds/add" element={<AddDeed addNewDeed={addNewDeed}/>}></Route>
                    <Route path="/deeds/:id" element={<ViewDeed/>}></Route>
                    <Route path="/deeds/:id/edit" element={<EditDeed/>}></Route>
                </Routes>
                <NavigationBar/>
            </BrowserRouter>
        </div>
    );
}

export default App;
