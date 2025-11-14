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
                    id:dbuser.id,
                    email:dbuser.email
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
router.get('/allUsers', (req,res)=>{
    const sql = `select * from users;`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

//get user by email
router.get('/profile', (req,res)=>{
    const userId = req.userId 

    if (!userId) {
        return res.send(result.createResult('Unauthorized: Missing user ID from token'));
    }

    const sql = `SELECT firstName, lastName, email, mobileNo, birthDate FROM users WHERE id = ?;`
    pool.query(sql,[userId],(error,data)=>{
         if (error) {
            res.send(result.createResult(error, null));
            return;
        }

        if (data.length > 0) {
            res.send(result.createResult(null, data[0]));
        } else {
            res.send(result.createResult('User not found', null));
        }
    })
})

router.put('/profile/update', async (req, res) => {
    const userId = req.userId; 

    if (!userId) {
        return res.status(401).send(result.createResult('Unauthorized: Missing user ID from token'));
    }
    
    const { firstName, lastName, mobileNo, birthDate } = req.body;

    const sql = `
        UPDATE users 
        SET firstName = ?, lastName = ?, mobileNo = ?, birthDate = ? 
        WHERE id = ?;
    `;
    
    pool.query(
        sql, 
        [firstName, lastName, mobileNo, birthDate, userId], 
        (error, data) => {
            if (error) {
                res.send(result.createResult(error));
                return;
            }

            if (data && data.affectedRows > 0) {
                res.send(result.createResult(null, { message: 'Profile updated successfully' }));
            } else {
                res.send(result.createResult('User not found or no changes made', null));
            }
        }
    );
});


module.exports = router