import mongoose, { Schema } from "mongoose";

const rfpSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    item_name: {
        type: String,
        required: [true, "Item Name is required"],
    },
    rfp_no: {
        type: String,
        required: [true, "RFP Number is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    last_date: {
        type: Date,
        required: [true, "Last Date is required"],
        validate: {
            validator: (v) => v instanceof Date && v > new Date(),
            message: "Last Date must be a future date"
        }
    },
    minimum_price: {
        type: Number,
        required: [true, "Minimum price is required"],
        min: [0, "Minimum price cannot be negative"]
    },
    maximum_price: {
        type: Number,
        required: [true, "Maximum price is required"],
        validate: {
            validator: function (v) {
            return v >= this.minimum_price;
            },
            message: "Maximum price must be greater than or equal to minimum price"
        }
    },
    categories: {
        type: [String],
        required: [true, "Categories are required"],
    },
    vendors: {
        type: [String],
        required: [true, "Vendors are required"],
    },
    item_description: {
        type: String,
        required: [true, "Item description is required"],
        validate: {
            validator: (v) => v.trim().length > 0,
            message: "Item description cannot be empty"
        }
    },
}, {
    timestamps: true,
});

const Rfp = mongoose.model("Rfp", rfpSchema);

export default Rfp;