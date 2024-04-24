
//get user details from frontend
// validation of details, important to put validation in backend side
// check if user already exists -username || email
// check if files are their like avatar and coverImage
// if files available, upload on cloudinary, (check if avatar is uploaded because avatar is compulsory)
//create user object to upload on mongoDb (entry creation)
// once user is created we'll get everyhting in response-- so we have to remove refresh token and password from response
//check for user creation, if created then return response else return error.

import {asyncHandler} from "../utils/aysncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"




const registerUser = asyncHandler( async (req, res) =>{
  const {fullName, username, email, password} = req.body

  if(
    [fullName, username, email, password].some((field)=> field?.trim() === "")
  ){
    throw new ApiError(400, "All fields must be filled")
  }

  const existedUser = User.findOne({
    $or: [{ username },{ email }]
  })

  if(existedUser){
    throw new ApiError(409, "User with email or username already exists")
  }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar file is required")
   }

  const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })

  const createdUser =  await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something went wrong while creating the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )





})

export {registerUser}