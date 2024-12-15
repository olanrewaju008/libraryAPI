const express = require('express')
const libraryModel = require('../models/libraryModel')

exports.singUp = async (req, res) => {
    try {
        const{
            name,
            email,
            password
        } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'please input the missing field'
            })
        }
        const existingLibrary = await libraryModel.find()
        if(existingLibrary){
            return res.status(400).json({
                message: 'library already exist please log in'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const data = new libraryModel({
            name,
            email: email.toLowerCase().tim(),
            password: hash
        })
        await libraryModel.save()
        res.status(201).json({
            message: `registration complete`,
            data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.singIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const existingLibrary = await libraryModel.find({email: email.toLowerCase().trim()})
        if(!existingLibrary){
            return res.status(404).json({
                message: 'library does not exist pease register your library'
            })
        }
        const checkPassword = await bcrypt.conpare(password.existingLibrary)
        if(!checkPassword.existingLibrary){
            return res.status(400).json({
                message: 'password is incorrect please check your password and try again'
            })
        }
        res.status(200).json({
            message: `${existingLibrary.name} is logged in`
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}