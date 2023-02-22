import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 

export default function Post() {
    //Form state
    const [post, setPost] = useState({description: "" })
    return(
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
            <form className=''>
                <h1 className='text-2xl font-bold'>Make a post!</h1>
                <div className='py-2 '>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
                    <p className=''>0/300</p>
                </div>
                <button className='bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm w-full'>Submit!</button>
            </form>
        </div>
    )
}