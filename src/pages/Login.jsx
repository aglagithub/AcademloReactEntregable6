import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {register,handleSubmit}=useForm()
  const submit= (data) => {
    console.log("Form to submit:", data)
  }
  return (
    <section className="bg-gray-100 grid place-content-center px-2">
      <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl p-4 max-w-[350px] grid gap-6">
        <h3 className="font-semibold text-xl">
          Welcome! Enter your email and password to continue
        </h3>
        <section className="bg-[#d8fffd] p-4 rounded-md py-2">
          <h5 className="text-center font-bold mb-4">Test data</h5>
          <div className="flex items-center gap-2">
            <i className="bx bx-envelope text-xl"></i>
            <span className="text-sm">john@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="bx bx-lock-alt text-xl"></i>
            <span className="text-sm">john1234</span>
          </div>
        </section>
        <div className="grid gap-2">
          <label  className="text-sm"htmlFor="email">Email</label>
          <input {...register("email")}
            className="border-[1px] border-gray-100 outline-none p-2 rounded-sm"
            id="email"
            type="email"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="password">Password</label>
          <input {...register("password")}
            className="border-[1px] border-gray-100 outline-none p-2 rounded-sm"
            id="password"
            type="password"
          />
        </div>
        <button className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">Login</button>
        <span className="text-sm">Don't have an account? Sign up</span>
      </form>
    </section>
  );
};

export default Login;
