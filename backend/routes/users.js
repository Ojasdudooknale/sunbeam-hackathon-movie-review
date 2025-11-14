const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//user defined
const pool = require('../utils/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

//test postman
router.get('/test',(req,res)=>{
    res.send("hello")
})

//register user
router.post('/register',async (req,res) => {
    const{firstName,lastName,email,password,mobileNo,birthDate} = req.body;
    const sql = `insert into users(firstName,lastName,email,password,mobileNo,birthDate) values(?,?,?,?,?,?)`
    try{
        const hashPassword = await bcrypt.hash(password,config.saltRounds);

        pool.query(sql,[firstName,lastName,email,hashPassword,mobileNo,birthDate],(error,data)=>{
            res.send(result.createResult(error,data))
        })
    }
    catch(error){
        res.send(result.createResult(error))
    }
})

//login user
router.post('/login', (req,res)=>{
    const { email,password} = req.body
    const sql = `select * from users where email=?`
    pool.query(sql,[email],async (error,data)=>{
        if(data!=''){
            let dbuser = data[0];
            const check = await bcrypt.compare(password,dbuser.password);
            
            if(check){
                const payload={
                    uid:dbuser.id
                }

                const token = jwt.sign(payload,config.secret);
                dbuser.password=undefined
                dbuser={...dbuser,token}

                //send data
                res.send(result.createResult(error,dbuser))
            }
            else
                res.send(result.createResult('Invalid Password'))
        }
        else
            res.send(result.createResult('Invalid Email'))
    })
})

//delete user
router.delete('/delete', (req,res)=>{
    const{email} = req.body;
    const sql = `delete from users where email = ?`
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

//get users
router.get('/allUsers', async(req,res)=>{
    const sql = `select * from users;`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

//get user by email
router.get('/profile', async(req,res)=>{
    const email = req.body
    const sql = `select * from users where email = ?;`
    pool.query(sql,[email],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router