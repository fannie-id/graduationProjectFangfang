import React from 'react';
import DeedApp from "./components/Deed/DeedApp";
import ViewDeed from "./components/Deed/ViewDeed";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditDeed from "./components/Deed/EditDeed";
import AddDeed from "./components/Deed/AddDeed";
import LoginPage from "./components/User/LoginPage";
import Register from "./components/User/Register"
import NavigationBar from "./components/NavigationBar";
import useDeeds from "./hooks/useDeeds";
import useUser from "./hooks/useUser";
import useAnotherUser from "./hooks/useAnotherUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Profile from "./components/User/Profile";
import ProfileForm from "./components/User/ProfileForm";

function App() {
    const {getLoginUser, addUser, loggedInUser, logout, editUser, deleteUser} = useUser()
    const {deeds, addNewDeed} = useDeeds(loggedInUser)
    const {userGainKP} = useAnotherUser()
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<p>welcome!</p>}></Route>
                    <Route path="/register" element={<Register addUser={addUser}/>}></Route>
                    <Route path="/login" element={<LoginPage getLoginUser={getLoginUser} user={loggedInUser}/>}></Route>

                        <Route path="/profile"
                               element={<Profile deeds={deeds} user={loggedInUser}/>}></Route>
                    <Route path="/profile/edit"
                           element={<ProfileForm user={loggedInUser} submitUser={editUser}/>}></Route>
                    <Route path="/deeds"
                           element={<DeedApp deeds={deeds}
                                             username={loggedInUser && loggedInUser.username}/>}></Route>
                        <Route path="/deeds/add"
                               element={<AddDeed addNewDeed={addNewDeed} user={loggedInUser}/>}></Route>
                        <Route path="/deeds/:id"
                               element={<ViewDeed user={loggedInUser} userGainKP={userGainKP}/>}></Route>
                    <Route path="/deeds/:id/edit" element={<EditDeed/>}></Route>
                    <Route element={<ProtectedRoutes user={loggedInUser}/>}>
                    </Route>
                </Routes>
                <NavigationBar logout={logout} user={loggedInUser}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
