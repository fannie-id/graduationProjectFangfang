import {Navigate, Outlet} from "react-router-dom";
import {UserInfo} from "../model/User";

type ProtectedRoutesProps = {
    user: UserInfo | undefined
}


export default function ProtectedRoutes(props: ProtectedRoutesProps) {
    const isAuthenticated: boolean = props.user !== undefined && props.user !== null
    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}