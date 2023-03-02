import Link from "next/link";
import { auth } from '../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {BsFillMoonStarsFill} from 'react-icons/bs';``
import { useEffect, useState } from 'react';

export default function Nav() {
    const [user, loading] = useAuthState(auth);
    
    
    
    return(
        <nav className="flex justify-between items-center py-10">
            <Link href='/'>
                <button className="text-lg font-medium">Shower Thoughts</button>
            </Link>
            <ul className="flex items-center gap-10">
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className=" cursor-pointer text-2xl"
                />
                {!user && (
                    <Link href={"/auth/login"} className='py-2 px-4 text-center text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8 dark:text-black'>
                    Join Now!
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href='/post'>
                            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">Post</button>
                        </Link>
                        <Link href='/dashboard'>
                            <img className="w-12 rounded-full cursor-pointer" src={user.photoURL}  alt="user-dp"/>
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    );
}
