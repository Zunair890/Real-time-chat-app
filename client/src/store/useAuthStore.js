import {create} from "zustand";
import { axiosInstance, } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
            const response= await axiosInstance.get("/auth/check");
            set({authUser:response.data})
        } catch (error) {
            console.log("error in checkAuth",error);
            set({authUser:null});
        }
            finally{
                set({isCheckingAuth:false})
            }
    },

    signup: async(data)=>{
        set({isSigningUp:true});
        try{
            const res= await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("account created sucessfully");
             

        }
        catch(error){
        toast.error(error.data.message);

        }
        finally{
            set({isSigningUp:false})
        }
    }
     ,
    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
              toast.success("Logged out successfully!")
        } catch (error) {
            toast.error(error.message)
        }
    }

      ,
    login: async(data)=>{
       set({isLoggingIn:true});
       try {
        const res= await axiosInstance.post("/auth/login",data);
        set({authUser:res.data});
        toast.success("Logged in successfully!")
       } catch (error) {
        toast.error(error.message);

       }
       finally{
        set({isLoggingIn:false});
       }
    },

    updateProfile:async(data)=>{
      set({isUpdatingProfile:true});
      try {
        const res= await axiosInstance.put("/auth/update-profile",data);
        set({authUser:res.data});
        toast.success("Profile image uploaded!")
      } catch (error) {
        console.log("Error in update profileee:",error);
        toast.error(error?.response?.data?.message || "Error updating profile");
      }
      finally{
        set({isUpdatingProfile:false})
      }
    }
}))