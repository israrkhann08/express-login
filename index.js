const express = require('express'); 
const app = express(); 
const port = 3000;  

// Middleware to parse JSON bodies
app.use(express.json());

const users = [{
    "username": "user-0",
    "password": "123456"
}];  

// create User
app.post('/create', (req, res) => {     
    try {         
        let { username, password } = req.body;         
        const userExists = users.find((user) => user.username === username);          

        if (userExists) {             
            return res.status(400).send({  
                response: "User already exists"             
            });         
        }         
        
        users.push({ username, password });  

        return res.status(201).send({  
            message: "successfully created",
            response: {                 
                username,                 
                password             
            }         
        });     

    } catch (error) {      
        console.log(error);  
        return res.status(500).send({  
            error: "Something went wrong"
        });       
    } 
});  

// get all users
app.get('/getUser', (req, res) => {     
    try {
        return res.send({
            response: users,
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message,
        })
    }
});      

app.get('/login',  (req, res) => {
    try {
        const { username, password } = req.query;

        if (!username || !password) {
            return res.status(400).send({
                error: "Username and password are required."
            });
        }


        const user = users.find(user => user.username === username && user.password === password);

        if (!user) {
            return res.status(401).send({
                error: "Invalid username or password."
            });
        }

        return res.status(200).send({
            response: "You successfully logged in."
        });

    } catch (error) {
        return res.status(500).send({
            error: "Something went wrong. Please try again later."
        });
    }
});


app.listen(port, () => {     
    console.log(`app is running on port ${port}`); 
});
