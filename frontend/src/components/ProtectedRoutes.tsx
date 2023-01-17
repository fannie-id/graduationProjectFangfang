import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    username: string | undefined
}


export default function ProtectedRoutes(props: ProtectedRoutesProps) {
    const isAuthenticated: boolean = props.username !== "anonymousUser" && props.username !== undefined && props.username !== null
    return (
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}