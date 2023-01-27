import express from 'express';
import session from 'express-session';
import user_routes from './routers/user.js';
import admin_product_routes from './routers/admin/products.js';
import forAdmin from './controllers/auth.js'; 
import User from './models/user.js';

const app = express();
const hostname = '127.0.0.1';
const port = 3001;



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'ini adalah kode secret###', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use('/user',user_routes);
app.use('/admin/products',forAdmin, admin_product_routes);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { user:req.session.user||"" });
})
app.get('/create-db', (req, res) => {
    User.sync({force:true});
    res.send('create db');
})
app.get('/forbidden', (req, res) => {
    res.render('forbidden',{ user:req.session.user||"" });
})
app.get('*', (req,res)=> {
    res.redirect('/')
})
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})