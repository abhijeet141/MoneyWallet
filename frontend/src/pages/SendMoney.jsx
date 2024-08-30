import {useState} from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import swal from 'sweetalert';

export function SendMoney(){
    const [amount,setAmount] = useState()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const lastname = searchParams.get('lastname')
    const navigate = useNavigate();
    return(
        <div className="bg-gray-100 flex justify-center items-center mx-auto h-dvh">
            <div className="flex flex-col p-10 gap-2 bg-white">
            <div className="flex flex-col justify-center items-center text-xl font-bold">
            Send Money
            </div>
            <div className="pt-8">
            <div className="flex items-center">
                <div className="rounded-full bg-green-500 flex justify-center h-8 w-8 pt-1 ml-4 text-white">{name[0]}</div>
                <div className="justify-center h-full ml-4 font-bold">{name + " " + lastname}</div>
            </div>
            <div className="font-medium ml-4 pt-4">
                Amount (in Rs)
            </div>
            <input
            onChange={(event)=>{
                setAmount(event.target.value)
            }}
             type="number" placeholder="Enter amount" className="ml-4 w-64  p-1 border rounded m-2" />  
            </div>
            <div className="flex justify-center">
            <button
            onClick={async ()=>{
                try{
                    await axios.post('https://moneywallet-backend-1.onrender.com/api/v1/account/transfer',{
                        amount: amount,
                        to: id
                    },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem('tokenId')
                        }
                    })
                        await swal("Transaction Sucessfull","","success")
                        navigate("/dashboard")
                }
                catch(error){
                    if (error.response) {
                        await swal(error.response.data.message,"","error");
                        navigate("/dashboard")
                    }
                    else{
                    await swal("Transaction Unsucessfull","","error")
                    }
                }
            }}
            type="button" className="rounded-md text-white bg-green-500 hover:bg-green-400 w-56 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 sm:w-72">Initiate Transfer</button>
            </div>
            </div>
        </div>
    )
}