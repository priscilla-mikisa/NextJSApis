"use client"
import { userLogin } from "@/app/api/utils/userLogin";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";


const Login = () => {
 const [password, statePassword ] = useState('');
 const [username, stateUsername] = useState('');
 const [loading, setLoading] = useState(false);
 const [errors, setError]= useState('');
 const [response, setResponse]= useState('');
 const router = useRouter();

 const handleLogin = async(event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    try{
        setLoading(true)
        const response = await userLogin({username, password});
        setResponse(response.message?? 'Successful login')
        router.push('/atoms/sectionAtoms')
        console.log({response});
        setLoading(false)
    }catch(error){
const message = (error as Error).message;
      console.log({message});
      setLoading(false)
      setError(message)
    };
    
 }
 

    return(
        <form onSubmit={handleLogin}>
            <h2>LOGIN</h2>
            <input type="text" placeholder="Enter username" 
            required className="border w-full px-4 py-6 border-gray-500 rounded-xl mt-4"
            onChange={(event: ChangeEvent<HTMLInputElement>)=> stateUsername(event.target.value)}
            />
            <input type="password" placeholder="Enter Password" 
            required className="border w-full px-4 py-6 border-gray-500 rounded-xl mt-4"
            onChange={(event: ChangeEvent<HTMLInputElement>)=> statePassword(event.target.value)}
            />
            <button type="submit" className="rounded-xl mt-10 bg-green-500 text-white cursor-pointer px-6 py-4">
            {loading?'loading.........':'Submit'}
            </button>
            {response && <p className="text-green-500 text-sm">{response}</p>}
            {errors && <p className="text-red-500 text-sm">{errors}</p>}
        </form>
    )
}
export default Login;