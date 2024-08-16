import { ChangeEvent, useState } from "react";
import {Link} from "react-router-dom"
import { SignupInput, SigninInput } from "@aworldofmysteries/medium-common";


export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "", 
        username: "",
        password: ""
    })
    
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center ">
            <div>
                <div className="px-10 pb-6">

                    <div className="text-4xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400 text-center">
                        {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline pl-2" to={type==="signup" ? "/signin" : "/signup"}>
                            {type === "signup" ? "Sign in" : "Sign up"}
                        </Link>
                    </div>

                </div>

                <LabelledInput label="Name" placeholder="Sahil Wani" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} />
                <LabelledInput label="Username" placeholder="sahil@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }} />
                <LabelledInput label="Password" type="password" placeholder="•••••••••" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                <button type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>

        </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;  
}
const LabelledInput = ({label, placeholder, onChange, type}: LabelledInputType) => {
    return <div>
        <label className="block mb-2 text-sm font-semibold text-black-900">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}