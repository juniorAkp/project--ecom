const https = require('https')

const Order = require('../model/order')
const paystack = (req,res)=>{
  const params = JSON.stringify({
    "email": req.query.email,
    "amount": (req.query.amount)
})
const options = {
    hostname: 'api.paystack.co',
    port:443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        'Content-Type': 'application/json'
    }
}

const reqpaystack = https.request(options, respaystack => {
    let data = ''

    respaystack.on('data', (chunk) => {
        data += chunk
    });

    respaystack.on('end', () => {
        res.send(data)
        console.log(JSON.parse(data))
    })
}).on('error', error => {
    console.error(error)
})
reqpaystack.write(params)
reqpaystack.end()
}


// Verify Paystack Transaction
const verifyPayment = async (req, res) => {
    const { reference } = req.query;

    if (!reference) {
        return res.status(400).json({ message: "Reference parameter is required." });
    }

    try {
        // Send a GET request to Paystack's verify endpoint
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
            },
        });
        if (response.data.status === "success") {
            console.log(response.data)
            // Optionally, you can store the transaction details in your database or finalize the order here
            return res.status(200).json({
                status: "success",
                message: "Payment verification successful",
                data: response.data.data,
            });

        } else {
            return res.status(400).json({
                status: "error",
                message: "Transaction verification failed",
            });
        }
    } catch (error) {
        console.error("Error verifying transaction:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while verifying transaction.",
        });
    }
}
module.exports = {paystack, verifyPayment}
