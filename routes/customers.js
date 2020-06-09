const express = require('express');
const {Customer, validate} = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id)
  if (!customer) return res.status(404).json({message: 'Customer with specific ID not found'});
  return res.status(200).send(customer);
});

router.post('/', async (req,res) => {
  const { name, phone, isGold } = req.body;
  const { error } = validate({ name, phone, isGold });
  if (error) return res.status(400).send(error['details'][0].message)

  let customer = new Customer ({
    name,
    phone,
    isGold 
  });
  customer = await customer.save()
  res.status(201).send(customer);
});

router.put('/:id', async (req,res) => {
  const { id } = req.params;
  const { name, phone, isGold } = req.body;
  const { error } = validate({ name, phone, isGold });
  if (error) return res.status(400).send(error['details'][0].message);
  const customer = await Customer.findByIdAndUpdate(id, 
  { 
      name,
      phone, 
      isGold 
  }, { new: true })
  if (!customer) return res.status(404).json({message: 'Customer not Found'});
  return res.status(200).send(customer);
 });
 
router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const customer = await Customer.findByIdAndRemove(id)
  if (!customer) return res.status(404).json({message: 'Customer not Found'}); 
  res.status(204).send(customer);  
 });


module.exports = router;
