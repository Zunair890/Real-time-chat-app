import messageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";

export const getUsersForSidebar= async(req,res)=>{
 
   // fetch all the login user but not ourselves

   try {
    const loggedInUserId= req.user._id;
    const filteredUsers= await UserModel.find({
         _id:{$ne:loggedInUserId}
    })

    res.status(200).json(filteredUsers);

   } catch (error) {
    console.log("Error in getUsersforsidebar controller",error.message);
    res.status(500).json({
        message:"Internal server error"
    })
   }


}

export const getMessages =async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId= req.user._id;
        const messages= await messageModel.find({
           $or:[
            {senderId:myId,  receiverId:userToChatId},
            {senderId:userToChatId,   receiverId: myId}
        ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        res.status(500).json({
            message:"Internal server"
        })
    }
}


export const sendMessage= async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId= req.user._id;
        let imageUrl;

        if(image){
            // upload the base64 image to cloudinary
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
        }

       const newMessage= new messageModel({
        senderId,
        receiverId,
        text,
        image:imageUrl
       })

       await newMessage.save();

       // TODO: real-time functionality using "socket.io"


       res.status(201).json(newMessage);

    }  catch (error) {
        console.log("Error in sendMessages controller",error.message);
        res.status(500).json({
            message:"Internal server"
        })
    }
}