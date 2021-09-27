const express = require('express');
const router = express.Router();


let connection = require('../database/db');




router.get('/add', (req, res, next) => {

    connection.query('SELECT * FROM listes ORDER BY id desc', (err, rows) => {
        if (!err) {
            req.flash('success', 'Liste récupérée avec succès');
            res.render('tasks/add', { data: rows });
        } else {
            req.flash('error', 'Erreur lors de la récupération des listes');
            console.log(err);
        }
    })   
});

router.post('/add', (req, res, next) => {
    let data = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        status: req.body.status
    };

    connection.query('INSERT INTO listes SET ?', data, (err, rows) => {
        if (!err) {
            req.flash('success', 'Liste ajoutée avec succès');
            res.redirect('tasks');
        } else {
            req.flash('error', 'Erreur lors de l\'ajout de la liste');
            console.log(err);
        }
    })
});




router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM tasks ORDER BY id desc', (err, rows) => {
        if (!err) {
            req.flash('success', 'Tâche récupérée avec succès');
            res.render('tasks', { data: rows });
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

