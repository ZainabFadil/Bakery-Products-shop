const express = require ("express");
const mongoose = require("mongoose"); 
const app = express();

//apply Middlewares  
app.use(express.json());

//connection
async function connect(){
    let connection =  await mongoose.connect('mongodb://localhost:27017');
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
    const staff = new StaffModelModel({
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








//Run Server
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
});