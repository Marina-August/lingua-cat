

import Image from "next/image";
import Link from "next/link";


const Footer =()=>{
    const year = new Date().getFullYear();

    return(
        <div className="main-footer  bg-slate-400 flex  bg-opacity-70 justify-between items-center">
            <div className=" flex gap-4 text-gray-700/75">
                <p className="ml-8">Copyright © {year} Marina Batina. All rights reserved &nbsp; &nbsp; | &nbsp;</p>
                <p>Lingua Cat v.0.1.1 &nbsp;&nbsp;|</p>
                <p>Icons from 
                    <Link href="https://www.flaticon.com/"className="hover:text-emerald-700 text-emerald-900"> &nbsp;Flaticon &nbsp; </Link>
                    <span>|</span>
                </p>
            </div> 
            <div className="flex gap-8 items-center">  
                <Link href= "https://github.com/Marina-August" className="opacity-50 hover:opacity-75"><img src="/assets/images/github.png"  height="25" width="25"/></Link>
                <Link href= "https://www.linkedin.com/in/marina-batina-208a13282/"  className="opacity-50 hover:opacity-75"><img src="/assets/images/linkedin.png" height="25" width="25"/></Link>
                <Link href= "https://www.codewars.com/users/Marina_August"  className="opacity-50 hover:opacity-75"><img src="https://www.codewars.com/packs/assets/logo.f607a0fb.svg" hight= "25" width = "25"/></Link>  
                <a href="mailto:mbatina.oat@gmail.com" className="mr-16 opacity-50 hover:opacity-75">
                    <img src="/assets/images/gmail.png" alt="Send an email" height="25" width="25"/>
                </a> 
            </div>     
        </div>
    )
}

export default Footer;