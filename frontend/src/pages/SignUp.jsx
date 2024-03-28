import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <div className="pt-1">
                <InputBox placeholder="Kushal" label={"First Name"} />
                </div>
                <div className="pt-1">
                    <InputBox placeholder="Singh" label={"Last Name"} />
                </div>
                <div className="pt-1">
                    <InputBox placeholder="kushal@gmail.com" label={"Email"} />
                </div>
                <div className="pt-1">
                    <InputBox placeholder="1234" label={"Password"} />
                </div>
                <div className="pt-4">
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
    )
}