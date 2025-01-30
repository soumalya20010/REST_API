import jwt from 'jsonwebtoken';

const generateToken = () => {
  const payload = { username: 'testuser' }; // Customize the payload as needed
  const secret =  process.env.ACCESS_TOKEN_SECRET; // Use the same secret key as in your .env file
  const options = { expiresIn: '1h' }; // Token expiration time

  if (!secret) {
    console.error('ACCESS_TOKEN_SECRET is not defined in the environment variables');
    return;
  }
  const token = jwt.sign(payload, secret, options);
  console.log('Generated JWT Token:', token);
};

generateToken();