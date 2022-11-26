import { useState } from "preact/hooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth({children}){
    const auth = useAuth();
    
    if(!auth.authUser){
        return <Navigate to="/login"></Navigate>
    }
    return children
}