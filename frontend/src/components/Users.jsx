import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export function Users(){
    // const [users,setUsers] = useState([{
    //     firstName: "Abhijeet",
    //     lastName: "Sinha"
    // }])
    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('tokenId')
            }
        })
        .then(response =>{
            console.log(response.data.user)
            setUsers(response.data.user);
        })
    },[filter])
    return (
        <div className="flex flex-col">
           <div className="font-medium ml-4">
                Users
            </div>
            <input onChange={(event)=>{
                setFilter(event.target.value)
            }} type="text" placeholder="Search Users" className="ml-4  p-1 border rounded m-2" />  
            <div>
                {users.map((user,index)=><User key={index} user={user}></User>)}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();
    return(
        <div className='flex justify-between items-center'>
        <div className='flex items-center'>
        <div className="rounded-full bg-slate-200 flex justify-center h-8 w-8 pt-1 ml-4">{user.firstName[0]}</div>
        <div className="justify-center h-full ml-4">{user.firstName} {user.lastName}</div>
        </div>
        <div>
        <button
        onClick={()=>{
            navigate(`/send?id=${user._id}&name=${user.firstName}&lastname=${user.lastName}`)
        }}
        type="button" className="text-white bg-gray-800 hover:bg-gray-900 w-32 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 sm:w-40">Send Money</button>
        </div>
        </div>
    )
}