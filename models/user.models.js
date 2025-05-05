import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const vendorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message:
        'Password must contain at least one uppercase, one lowercase, one number, one special character and be at least 8 characters long',
    },
  },
  type: {
    type: String,
    enum: ['admin', 'vendor'],
    required: [true, "Type is required"]
  },
  revenue: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d+,)*\d+$/.test(v);
      },
      message: 'Revenue must be a comma-separated list of numbers',
    },
  },
  no_of_employees: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: 'Number of employees must be an integer',
    },
  },
  category: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d+,)*\d+$/.test(v);
      },
      message: 'Category must be a comma-separated list of IDs',
    },
  },
  pancard_no: {
    type: String,
    uppercase: true,
    validate: {
      validator: function (v) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
      },
      message: 'Invalid PAN card format',
    },
  },
  gst_no: {
    type: String,
    uppercase: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v);
      },
      message: 'Invalid GST number format',
    },
  },
  mobile: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Invalid mobile number',
    },
  },
});

// middlewares
vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
})

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("pancard_no")) return next();

  this.pancard_no = await bcrypt.hash(this.pancard_no, 10);
  next();
})

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("gst_no")) return next();

  this.gst_no = await bcrypt.hash(this.gst_no, 10);
  next();
})

// methods
vendorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// access-token
vendorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

// refresh-token
vendorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;