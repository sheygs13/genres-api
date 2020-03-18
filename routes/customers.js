const express = require('express');
const {Customer, validate} = require('../models/customer');
const router = express.Router();

router.get('/', (req, res) => {
  Customer.find()
  .then(
    customers => res.status(200).send(customers)
  )
  .catch(
    error => res.status(400).json({message: error.message})
  )
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  Customer.findById(id)
       .then(
         (customer) => {
          if (!customer) { 
            return res.status(404).json({message: 'Customer with specific ID not found'});
          }  
          return res.status(200).send(customer);
         }
       )
       .catch(
         error => res.status(400).send(error.message)
       )
});

router.post('/', (req,res) => {
 const { name, phone, isGold } = req.body;
 const { error } = validate({ name, phone, isGold });
 if (error) return res.status(400).send(error['details'][0].message)

 const customer = new Customer ({
   name,
   phone,
   isGold 
 });
 customer.save()
      .then(
        (customer) => res.status(201).send(customer)
      )
      .catch(
        error => res.status(400).send(error.message)
      )

});

router.put('/:id', (req,res) => {
 const { id } = req.params;
 const { name, phone, isGold } = req.body;
 const { error } = validate({ name, phone, isGold });
 if (error) return res.status(400).send(error['details'][0].message);
 Customer.findByIdAndUpdate(id, 
    { 
     name,
     phone, 
     isGold 
    }, 
    { new: true }
    ).then(
           (customer) => {
            if (!customer){
              return res.status(404).json({message: 'Customer not Found'});
            }  
            return res.status(200).send(customer);
           } 
         )
         .catch(
          error => res.status(400).send(error.message)
         )
 });
 
 router.delete('/:id', (req,res) => {
  const { id } = req.params;
  Customer.findByIdAndRemove(id)
      .then(
        (customer) => {
          if (!customer){
           return res.status(404).json({message: 'Customer not Found'});
          }  
          res.status(204).send(customer);
        }
      )
      .catch(
        error => res.status(400).send(error.message)
      )
  
 });


module.exports = router;