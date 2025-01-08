import User from "../models/User"

const doUserCheck = async (user:User)=>{
    const response = await fetch('https://dummyjson.com/auth/login',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}
export default doUserCheck;