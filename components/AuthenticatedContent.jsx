"use client";

import { useSession } from "next-auth/react";

const AuthenticatedContent = ({ children }) => {
  const { data: session } = useSession();
  
  if (session) {
    
    return children;
  }
  else {

  }
};

export default AuthenticatedContent;