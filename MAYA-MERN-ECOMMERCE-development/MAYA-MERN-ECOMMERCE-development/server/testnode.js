const mongoose = require('mongoose');

const mongoDBUrl = "mongodb+srv://Maya:mayar@cluster0.vlzkm3t.mongodb.net/MERN-ECOMMERCE?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true";

mongoose.connect(mongoDBUrl)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => console.error('❌ Connection failed:', err));