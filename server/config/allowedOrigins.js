const dotenv = require('dotenv')
dotenv.config()
const allowedOrigins = [
    'https://www.google.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5175',
    'http://localhost:8080',
    process.env.API_URL,
    'https://project-ecom-wgtd.vercel.app'
];
console.log(allowedOrigins)

module.exports = allowedOrigins;