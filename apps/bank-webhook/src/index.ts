import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    const existingStatus = await db.onRampTransaction.findFirst({
        where : {
            token: paymentInformation.token,  // Ensure it's the same token
            status: "Success"
        }
    })

    if(existingStatus?.status === "Success"){
        return res.status(403).json({
            message : "transaction already processed"
        })
    }
    else{
        try {
            await db.$transaction([
    
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            // You can also get this from your DB
                            increment: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    }, 
                    data: {
                        status: "Success",
                    }
                })
            ]);
    
            res.json({
                message: "Captured",
            })
        } catch(e) {
            console.error(e);
            res.status(411).json({
                message: "Error while processing webhook"
            })
        }
    }
})

app.listen(3003);