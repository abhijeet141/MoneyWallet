import { NavBar } from "../components/NavBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
export function Dashboard(){
    return(
        <div className="flex flex-col gap-4">
            <NavBar></NavBar>
            <div className="flex flex-col gap-4">
                <Balance value={"10,000"}></Balance>
                <Users></Users>
            </div>
        </div>
    )
}