import Rfp from "../models/rfp.models.js"

export const createRFP = async (req, res) => {
    const { owner, item_name, rfp_no, quantity, last_date, minimum_price, maximum_price, categories, vendors, item_description } = req.body

    console.log(req.body);

    try {
        await Rfp.create({ owner, item_name, rfp_no, quantity, last_date, minimum_price, maximum_price, categories, vendors, item_description })
        return res.status(200).json({
            response: "success"
        })
    } catch (error) {
        console.log(error);
        if(error.name === "ValidationError" ) {
            const ValidationError = Object.values(error.errors).map(err => err.message)

            console.log(ValidationError);
            return res.status(200).json({
                response: "error",
                error: ValidationError
            })
        }

        return res.status(400).json({
            response: "error",
            error: [error]
        })
    }
}

export const allRFP = async (req, res) => {
    const { user_id } = req.body;
    try {
        const rfps = await Rfp.find({ owner: user_id })
        console.log(rfps);
        return res.status(200).json({
            response: "success",
            allrfp: rfps
        })
    } catch (error) {
        console.log("Error: ", error)
        return res.status(400).json({
            response: "error",
        })
    }
}