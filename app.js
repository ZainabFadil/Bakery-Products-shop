const express = require ("express");
const mongoose = require("mongoose"); 
const app = express();
//apply Middlewares  
app.use(express.json());

//connection
async function connect(){
    let connection =  await mongoose.connect('mongodb://localhost:27017/bakery');
    if (!connection) {
    console.log('no connect');
    } else {
    console.log('connected to DB...');
    }
}
connect()


//API
/////////////////////////////////////////////////////////////////////////
//STAFF SChema
//bluePrint of the class
const StaffSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true,
    } ,
    phone : {
        type : String,
        required : true,
    },
    
    salary :{
        type : Number,
        required : true,
    } ,
    job :{
        type : String,
        enum : ['Chashier', 'Chef', 'Waiter'],
    } ,
    shift :{
        type : String,
        enum : ['Day', 'Night'],
    } ,
});
let StaffModel = new mongoose.model("Staff", StaffSchema);
//objects
let worker1 = new StaffModel({
    id: 1,
    name: 'Zainab',
    phone: '3050804060',
    salary: 20000,
    job: 'Chef',
    shift: 'Day'
}).save();
let worker2 = new StaffModel({
    id: 2,
    name: 'Mariam',
    phone: '3050546060',
    salary: 2000,
    job: 'Waiter',
    shift: 'Night',
}).save();
let worker3 = new StaffModel({
    id: 3,
    name: 'Ranim',
    phone: '3054804060',
    salary: 15000,
    job: 'Chashier',
    shift: 'Day'
}).save();
//http verbs
//Get
//Get all staff
app.get('/api/staff', async (req, res) => { 
    try { 
        const staff = await StaffModelModel.find(); 
        res.json(staff); 
    } catch (err) { 
        res.status(500).json("NO workers Yet!!"); 
    } 
});
// get some one in the staff by ID 
app.get("/api/staff/:id",async(req,res)=>{
    try{
        const worker = await StaffModelModel.findOne(
            { id : req.params.id} );
            if(!worker){
                res.status(400).json("NO worker found with that id");
            } else{
                res.json(worker);
            }
    }catch(error){
        res.status(401).json("Error Found In The Server!");
    }
});
//post verb
app.post('/staff', async (req, res) => { 
    const staff = new StaffModel({
        //////question********************
        id: app.length+1,
        name: req.body.name,
        phone: req.body.phone,
        salary: req.body.salary,
        job: req.body.job,
        shift: req.body.shift,
    });
    try{
        const worker = await staff.save();
        res.status(201);
        res.json(worker);
    } catch(err){
        res.status(400);
        res.json(err.message);
    }
});

//update(PUT) verb
app.put('/api/staff/:id', async (req, res) => {
    try 
    {
        const worker = await StaffModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!worker) {
            res.status(404).json("worker with that ID not found");
        } else {
            res.json(worker);
        }
    } catch (error)
    {
        console.error('Error updating that worker:', error);
        res.status(500).json('Error In The Server!');
    }
});

//Delete Method
app.delete('/api/staff/:id', async (req, res) => {
    try {
        const worker = await StaffModel.findOneAndDelete({
             id: req.params.id
        });
        if (!worker) {
            res.status(404).json('That worker not found!');
        } else {
            res.json('Worker Deleted!');
        }
    } catch (error) {
        console.error('Error in deleting that worker:', error);
        res.status(500).json('Server Error!');
    }
});

/////////////////////////////////////////////////////////////////////////
//Product SChema
//product class blueprint
const ProductSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true
    } ,
    productType : {
        type : String,
        enum : ['sugary', 'salty'],
    },
    price :{
        type : Number,
        required : true
    } ,
    discount : Number ,
});
let ProductModel = new mongoose.model("Product", ProductSchema);

//objects
let product1 = new ProductModel({
    id: 1,
    name: 'Donut',
    productType: 'sugary',
    price: 50,
    discount : 0.2,
}).save();
let product2 = new ProductModel({
    id: 2,
    name: 'pizza',
    productType: 'salty',
    price: 200,
    discount : 0.1,
}).save();

//GET all Products
app.get('/api/Product', async (req, res) => { 
    try { 
        const Product = await ProductModel.find(); 
        res.json(Product); 
    } catch (err) { 
    res.status(500).json('product not found!'); 
    } 
}); 
/*app.get('/asyncHandler',async (req, res) => {
    let product = await ProductModel.find();
    res.status(200).json(product);
}
); */


//get specific product
app.get("/api/Product/:id",async(req,res)=>{
    try{
        const product = await ProductModel.findOne({ 
            id : req.params.id
        });
        if(!product){
            res.status(400).json("product not found");
        } else{
            res.json(product);
        }
    }catch(error){
        res.status(401).json("Server Error");
    }
});
//add product
app.post('/Product', async (req, res) => { 
    const product = new ProductModel({
        id: app.length+1,
        name: req.body.name,
        productType: req.body.typeOfProduct,
        price: req.body.price,
        discount: req.body.discount,
    });
    try{
        const productadd = await product.save();
        res.status(201);
        res.json(productadd);
    } catch(err){
        res.status(400);
        res.json(err.message);
    }
});
//update method
app.put('/api/product/:id', async (req, res) => {
    try {
        const ProductUpdate = await ProductModel.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
    );
    if (!ProductUpdate) {
        res.status(404).json('That product not found!');
    } else {
        res.json(ProductUpdate);
    }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json('Error in the server');
    }
});
//delete product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const rmProduct = await ProductModel.findOneAndDelete({ 
            id: req.params.id 
        });
    if (!rmProduct) {
        res.status(404).json('Product not found');
    } else {
        res.json('Product deleted successfully');
    }
    } catch (error) {
        console.error('Error while deleting that product:', error);
        res.status(500).json('Error in the Server!');
    }
});

////////////////////////////////////////////////////////////////////////
//customer Schema 
const customerSchema = new mongoose.Schema({
    id :{
        type :Number,
        required : true,
    } ,
    name :{
        type : String,
        required : true
    } ,
    phone : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
});
let customerModel = new mongoose.model("customer", customerSchema);
//GET all Customers
/*app.get('/api/customer', async (req, res) => { 
    try { 
        const customer = await customerModel.find(); 
        res.json(customer); 
    } catch (err) { 
    res.status(500).json('that customer not found!'); 
    } 
}); */
let customer1 = new customerModel({
    id: 1,
    name: 'ahmed mostafa',
    phone: '0101946156',
    email: "a.mostafa@gmail.com",
}).save();
let customer2 = new customerModel({
    id: 2,
    name: 'ali abnaser',
    phone: '0101946586',
    email: "a.abnaser@gmail.com",
}).save();
/*try { 
    const Product = await ProductModel.find(); 
    res.json(Product); 
} catch (err) { 
    console.error(error);
res.status(500).json('product not found!'); 
} 
}); */
app.get('/api/customer', async (req, res) => {
       try {
           const customer = await customerModel.find();
           res.json(customer);
       } catch (error) {
        
           res.status(500).send('that customer not found!');
       }
   });

//get specific product
app.get("/api/customer/:id",async(req,res)=>{
    try{
        const customer = await customerModel.findOne({ 
            id : req.params.id
        });
        if(!customer){
            res.status(400).json("customer not found");
        } else{
            res.json(customer);
        }
    }catch(error){
        res.status(401).json("Server Error");
    }
});
//(post) add new customer
app.post("/api/customer",async(req,res)=>{
    const customer = new customerModel({
        id: app.length+1,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });
    try{
        const customeradd = await customer.save();
        res.status(201);
        res.json(customeradd);
    } catch(err){
        res.status(401);
        res.json(err.message);
    }
});
//update
app.put("/api/customer/:id",async(req,res)=>{
    try{
        const customeredit = await customerModel.findOneAndUpdate(
            { id : req.params.id},
            req.body,
            {new: true}
        );
        if(!customeredit){
            res.status(400);
            res.json("customer not found");
        }else{
            res.status(200);
            res.json(customeredit);
    }
}catch(err){
    res.status(500);
    res.json(err.message);
    }
});


//Delete
app.delete("/api/customer/:id",async(req,res)=>{
    try{
    const rmCustomer = await customerModel.findOneAndDelete(
            { id: req.params.id},
        )
        if(!rmCustomer){
            res.status(404).json("Customer not found!");
        } else{
            res.status(200).json("Feedback has Deleted");
        } } catch(err){
            console.log("Error while deleting this customer",error);
            res.status(500).json("Error in the server");
        }
});
//Run Server
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
});

