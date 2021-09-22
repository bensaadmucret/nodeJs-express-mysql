const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//const Liste = require('../models/liste');
let connection = require('../database/db');




router.get('/', (req, res, next) => {
    
    connection.query('SELECT * FROM listes ORDER BY id desc', (err, rows) => {
        if (!err) {
            req.flash('success', 'Liste récupérée avec succès');
            res.render('liste', { data: rows });
        } else {
            req.flash('error', 'Erreur lors de la récupération des listes');
            console.log(err);
        }
    })   
})


router.get('/add', (req, res, next) => {
    res.render('liste/add', {
        title: 'Ajouter une liste',
        name: '',
        description: '',
        
        
    })
       
})

router.post('/add', (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Le nom de la liste est requis' });
    }
    if (!req.body.description) {
        errors.push({ text: 'La description de la liste est requise' });
    }
    if (errors.length > 0) {
        res.render('liste/add', {
            errors: errors,
            name: req.body.name,
            description: req.body.description,

        })
    } else {
        let newListe = {
            name: req.body.name,
            description: req.body.description,

        }
        connection.query('INSERT INTO listes SET ?', newListe, (err, result) => {
            if (!err) {
                req.flash('success', 'Liste ajoutée avec succès');
                res.redirect('/liste');
            } else {
                req.flash('error', 'Erreur lors de l\'ajout de la liste');
                console.log(err);
            }
        })
    }
})




module.exports = router;

