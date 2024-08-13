import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { WarningBottom } from "../components/WarningBottom"
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import { Navigation } from "../components/Navigation"
import axios from "axios"
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
                                alert("Please fill out all required fields.");
                                return;
                            }
                            if(!validateEmail(username)){
                                alert("Please enter a valid email address.");
                                return;
                            }
                            try{
                                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                                    username,
                                    password
                                })
                                localStorage.setItem("tokenId", response.data.token)
                                navigate('/dashboard')
                            }
                            catch(error){
                                if (error.response && error.response.status === 403) {
                                    alert(error.response.data.message);
                                }
                                else {
                                    alert('Sign In Failed');
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