const express = require("express");
const { authMiddleware } = require("../middleware");
const router = express.Router();
const {Account} = require("../db");
const { default: mongoose } = require('mongoose');
// Route to get the balance of the current user
router.get("/balance", authMiddleware, async(req,res)=>{
    // Find the account based on the userId stored in the request
    const account = await Account.findOne({
        userId: req.userId
    });

    // Return the balance of the account
    res.json({
        balance : account.balance
    });
});

// Route to transfer funds from the current user's account to another account
router.post("/transfer", authMiddleware, async(req,res)=>{
    const { amount, to} = req.body;

    // Check if 'to' and 'amount' are present in the request body
    if (!to || !amount) {
        return res.status(400).json({
            message: "Missing 'to' or 'amount' in request body"
        });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
    
        // Find the account of the recipient (to)
        const account = await Account.findOne({
            userId: to
        }).session(session);

        // Check if the recipient account exists and has enough balance
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid balance"
            });
        }
        
        // Find the account of the sender (req.userId)
        const toAccount = await Account.findOne({
            userId: req.userId
        }).session(session);

        // Check if the sender account exists
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Update the sender's account balance by subtracting the transfer amount
        await Account.updateOne({
            userId : req.userId
        },{
            $inc: {
                balance : -amount
            }
        }).session(session);

        // Update the recipient's account balance by adding the transfer amount
        await Account.updateOne({
            userId : to
        },{
            $inc: {
                balance : amount
            }
        }).session(session);

        // Commit the transaction if everything is successful
        await session.commitTransaction();

        // Return success message
        res.status(200).json({
            message: "Transfer successful"
        });
    } catch (error) {
        // Rollback the transaction and handle errors
        await session.abortTransaction();
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    } finally {
        // End the session
        session.endSession();
    }
});

module.exports = router;
