import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const workdaySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },

    // stored as minutes for safe comparison (09:00 = 540)
    startMinutes: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
    },

    endMinutes: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
    },
  },
  { _id: false },
);

const userSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    cardno: { type: Number, required: true, unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    designation: {
      type: String,
      enum: [
        "manager",
        "cashier",
        "Salesperson",
        "accountant",
        "bookkeeping",
        "owner",
        "cleaner",
      ],
      required: true,
    },
    workdays: [workdaySchema],
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = new mongoose.model("User", userSchema);

export default User;
