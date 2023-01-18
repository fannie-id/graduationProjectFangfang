import React from 'react';
import DeedApp from "./components/DeedApp";
import ViewDeed from "./components/ViewDeed";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditDeed from "./components/EditDeed";
import AddDeed from "./components/AddDeed";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register"
import NavigationBar from "./components/NavigationBar";
import useDeeds from "./hooks/useDeeds";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/Profile";
import ProfileForm from "./components/FrofileForm";


function App() {
    const {getLoginUser, addUser, loggedInUser, logout, editUser} = useUser()
    const {deeds, addNewDeed} = useDeeds(loggedInUser)
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>

                <Routes>
                    <Route path="" element={<p>Welcome!</p>}></Route>
                    <Route path="/register" element={<Register addUser={addUser}/>}></Route>
                    <Route path="/login" element={<LoginPage getLoginUser={getLoginUser}/>}></Route>
                    <Route element={<ProtectedRoutes user={loggedInUser}/>}>
                        <Route path="/profile" element={<Profile user={loggedInUser}/>}></Route>
                        <Route path="/profile/edit"
                               element={<ProfileForm user={loggedInUser} submitUser={editUser}/>}></Route>
                        <Route path="/deeds" element={<DeedApp deeds={deeds}
                                                               username={loggedInUser && loggedInUser.username}/>}></Route>
                        <Route path="/deeds/add" element={<AddDeed addNewDeed={addNewDeed}/>}></Route>
                        <Route path="/deeds/:id" element={<ViewDeed/>}></Route>
                        <Route path="/deeds/:id/edit" element={<EditDeed/>}></Route>
                    </Route>
                </Routes>
                <NavigationBar logout={logout}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
