import Image from 'next/image';
import React from 'react';
import {
  RiMessengerLine,
  RiHeartLine
} from 'react-icons/ri';
import {
  HiHome,
  HiMenu,
  HiSearch,
  HiOutlinePlusCircle,
}
  from 'react-icons/hi';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useRecoilState } from "recoil";
import { messageOpenState, messageUserSelectedState, modalState } from "../atoms/modalAtom";
import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";


function Header() {

  const {data: session,status} = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const [verified, setVerified] = useState(false);
  const [messageOpen, setMessageOpen] = useRecoilState(messageOpenState);
  const [userSelected,setUserSelected] = useRecoilState(messageUserSelectedState)
  const handleOnClick = (e) =>{
      if(verified===false)
      {
          setVerified(true);
      }
      setMessageOpen(true);
      
  }

  const homeIconClick = (e) =>{
      ()=>router.push('/')
      setMessageOpen(false);
      setUserSelected(null)
  }

  useEffect(()=>{
      if(session)
      {
          setDoc(doc(db,'users',session?.user?.uid),{
              userId: session.user.uid,
              name: session?.user?.name,
              username: session?.user?.username,
              userImage: session?.user?.image,
          })
      }
  },[verified])



  return (
    <header className='shadow-sm border-b bg-white sticky top-0 z-50'>
        <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
            <div onClick={()=>router.push('/')} className="relative hidden lg:inline-grid  w-24 cursor-pointer">
                <Image
                    src='https://links.papareact.com/ocw'
                    layout='fill'
                    objectFit='contain' 
                />
        </div>
        
       
        <div onClick={()=>router.push('/')} className="relative w-10  lg:hidden flex-shrink-0 cursor-pointer">
                <Image
                        src='https://links.papareact.com/jjm'
                        layout='fill'
                        objectFit='contain' 
                    />
                </div>
        
        {/* Middle- search section */}

        

        
        <div className="relative p-3 mt-3 rounded-md">
          <div className="absolute mt-2 pl-2 flex items-center
           pointer-events-none"> 
            <HiSearch className="h-5 w-5 text-gray-500"/>
          </div>

          <input className="bg-gray-50 block w-full pl-10 sm:text-sm
          border-gray focus:ring-black focus:border-black-md rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>
        

          {/* Right-part - menu and logout */}

        <div className=" flex items-center justify-end 
        space-x-4 text-2xl">
                  {/* home and menu icon */}
          <HiHome className="navBtn" onClick={homeIconClick}/>
          <HiMenu className="h-6 md:hidden cursor-pointer" onClick={homeIconClick} />

          {session ? (
            <>
          <div className="relative navBtn ">
            
            <RiMessengerLine className="navBtn" onClick={handleOnClick}/>
          </div>
          
          <HiOutlinePlusCircle className="navBtn" onClick={() => StereoPannerNode(true)}/>
          <RiHeartLine className="navBtn" onClick={handleOnClick}/>
          
         
          <img onClick={signOut} src={session.user?.image}
            alt="profile pic"
            className='h-10 w-10 rounded-full cursor-pointer'
          />
            </>
          ) : (
          <button onClick={signIn}>Sign In</button>
          )}
          
        </div> 

      </div>
    </header>
  );
}

export default Header;