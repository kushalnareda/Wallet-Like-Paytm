const express = require ("express");
const zod = require("zod");
const router = express.Router();
const { User,Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");

//create a schema using zod
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

const updateSchema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.post("/signup", async(req,res)=>{

    //check if valid format
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message : "Email already taken / Incorrect inputs"
        });
    }

    // check if an existing user exist
    const existinguser = await User.findOne({
        username : req.body.username
    });
    //if it does exist send status code 411
    if(existinguser){
        return res.status(409).json({
            message : "Email already taken / Incorrect inputs"
        });
    }

    //if user does not exist 
    //create a new one
    const user = await User.create({
        username : req.body.username,
        password: req.body.password,
        firstName : req.body.firstName,
        lastName: req.body.lastName
    });
    //create user Id
    const userId = user._id;

    // Give the users a random ID for now 
    await Account.create({
        userId,
        balance : 1 + Math.random()*10000
    })

    //create a JWT token with your JWT secret
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    //respond with a 200 status code 
    //and a JWt token to the signed up user
    res.status(200).json({
        message: "User created successfully",
        token : token
    });
    
});

router.post("/signin" , async(req,res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message : "Error while logging in/ Erronius Inputs"
        });
    }
    const user = await User.findOne({
        username : body.username,
        password : body.password
    })
    if (user){
        const token = jwt.sign({
            userId :user._id
        },JWT_SECRET)

        res.status(200).json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message : "Error while logging in"
    })
});

router.put("/" , authMiddleware ,async(req,res)=>{
   // Extract the request body
    const body = req.body;

    // Validate the request body against the updateSchema
    const { success } = updateSchema.safeParse(body);

    // If the validation fails, return an error response
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    // Update the user information based on the request body
    await User.updateOne(
        // Use the request body as the update criteria
        body,
        // Update the user with the ID of the authenticated user
        { id: req.userId }
    );

    // Send a success response
    res.json({
        message: "Update successful"
    });
})

// Route to handle a GET request to '/bulk'
router.get("/bulk", async (req, res) => {
    // Get the value of the 'filter' query parameter or set it to an empty string
    const filter = req.query.filter || "";

    // Use the 'User' model to find users whose first name or last name matches the 'filter' using regex
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } },
            { lastName: { "$regex": filter } }
        ]
    });
    //Regex is used in this code to perform a partial match on 
    //the firstName and lastName fields of the User model.
    // The goal is to find users whose first name or last name 
    //contains a specific substring, which is provided in the filter query parameter.

    // Return a JSON response with an object containing the users' usernames, first names, last names, and IDs
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;