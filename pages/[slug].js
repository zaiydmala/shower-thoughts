 import Message from "@/components/message";
 import { useRouter } from "next/router";
 import { useEffect, useState } from "react";
 import {auth, db } from '../utils/firebase';
 import { toast, Toast } from "react-toastify";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";


 export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    

    //Submit a message
    const submitMessage = async() => {
        //Check if user is logged in
        if(!auth.currentUser) return router.push('/auth/login');
        
        if(!message) {
            toast.error('Dont leave and empty message', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return; 
        }
        if(message.length > 50) {
            toast.error('Nobody got time for your longass opinions, got it? ', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        const docRef = doc(db,'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            })
        })

        setMessage('');
    };
    return(
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e) => setMessage(e.target.value)}
                        value= {message} 
                        placeholder='send a message' 
                        className="bg-gray-800 w-full p-2 text-white text-sm "
                    />
                    <button onClick={submitMessage} className="bg-cyan-500 text-white py-2 px-4 text-sm">Submit</button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {/* {setAllMessages?.map(message => (
                        <div>
                            <div>
                                <img src="" alt="" />
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
 }