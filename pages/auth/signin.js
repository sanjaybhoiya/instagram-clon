import React from 'react';
import styles from './signin.module.css';
import {getProviders,signIn as signinprovider} from 'next-auth/react';

import Image from 'next/image';
import { BsInstagram } from 'react-icons/bs';
import Header from '../../components/Header';
export default function signIn({providers}) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <div className={styles.mainPage}>
                        <div className="flex p-24 text-6xl">
                            <BsInstagram className="flex justify-center, items-center text-center"/>
                        </div>
                        
                        <p className={styles.diclaimer}>This is not real Instagram, This build is for learning purposes only.</p>
                        <p className={styles.developer}>User Name </p>
                    <button className={styles.signinBtn} onClick={() => signinprovider(provider.id,{callbackUrl:'/'})}>
                        Sign in with {provider.name}
                    </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps(){
    const providers = await getProviders();
    return{
        props:{
            providers,
        }
    };
}

