import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    const [firstName ,setFirstName] = useState("");
    const [lastName ,setLastName] = useState("");
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const navigate = useNavigate();

    return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <div className="pt-1">
                <InputBox onChange={e =>{setFirstName(e.target.value)}} placeholder="Kushal" label={"First Name"} />
                </div>
                <div className="pt-1">
                    <InputBox onChange={e =>{setLastName(e.target.value)}} placeholder="Singh" label={"Last Name"} />
                </div>
                <div className="pt-1">
                    <InputBox onChange={e =>{setUsername(e.target.value)}} placeholder="kushal@gmail.com" label={"Email"} />
                </div>
                <div className="pt-1">
                    <InputBox onChange={e =>{setPassword(e.target.value)}} placeholder="1234" label={"Password"} />
                </div>
                <div className="pt-4">
                    <Button onClick = {async() =>{
                        try{
                            //console.log("Signup button clicked");
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                                firstName : firstName,
                                lastName : lastName,
                                username : username,
                                password : password
                            })
                            //console.log("Signup success", response.data); 
                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard")
                        }
                        catch (err) {
                            console.error("Signup error:");
                        }
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
    )
}