import { NavBar } from "../components/NavBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import axios from "axios"
export function Dashboard(){
    const [name,setName] = useState("");
    const [balance,setBalance] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('tokenId')
            }
        })
        .then(response =>{
            const balance = parseFloat(response.data.balance).toFixed(2)
            setBalance(balance)
            setName(response.data.firstName)
        })
    },[])
    return(
        <div className="flex flex-col gap-4">
            <NavBar name={name}></NavBar>
            <div className="flex flex-col gap-4">
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>
        </div>
    )
}