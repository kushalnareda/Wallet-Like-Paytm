import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            // Replace the URL with your backend endpoint
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email,
                password: password,
            });
            // Assuming the response contains a token, save it to localStorage
            localStorage.setItem("token", response.data.token);
            // Redirect to the dashboard or home page
            navigate("/dashboard");
        } catch (error) {
            console.error("Signin error:", error.response ? error.response.data : error.message);
            // Here, you could set an error message to show to the user
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Kushal@gmail.com"
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Kushal123"
                        label={"Password"}
                        type="password" // This ensures the input is treated as a password
                    />
                    <div className="pt-4">
                        <Button onClick={handleSignIn} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
