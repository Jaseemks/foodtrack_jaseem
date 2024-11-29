const { User } = require("../models/userModel");
// const { generateToken } = require("../utils/token");
// const { handleImageUpload } = require("../utils/imageUpload");


const userSignup = async (req, res, next) => {
    try {
        console.log(req.body);

        const { name,password, phone,profilepic } = req.body;

        let userImageUrl;

        if (!name || !phone || !password) {
            return res.status(400).json({ success: false, message: 'All fields required' });

        }
        const isUserExist = await User.findOne({ phone });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        // if (password !== confirmpassword) {
        //     return res.status(400).json({ message: "Passwords do not match" });
        // }


        //password hashing
        // const saltRounds = 10;
        // const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // if (req.file) {
        //     userImageUrl = await handleImageUpload(req.file.path)
        // }

        const newUser = new User({ name,password, phone,profilepic })
        await newUser.save();

        // const token = generateToken(newUser._id)

        // res.cookie("token", token);
        res.json({ success: true, message: "User created successfully" })

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error || 'internal server error' })

    }
}


const userLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        
        
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ success: false, message: 'all fields required' });
        }
        const isUserExist = await User.findOne({ phone });
        if (!isUserExist) {
            return res.status(400).json({ message: "User does not exist" });
        }
        // if (isUserExist.isDeleted) {
        //     return res.status(400).json({ message: "User not active contact admin" });
        // }
        console.log(isUserExist);
        const isPasswordMatch = (isUserExist.password == password);
        console.log(isPasswordMatch);
        
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid Password' });
        }

        // const token = generateToken(isUserExist._id, isUserExist.role);

        // res.cookie("token", token, {
        //     sameSite: "None",
        //     secure: true,
        //     httpOnly: true,
        // });
        console.log(isUserExist);

        res.json({ success: true, role: isUserExist.role, userId: isUserExist._id, message: "Login successfull" })

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ message: error || 'internal server error' })

    }
}



const userLogout = async (req, res, next) => {
//     try {
//         console.log("Hit logout endpoint");

//         res.clearCookie("token", {
//             sameSite: "None",
//             secure: true,
//             httpOnly: true,
//         });

//         // Verify if the cookie is cleared by checking the request's cookies
//         const cookiesAfterLogout = req.cookies; // Assuming you are using a cookie parsing middleware
//         console.log("Cookies after logout:", cookiesAfterLogout);

//         // Respond to the client
//         res.json({ message: "Logout successful", cookiesAfterLogout });
//         console.log("Logout completed");

//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error' });
//     }
};



const userProfile = async (req, res, next) => {
//     try {
//         const { user } = req;

//         const userData = await User.findOne({ _id: user.id });

//         res.json({ success: true, message: "User data fetched", data: userData });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
// };


// const userDetails = async (req, res, next) => {
//     try {
//         const userId = req.params.id; 
//         console.log(userId, "=========Requested User ID");

//         const userData = await User.findOne({ _id: userId });

//         res.json({ success: true, message: "User data fetched", data: userData });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
//     }
};

const updateUser = async (req, res, next) => {
//     try {

//         const { id } = req.params;

//         const { name, email, password, phone, address, licenceno, role, profilepic } = req.body;

//         let userImageUrl;

//         const isEmailExist = await User.findOne({ email });

//         // password hashing
//         const saltRounds = 20;
//         const hashedPassword = bcrypt.hashSync(password, saltRounds);

//         if (req.file) {
//             userImageUrl = await handleImageUpload(req.file.path)
//         }

//         const updatedUser = await User.findOneAndUpdate({ _id: id }, { name, email, password: hashedPassword, phone, address, role, licenceno, profilepic: userImageUrl }, { new: true, upsert: true })
//         res.status(201).json({ success: true, message: "User updated successfully", data: updatedUser })


//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error || 'internal server error' })

//     }
}


const checkUser = async (req, res, next) => {
//     try {

//         const { user } = req;
//         if (!user) {

//             return res.status(404).json({ success: false, message: "User not exist" });
//         }

//         res.json({ success: true, message: "user Authorized" });

//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({ message: error || 'internal server error' })

//     }
}

const deleteUser = async (req, res, next) => {

//     const { id } = req.params;


//     const userDeleted = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
//     if (!userDeleted) {
//         return res.status(200).json({ success: true, message: "User not exist" })
//     }
//     else {
//         res.status(200).json({ success: true, message: "User deleted successfully" })

//     }

}

const activateUser = async (req, res, next) => {

//     const { id } = req.params;

//     const userDeleted = await User.findByIdAndUpdate(id, { isDeleted: false }, { new: false });
//     if (!userDeleted) {
//         return res.status(200).json({ success: true, message: "user not exist" })
//     }
//     else {
//         res.status(200).json({ success: true, message: "User activated successfully" })

//     }

}


module.exports = { userSignup,userLogout, userLogin, checkUser, userProfile, updateUser, deleteUser, activateUser }