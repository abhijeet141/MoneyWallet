import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { WarningBottom } from "../components/WarningBottom"
import { useNavigate } from "react-router-dom"
import {useState} from "react"
import { Navigation } from "../components/Navigation"
import axios from "axios"
import swal from 'sweetalert';


export function SignUp(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
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
                <div className="rounded-md w-60 bg-white text-center flex flex-col justify-center p-1 mx-auto my-6 h-max sm:w-80 gap-2 ">
                    <Heading label={"Sign up"}></Heading>
                    <SubHeading label={"Enter your credentials to create an account"}></SubHeading>
                    <InputBox onChange = {
                        event => {
                            setFirstName(event.target.value)
                        }
                    } label={"First Name"} placeholder={"John"}></InputBox>
                    <InputBox onChange = {
                        event => {
                            setLastName(event.target.value)
                        }
                    } label={"Last Name"} placeholder={"Doe"}></InputBox>
                    <InputBox onChange = {
                        event => {
                            setUsername(event.target.value)
                        }
                    } label={"Email"} placeholder={"johndoe@gmail.com"}></InputBox>
                    <InputBox onChange = {
                        event => {
                            setPassword(event.target.value)
                        }
                    } label={"Password"} placeholder={"john123"}></InputBox>
                    <div className="flex justify-center">
                        <Button onClick = {async()=>{
                            if (!firstName || !lastName || !username || !password) {
                                swal("Please fill out all required fields.","","error");
                                return;
                              }
                            if(!validateEmail(username)){
                                swal("Please enter a valid email address.","","error");
                                return;
                            }
                            if(password.length < 8){
                                swal("Your password should be greater than 8","","error");
                                return;
                            }
                             try {
                                const response = await axios.post("https://moneywallet-backend-1.onrender.com/api/v1/user/signup", {
                                  firstName,
                                  lastName,
                                  username,
                                  password,
                                });
                                if(response.data.message === 'User already exists please login'){
                                    swal(response.data.message,"","error");
                                    return;
                                }
                                localStorage.setItem("tokenId", response.data.token);
                                navigate("/dashboard");
                              } catch (error) {
                                swal("Sign up failed","","error");
                              }
                        }} label={"Sign Up"}></Button>
                    </div>
                    <WarningBottom label={"Already have an account?"} text={"Sign In"} to={'/signin'}></WarningBottom>
                </div>
        </div>
        </div>
        </>
    )
}