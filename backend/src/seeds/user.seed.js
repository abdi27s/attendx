import mongoose from "mongoose";
import User from "../models/User.js";

export const seedUsers = async () => {
  const count = await User.countDocuments();

  if (count === 0) {
    await User.create({
      fullname: "Sanam Maharjan",
      email: process.env.SEED_ADMIN_EMAIL,
      password: process.env.SEED_ADMIN_PASSWORD, // ⚠️ hash this in real app
      cardno: 1,
      isAdmin: true,
      designation: "owner",
      workdays: [
        { day: "Sunday", startMinutes: 540, endMinutes: 1080 },
        { day: "Monday", startMinutes: 540, endMinutes: 1080 },
        { day: "Tuesday", startMinutes: 540, endMinutes: 1080 },
        { day: "Wednesday", startMinutes: 540, endMinutes: 1080 },
        { day: "Thursday", startMinutes: 540, endMinutes: 1080 },
        { day: "Friday", startMinutes: 540, endMinutes: 1080 },
      ],
      active: true,
    });

    console.log("Admin user seeded");
  } else {
    console.log("Users already exist, skipping seed");
  }
};
