import { useSelector } from "react-redux"
import { RootState } from "../store"

const token = useSelector((state : RootState)=>state.auth.token)
export const isLoggedIn= () : boolean=> {
        return token !== null;
}
// it will return true if you are logged in