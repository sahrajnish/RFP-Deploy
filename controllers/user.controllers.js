import Vendor from "../models/user.models.js";

export const handleRegisterUser = async (req, res) => {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const type = 'admin';

    console.log(firstname, lastname, email, password, confirmpassword)
    
    try {
        const userExist = await Vendor.findOne({ email });

        if(userExist) {
            return res.status(200).json({
                response: "error",
                error: ["User already exists."]
            })
        }

        if(password != confirmpassword) {
            return res.status(200).json({
                response: "error",
                error: ["Confirm password does not match password"]
            })
        }

        const newUser = await Vendor.create({ firstname, lastname, email, password, type });
        return res.status(200).json({
            response: "success"
        })
        
    } catch (error) {
        if(error.name == "ValidationError") {
            const validatorError = Object.values(error.errors).map(err => err.message);

            console.log(validatorError);

            return res.status(200).json({
                response: "error",
                error: validatorError
            })
        }

        return res.status(200).json({
            response: "error",
            error: [error]
        })
    }
}

export const handleRegisterUserAsVendor = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword, no_of_employees, gst_no, revenue, pancard_no, mobile, category } = req.body;
    const type = "vendor";

    try {
        const userExist = await Vendor.findOne({ email });

        if(password != confirmPassword) {
            return res.status(200).json({
                response: "error",
                error: ["Confirm password does not match password"]
            })
        }

        if(userExist && userExist.type === 'vendor') {
            return res.status(200).json({
                response: "error",
                error: ["User already exists."]
            })
        }

        if(userExist && userExist.type === 'admin') {
            userExist.firstname = firstname;
            userExist.lastname = lastname;
            userExist.password = password;
            userExist.type = "vendor";
            userExist.no_of_employees = no_of_employees;
            userExist.gst_no = gst_no;
            userExist.revenue = revenue;
            userExist.pancard_no = pancard_no;
            userExist.mobile = mobile;
            userExist.category = category;

            await userExist.save();

            return res.status(200).json({
                response: "success"
            })
        }

        await Vendor.create({ firstname, lastname, email, password, type, no_of_employees, gst_no, revenue, pancard_no, mobile, category });
        return res.status(200).json({
            response: "success"
        })
    } catch (error) {
        console.log(error);
        if(error.name == "ValidationError") {
            const validatorError = Object.values(error.errors).map(err => err.message);

            console.log(validatorError);

            return res.status(200).json({
                response: "error",
                error: validatorError
            })
        }

        return res.status(200).json({
            response: "error",
            error: [error]
        })
    }
}

export const handleLoginUser = async (req, res) => {
    const { email, password } = req.body;

    function checkEmail(v) {
        return /^\S+@\S+\.\S+$/.test(v);
    }

    try {
        if(!email) {
            return res.status(200).json({
                response: "error",
                error: ["Email is required"]
            })
        }
        
        if(!checkEmail(email)) {
            return res.status(200).json({
                response: "error",
                error: ["Invalid email format"]
            })
        }

        if(!password) {
            return res.status(200).json({
                response: "error",
                error: ["Password is required"]
            })
        }

        const user = await Vendor.findOne({ email });
    
        if(!user) {
            return res.status(404).json({
                response: "error",
                error: ["User not registered"]
            })
        }

        const passwordCheck = await user.isPasswordCorrect(password);
        if(!passwordCheck) {
            return res.status(200).json({
                response: "error",
                error: ["Invalid credentials"]
            })
        }
    
        return res.status(200).json({
            response: "success",
            user_id: user._id,
            type: user.type,
            name: user.firstname + " " + user.lastname,
            email: user.email
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}