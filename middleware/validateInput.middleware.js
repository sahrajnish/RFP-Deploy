export const validateInput = (req, res, next) => {
    const { firstname, lastname, email, password, confirmPassword, no_of_employees, gst_no, revenue, pancard_no, mobile, category } = req.body;
    
    if(!firstname) {
        return res.status(200).json({
            response: "error",
            error: ["First Name is required"]
        })
    }

    if(!lastname) {
        return res.status(200).json({
            response: "error",
            error: ["Last Name is required"]
        })
    }

    if(!email) {
        return res.status(200).json({
            response: "error",
            error: ["Email is required"]
        })
    }

    if(!password) {
        return res.status(200).json({
            response: "error",
            error: ["Password is required"]
        })
    }

    if(!confirmPassword) {
        return res.status(200).json({
            response: "error",
            error: ["Confirm password is required"]
        })
    }

    if(!no_of_employees) {
        return res.status(200).json({
            response: "error",
            error: ["Number of employees is required"]
        })
    }

    if(!gst_no) {
        return res.status(200).json({
            response: "error",
            error: ["GST number is required"]
        })
    }

    if(!revenue) {
        return res.status(200).json({
            response: "error",
            error: ["Revenue is required"]
        })
    }

    if(!pancard_no) {
        return res.status(200).json({
            response: "error",
            error: ["Pan Card number is required"]
        })
    }

    if(!mobile) {
        return res.status(200).json({
            response: "error",
            error: ["Mobile number is required"]
        })
    }

    if(!category) {
        return res.status(200).json({
            response: "error",
            error: ["Category is required"]
        })
    }

    next();
}