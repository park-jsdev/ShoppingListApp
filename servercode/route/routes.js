var express = require('express');
var router = express.Router();

// import the schema from shoppingItem.js
const Item = require('../model/shoppingItem');

// Route methods called by the frontend

// Retrieve data from db with error check, returns error or items in json format (the json method is from express)
router.get('/items', (req, res, next)=>{
    Item.find(function(err, items){
        if(err){
            res.json(err);
        } else {
            res.json(items);
        }
    })
});

// Add an item into the database
router.post('/item', (req, res, next)=>{
    let new_shopping_item = new Item({
        item_name: req.body.item_name,
        item_quantity: req.body.item_quantity,
        item_bought: req.body.item_bought
    });
    new_shopping_item.save((err, item)=>{
        if(err){
            res.json(err)
        } else {
            res.json({msg: 'Item has been added to db'});
        }
    });
});

// Update data already in database
router.put('/item/:id', (req, res, next)=>{
    // MongoDB provided method
    Item.findOneAndUpdate({_id: req.params.id},{
        $set: {
            item_name: req.body.item_name,
            item_quantity: req.body.item_quantity,
            item_bought: req.body.item_bought
        }
    },
        // Error display is there is any
        function(err, result){
            if(err){
                res.json(err);
            } else {
                res.json(result);
            }
    });
});

// Delete some data in database
router.delete('/item/:id', (req, res, next)=>{
    Item.remove({_id:req.params.id}, function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});



module.exports = router;