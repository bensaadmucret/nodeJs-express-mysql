const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//const Liste = require('../models/liste');
let connection = require('../database/db');




router.get('/', (req, res) => {
    
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

router.post('/add', (req, res) => {
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



router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    connection.query('SELECT * FROM listes WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('liste/edit', {
                title: 'Modifier une liste',
                id: rows[0].id,
                name: rows[0].name,
                description: rows[0].description,
            })
        } else {
            req.flash('error', 'Erreur lors de la récupération de la liste');
            console.log(err);
        }
    }
    )   
})

router.post('/edit/:id', (req, res) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Le nom de la liste est requis' });
    }
    if (!req.body.description) {
        errors.push({ text: 'La description de la liste est requise' });
    }
    if (errors.length > 0) {
        res.render('liste/edit', {
            errors: errors,
            name: req.body.name,
            description: req.body.description,
        })
    } else {
        let newListe = {
            name: req.body.name,
            description: req.body.description,
        }
        connection.query('UPDATE listes SET ? WHERE id = ?', [newListe, req.params.id], (err, result) => {
            if (!err) {
                req.flash('success', 'Liste modifiée avec succès');
                res.redirect('/liste');

            } else {
                req.flash('error', 'Erreur lors de la modification de la liste');
                console.log(err);
            }
        })
    }
})

  
  



router.get('/delete/:id', (req, res, next) => {
connection.query('DELETE FROM listes WHERE id = ?', [req.params.id], (err, result) => {
        if (!err) {
            req.flash('success', 'Listes supprimée avec succès');
            res.redirect('/liste');

        } else {
            req.flash('error', 'Erreur lors de la suppression de la liste');
            console.log(err);
        }
    })
});

// tasks crud

router.get('/tasks/add', (req, res, next) => {
    res.render('liste/addTask', {
        title: 'Ajouter une tâche',
        name: '',
        description: '',
        date: '',
        liste: '',
    })
})

router.get('/tasks', (req, res, next) => {
    connection.query('SELECT * FROM tasks ORDER BY id desc', (err, rows) => {
        if (!err) {
            req.flash('success', 'Tâche récupérée avec succès');
            res.render('/tasks', { data: rows });
            } else {
                req.flash('error', 'Erreur lors de la récupération des tâches');
                console.log(err);
                }
        })
})
                    


router.get('/tasks/:id', (req, res, next) => {
    connection.query('SELECT * FROM tasks WHERE id_liste = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('/tasks', {
                title: 'Tâches de la liste',
                id: rows[0].id,
                name: rows[0].name,
                description: rows[0].description,
            })
        } else {
            req.flash('error', 'Erreur lors de la récupération des tâches');
            console.log(err);
        }
    }
    )
})

router.post('/tasks/:id', (res, req) => {
    let errors = [];
    if (!req.body.name) {
        errors.push({ text: 'Le nom de la tâche est requis' });
    }
    if (!req.body.description) {
        errors.push({ text: 'La description de la tâche est requise' });
    }
    if (errors.length > 0) {
        res.render('/tasks', {
            errors: errors,
            name: req.body.name,
            description: req.body.description,
        })
    } else {
        let newTask = {
            name: req.body.name,
            description: req.body.description,
            id_liste: req.params.id,
        }
        connection.query('INSERT INTO tasks SET ?', newTask, (err, result) => {
            if (!err) {
                req.flash('success', 'Tâche ajoutée avec succès');
                res.redirect('tasks/' + req.params.id);
            } else {
                req.flash('error', 'Erreur lors de l\'ajout de la tâche');
                console.log(err);
            }
        })
    }
})





        




module.exports = router;

