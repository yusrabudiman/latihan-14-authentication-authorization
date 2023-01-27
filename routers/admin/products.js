import express from 'express';
import Product from '../../models/products.js';


const router = express.Router();

router.get('/', (req, res) => {
    Product.findAll().then((results) => {
        res.render('admin/products/index', { products: results, users:req.session.users||"" });
    });
})

router.get('/create', (req, res) => {
    res.render('admin/products/create', { user:req.session.user||"" });
})

router.get('/edit/:id', (req, res) => {
    Product.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('admin/products/edit', { products: results, user:req.session.user||"" });
    })
})

router.post('/api/products', (req, res) => {
    Product.create({ name: req.body.name, price: req.body.price }    
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

router.put('/api/products/:id', (req, res) => {
    Product.update({ name: req.body.name, price: req.body.price }, { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

router.delete('/api/products/:id', (req, res) => {
    Product.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

export default router;