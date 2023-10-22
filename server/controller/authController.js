import { json } from 'express';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import nodemailer from 'nodemailer'
import sendGrid from 'nodemailer-sendgrid-transport';


dotenv.config()

const transport = nodemailer.createTransport(sendGrid({
  auth: {
    api_key: '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'
  }
}))



export const getAuth = (req, res) => {
  res.json({ message: 'Test is working' });
};

// Register Endpoint
export const postRegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the name is entered or not
    if (!name) {
      return res.json({
        error: 'Name is a required field',
      });
    }

    // Check if the password is entered and is valid
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is not valid (should be at least 6 characters)',
      });
    }

    // Check if the email already exists in the database
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({
        error: "Email is already used by another user",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Example email sending
    const emailData = {
      to: 'jimmyptl46"gmail.com',
      from: 'jimmyptl46"gmail.com',
      subject: 'Test Email',
      text: 'This is a test email.'
    };

    transport.sendMail(emailData, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Email sending failed' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });

    return res.json(newUser);

  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

// Login Endpoint
export const postLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found with this email",
      });
    }

    // Check if the password matches the hashed password in the database
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.json({
        error: "Incorrect password",
      });
    }

    // const token = Jwt.sign({
    //   email: user.email,
    //   id: user._id,
    //   name: user.name
    // },
    //   process.env.JWT_SECRET_KEY,
    //   {},
    //   (err, token) => {
    //     if (err) throw err;
    //     res.cookie('token', token).json(user)
    //   }
    // )
    // Successful login
    return res.json({
      message: "Login successful",
      // token: token
    });
  } catch (error) {
    console.log("error in login", error)
  }
};
