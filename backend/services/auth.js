import bcrypt from "bcryptjs"

import User from "../models/user.js";
import { AlreadyExistError, BadRequestError } from "../utils/appErrors.js";
import { generateToken } from "../utils/generateToken.js";

const signup = async ({ fullName, username, password, confirmPassword, gender }) => {

    if (password !== confirmPassword) throw new BadRequestError("Passwords don't match");

    const user = await User.findOne({ username });

    if (user) throw new AlreadyExistError("Username already exists")

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Unique avatar
    //https://avatar.iran.liara.run/public/boy?username=Scott
    //https://avatar.iran.liara.run/public/girl?username=Maria

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

    await newUser.save();

    const token = generateToken({ userId: newUser._id })

    return { ...newUser._doc, password: "", token }

}


const login = async ({ username, password }) => {

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        throw new BadRequestError("Invalid username or Password")
    }
    const token = generateToken({ userId: user._id });
    return {
        ...user._doc,
        password: "",
        token
    }

}


const authServices = { signup, login }

export default authServices;