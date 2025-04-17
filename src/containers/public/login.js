import React from "react";
import  {InputForm, Button} from "../../components";


const Login = () => {
    
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm '>
        <h3 className='font-semibold text-2xl mb-3'>Login</h3>
        <div className='w-full flex flex-col gap-5'>
            <InputForm label={'Phone Number'}/>
            <InputForm label={'Password'}/>
            <Button text="Login" bgColor="bg-secondary1" textColor="text-white" fullWidth/>
        </div>

        <div className='mt-7 flex items-center justify-between'>
            <small className='text-[black] hover:text-[blue] underline cursor-pointer'>Forgot Password ?</small>
            <small className='text-[black] hover:text-[blue] underline cursor-pointer'>Sign Up</small>
        </div>
    </div>
  );
};

export default Login;
