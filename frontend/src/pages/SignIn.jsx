import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { WarningBottom } from "../components/WarningBottom"
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { Navigation } from "../components/Navigation"
import axios from "axios"
import swal from 'sweetalert';

export function SignIn(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    return(
        <>
        <div>
        <Navigation logo={"Paytm App"} signup = {"SignUp"} signin = {"SignIn"}></Navigation> 
        </div>
        <div className="flex flex-col justify-center items-center mx-auto h-dvh">
             <div className="bg-slate-300 w-3/4">
                <div className="rounded-md w-60 bg-white text-center flex flex-col justify-center p-1 mx-auto my-10 h-max sm:w-80 gap-2">
                    <Heading label={"Sign In"}></Heading>
                    <SubHeading label={"Enter your credentials to create an account"}></SubHeading>
                    <InputBox
                     onChange = {
                        event => {
                            setUsername(event.target.value)
                        }}
                     label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
                    <InputBox
                    onChange = {
                        event => {
                            setPassword(event.target.value)
                        }}
                    label={"Password"} placeholder={"john123"}></InputBox>
                    <div className="flex justify-center">
                        <Button onClick={async()=>{
                            if (!username || !password) {
                                swal("Please fill out all required fields.","","error");
                                return;
                            }
                            if(!validateEmail(username)){
                                swal("Please enter a valid email address.","","error");
                                return;
                            }
                            try{
                                const response = await axios.post("https://moneywallet-backend-1.onrender.com/api/v1/user/signin",{
                                    username,
                                    password
                                })
                                localStorage.setItem("tokenId", response.data.tokenId)
                                navigate('/dashboard')
                            }
                            catch(error){
                                if (error.response && error.response.status === 403) {
                                    swal(error.response.data.message,"","error");
                                }
                                else {
                                    swal('Sign In Failed','',"error");
                                }
                        }}} label={"Sign In"}></Button>
                    </div>
                    <WarningBottom label={"Don't have an account?"} text={"Sign Up"} to={'/signup'}></WarningBottom>
                </div>
        </div>
        </div>
       </>
    )
}