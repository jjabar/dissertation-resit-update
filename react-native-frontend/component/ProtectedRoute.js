import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {  useSelector } from "react-redux";


const ProtectedRoute = ({children})  => {

    const { user, isLoading } = useSelector((state) => state?.auth);
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push("/auth/login");
        }
    },[user])

    if(isLoading) return <ActivityIndicator size="large" color="#8ac926" />;
    if(!user) return null

    return children
}

export default ProtectedRoute