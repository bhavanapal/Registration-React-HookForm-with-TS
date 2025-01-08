import { useForm } from "react-hook-form";
import User from "../models/User";
import './Registration.css';
import { useState } from "react";
import doUserCheck from "../services/api-client";

const Registration = ()=>{
    const {register, handleSubmit, formState:{errors}, watch, reset} = useForm<User>();
    const password = watch('password');
    const [pwdColor, setPwdColor] = useState<string>('red');
    const [message, setMessage] = useState<string>('');

    const getCountries = ()=>{
        return ["India", "Srilanka", "USA","Canada", "UK"];
    }

    const onSubmit = async (user:User)=>{
        console.log('User is ', user);
        try{
        const result = await doUserCheck(user);
        console.log('Data API Send ', result);
        if(result && result.message){
            setMessage('User Not Exist So U can Register ');
        }
        else{
            setMessage("User  Exist So U can't Register ");
        }
        }
        catch(err){
            console.log('API Call Fails ', err);
        }
    }

    const passwordStrength = (password:string)=>{
        if(password.length<8){
            setPwdColor('red');
           
        }
        else if(password.length>=8 && password.length<12){
            setPwdColor('yellow');
           
        }
        else{
            setPwdColor('green');
           
        }
        return true;
       
    }

    const clearAll=()=>{
        reset();
    }
   
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-lg font-bold mb-4 bg-sky-500 text-white w-96 tracking-wide text-center p-2 rounded">Register Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-1/3">
        <h2 className="text-lg font-bold mb-4 text-red-700">{message}</h2>
            <div className="mb-4">
                <label>UserName</label>
                <input {...register('username',{required:'UserName is Required', })} type="text" placeholder="Type UserName Here" />
                {errors && errors.username && <p>{errors.username.message}</p>}
            </div>
            <div  className="mb-4">
                <label>Email</label>
                <input {...register('email',{required:'Email is Required', pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'Invalid Pattern'}})} type="text" placeholder="Type Email Here" />
                {errors && errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label>Password</label>
                <input {...register('password', {required:'Password is Required',validate:passwordStrength})} type="password" placeholder="Type Password Here" />
                {errors && errors.password && <p>{errors.password.message}</p>}
                
                <div style={{width:'30%', height:'10px', backgroundColor:pwdColor ,marginTop:'10px'}}>

                </div>
                
                </div>
            <br />
            <div className="mb-4">
                <label>Confirm Password</label>
                <input {...register('confirmPassword',{required:'Confirm Password is Required', validate:(cpwd)=>cpwd==password || 'Password not match'})} type="password" placeholder="Type Confirm Password Here" />
                {errors && errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <div className="mb-4">
                <label>Gender</label>
                <input {...register('gender',{required:'Gender is Required'})}  type="radio" value = "M" /> Male
                &nbsp;
                <input {...register('gender',{required:'Gender is Required'})} type="radio" value = "F" /> Female
                {errors && errors.gender && <p>{errors.gender.message}</p>}
            </div>
            <div className="mb-4">
                <label>Country</label>
                <select {...register('country',{required:'Country is Required'})} defaultValue="">
                    <option value="" disabled>Select Your Country</option>
                    {getCountries().map((country, index)=><option key={index} value={country}>{country}</option>)}
                </select>
                {errors && errors.country && <p>{errors.country.message}</p>}
            </div>
            <div className="mb-4">
                <label>DOB</label>
                <input {...register('dob',{required:'DOB is Required'})} type="date"  />
                {errors && errors.dob && <p>{errors.dob.message}</p>}
            </div>
            <div className="mb-4 flex items-center justify-between">
                <button className="btn btn--primary">Register</button> &nbsp;
                <button className="btn btn--secondary" onClick={clearAll}>Clear All</button>
            </div>
        </form>
    </div>
    );
}
export default  Registration;
