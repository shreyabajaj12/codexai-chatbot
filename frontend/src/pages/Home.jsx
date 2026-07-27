import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import api from '../../utils/axios'
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from '../../utils/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import Artifacts from '../components/Artifacts';


const Home = () => {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    console.log(userData)
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider)
        const token = await data.user.getIdToken()
        console.log(token)
        await handleLogin(token)
        console.log(data)
    }
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUserData(data))
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='h-screen flex bg-black text-white overflow-hidden'>
            <Sidebar/>
            <ChatArea/>
            <Artifacts/>

            {!userData &&
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                    <div className='w-[340px] bg-gray-900 border-gray-400 rounded-2xl p-7 flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to CodeXAI</h2>
                            <p className='text-[13px] text-slate-500'>Please login to continue using the app</p>
                        </div>
                        <button
                            className="w-full flex items-center justify-center gap-3 py-[11px]
                            rounded-xl text-sm font-medium text-white
                            bg-gradient-to-br from-indigo-500 to-violet-500
                            hover:from-indigo-400 hover:to-violet-400
                            active:from-indigo-600
                            shadow-lg shadow-indigo-500/20
                            hover:shadow-indigo-500/30
                            transition-all duration-150 cursor-pointer"
                            onClick={googleLogin}
                        >
                            <FcGoogle size={18} />
                            Continue With Google
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home
