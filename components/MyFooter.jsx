import Link from "next/link";

const MyFooter = ()=>{
    const year = new Date().getFullYear();

    return(
        <div className="main-footer lg:text-sm bg-slate-400 flex  bg-opacity-70 justify-between items-center md:text-xs ">
            <div className=" flex gap-4 text-gray-700/75">
                <p className="ml-8 sm:ml-2">Copyright © {year} Marina Batina. All rights reserved &nbsp; &nbsp; | &nbsp;</p>
                <p className="v-footer sm:hidden">Lingua Cat v.0.1.1 &nbsp;&nbsp;|</p>
                <p className="icons-footer md:hidden lg:block sm:hidden">Icons from 
                    <Link href="https://www.flaticon.com/"className="hover:text-emerald-700 text-emerald-900"> &nbsp;Flaticon &nbsp; </Link>
                    <span>|</span>
                </p>
            </div> 
            <div className="flex lg:gap-8 md:gap-2 items-center">  
                <Link href= "https://github.com/Marina-August" className="opacity-50 hover:opacity-75"><img src="/assets/images/github.png"  height="20" width="20"/></Link>
                <Link href= "https://www.linkedin.com/in/marina-batina-208a13282/"  className="opacity-50 hover:opacity-75"><img src="/assets/images/linkedin.png" height="20" width="20"/></Link>
                <Link href= "https://www.codewars.com/users/Marina_August"  className="opacity-50 hover:opacity-75"><img src="https://www.codewars.com/packs/assets/logo.f607a0fb.svg" hight= "25" width = "25"/></Link>  
                <a href="mailto:mbatina.oat@gmail.com" className="lg:mr-16 md:mr-2 opacity-50 hover:opacity-75">
                    <img src="/assets/images/gmail.png" alt="Send an email" height="25" width="25"/>
                </a> 
            </div>     
        </div>
    )
}

export default MyFooter;