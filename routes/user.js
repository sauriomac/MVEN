import express from 'express';
const router = express.Router();

import User from '../model/user';

// Hash  password
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/nuevo-usuario', async(req, res) => {

    const body = 
    {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.role
      }

      body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    try {

        const usuarioDB = await User.create(body);
        res.json(usuarioDB);
    }
    catch (error) {
        return res.status(500).json({
            message: 'ocurrio un error',
            error
        })
    }
});

router.put('/usuario/:id', async(req, res) => {

    const id = req.params.id;
    const body = req.body;
  
    try {
      // {new:true} nos devuelve el usuario actualizado
      const usuarioDB = await User.findByIdAndUpdate(id, body, {new: true});
  
      return res.json(usuarioDB);
  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  
  });

module.exports = router;