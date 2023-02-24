import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
export default function Post() {
    //Form state
    const [post, setPost] = useState({description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;
    //Submit post
    const submitPost = async(e) => { 
        e.preventDefault();    
        
        //Run checks for description 
        if(!post.description) {
            toast.error('Description missing ', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }
        //Run checks for post length
        if(post.description.length > 300) {
            toast.error('Nobody gonna read this longass post ', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        if(post?.hasOwnProperty('id')) {
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = {...post, timestamp: serverTimestamp()};
            await updateDoc(docRef, updatedPost); 
            return route.push('/')
        } else {
            //Make a new post
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
            })
            setPost({description: ''});
            toast.success('Post has been made!', { 
                position: toast.POSITION.TOP_CENTER, autoclose: 1500,
                }
            )
            return route.push('/')
        }
    };

    //Check our user
    const checkUser = async () => {
        if(loading) return;
        if(!user) route.push('/auth/login');
        if(routeData.id) {
            setPost({description: routeData.description, id: routeData.id})
        }
    };

    useEffect(() => {
        checkUser();
    }, [user,loading])

    return(
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-bold'>
                    {post.hasOwnProperty('id') ? "Go ahead, correct your typos" : "Share your thoughts!" }
                </h1>
                <div className='py-2 '>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea 
                    value={post.description}
                    onChange={(e) => setPost({...post, description: e.target.value})} 
                    className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'>
                    </textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? 'text-red-600': ''}`}>{post.description.length}/300</p>
                </div>
                <button type='submit' 
                className='bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm w-full'>Submit!</button>
            </form>
        </div>
    )
}