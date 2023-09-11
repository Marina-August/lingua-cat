"use client";

import Image from 'next/image';
import { useSession } from 'next-auth/react';

const MyProfile =()=>{

    const {data: session} = useSession();

    return (
        <div className="flex justify-items-start align-center gap-20 ml-40 mt-20">
            <diV>
                   <Image src= {session?.user.image ? session?.user.image: "/assets/images/user-image.png"} 
                   width={110} height={55}  loading="eager" className='rounded-full' alt='profile'/>
                   <h3>Change Photo</h3>
            </diV>
            <div className='flex flex-col gap-4'>
                <div>
                     My email:<span>{session?.user.email} </span>
                </div>
                <div>
                     My source Language:
                </div>
                 <div>
                    My Target Language:
                </div>
                <div>
                    Delete Profile
                </div>      
            </div>
        </div>
    )
}

export default MyProfile;