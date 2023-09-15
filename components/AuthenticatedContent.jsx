"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const AuthenticatedContent = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  
  if (session) {  
    return children;
  }
  else {
  
  }
};

export default AuthenticatedContent;