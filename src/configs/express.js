const express = require('express');
const path = require('path')

module.exports = async (app) => {

    // Parser Body
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    // Custom Response Format
    app.use(require('../configs/responseFormat'))
}