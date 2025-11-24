"use client"

import { signIn, signUp } from '@/lib/auth';
import React from 'react'
import { useForm } from 'react-hook-form'

const AuthForm = ({mode = "Log In"}) => {

  const {
    register, 
    handleSubmit, 
    watch, 
    formState: {errors},
  } = useForm(); 

  const onSubmit = async (data) => {
    const { email, password, userName, penName } = data;

    if (mode === "Log In") {
      return await signIn(email, password);
    } else {
      return await signUp(email, password, userName, penName);
    }
  };

  return (  

    <form 
      onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto"
    >
      <div className="mb-5">
        <label htmlFor="userName" className="block mb-2.5 text-sm font-medium text-heading">Your user name</label>
        <input 
          type="text" 
          id="userName" 
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
          placeholder="name@flowbite.com" 
          required
          {...register("userName")}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="penName" className="block mb-2.5 text-sm font-medium text-heading">Your penname</label>
        <input 
          type="text" 
          id="penName" 
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
          placeholder="name@flowbite.com" 
          required
          {...register("penName")}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
        <input 
          type="email" 
          id="email" 
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
          placeholder="name@flowbite.com" 
          required
          {...register("email")}
        />
      </div>
      <div className="mb-5">
        <label 
          htmlFor="password" 
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Your password
        </label>

        <input 
          type="password" 
          id="password" 
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
          placeholder="••••••••" 
          required 
          {...register("password")}
        />
      </div>
      <label
        htmlFor="remember" 
        className="flex items-center mb-5"
      >
      <input 
        id="remember"
        type="checkbox" 
        defaultValue 
        className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" 
        required 
        {...register("remember")}
      />
      <p className="ms-2 text-sm font-medium text-heading select-none">
        I agree with the  
        <a href="#" className="text-fg-brand hover:underline ml-2">
          terms and conditions
        </a>.
      </p>
      </label>
      <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">{mode}</button>
    </form>
  )
}

export default AuthForm