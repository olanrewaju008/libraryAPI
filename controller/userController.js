const express = require('express')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.singUp = async (req, res) => {
    try {
        const{fullName, email, password}= req.body
        if(!fullName || ! email || !password){
            return res.status(400).json({
                message: 'please input the missing field'
            })
        }
        const existingUser = await userModel.find({email: email.toLowerCase().trim()})
        if(existingUser){
            return res.status(400).json({
                message: 'user already exist please log in'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const data = new userModel({
            fullName: fullName.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: hash
        })

        await userModel.save()
        res.status(201).json({
            message: 'registration is successful',
            data
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const existingUser = await userModel.find({email: email.toLowerCase()})
        if(!existingUser){
            return res.status(404).json({
                message: 'this user does not exist please create an account'
            })
        }
        const checkPassord = await bcrypt.compare(password.existingUser)
        if(!checkPassord.existingUser){
            return res.status(400).json({
                message: 'password is incorrect please check your password'
            })
        }
        res.status(200).json({
            message: `${existingUser.fullName} is loged in`
        })
    } catch (error) {
        res.status(500).json({ 
            error: error.message
        })
    }
}