const express = require('express')
const libraryModel = require('../models/libraryModel')

exports.singUp = async (req, res) => {
    try {
        const{
            name,
            email
        } = req.body
        if(!name || !email){
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
        const data = new libraryModel({
            name,
            email: email.toLowerCase().tim(),
        })
        await libraryModel.save()
        res.status(201).json({
            message: `registration complete`
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
            email
        } = req.body
        const existingLibrary = await libraryModel.find({email: email.toLowerCase().trim()})
        if(!existingLibrary){
            return res.status(404).json({
                message: 'library does not exist pease register your library'
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