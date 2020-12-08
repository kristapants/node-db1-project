const express = require('express');
const router = express.Router();
const Accounts = require('./accounts-model');

router.get('/', (req, res) => {
    Accounts.get()
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            console.log(error)
        })
});

router.get('/:id', checkForExisting, (req, res) => {
    Accounts.get(req.params.id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            console.log(error)
        })
});

router.post('/post', inputComplete, (req, res) => {
    Accounts.post(req.body)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(() => {
            res.status(500).json({
                message: "There has been an error creating a new account"
            })
        })
})

router.put('/:id', inputComplete, checkForExisting, (req, res) => {
    Accounts.update(req.params.id, req.body)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error updating the account"
            })
        })
})

router.delete('/:id', checkForExisting, (req, res) => {
    Accounts.delete(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "The account has been deleted"
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "There was an error deleting the account"
            })
        })
})



//Middleware 
function inputComplete (req, res, next) {
    if (!req.body.name || !req.body.budget) {
        res.status(400).json({
            errorMessage: "Please provide a budget and name for the account"
        })
    }
    next()
}

function checkForExisting(req, res, next) {
    Accounts.get(req.params.id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: "The account with the specified ID does not exist."
                });
            }
            next()
        })
}

module.exports = router;
