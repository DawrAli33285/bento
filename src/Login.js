import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";

export default function Login(){
  const [loginForm,SetLoginForm] = useState(true)
  return(
    <div className="lg:p-[64px] p-[20px]">
        {
            loginForm ? <LoginForm setRegister={SetLoginForm} /> : <Register setRegister={SetLoginForm} />
        }
    </div>
  )  
}