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

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`, // Reference will be part of the path
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
    };

    https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', async () => {
            const parsedData = JSON.parse(data);

            if (parsedData.status === "success") {
                console.log(parsedData);
                // Optionally, save the payment information into your database
                const order = new Order({
                    paymentReference: parsedData.data.reference,
                    status: 'Paid',
                    totalPrice: parsedData.data.amount / 100, // Convert from kobo to naira
                    // Add more order details as necessary
                });
                await order.save();

                return res.status(200).json({
                    status: "success",
                    message: "Payment verification successful",
                    data: parsedData.data,
                });
            } else {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction verification failed",
                });
            }
        });
    }).on('error', (error) => {
        console.error("Error verifying transaction:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error while verifying transaction.",
        });
    }).end();
};
module.exports = {paystack, verifyPayment}
