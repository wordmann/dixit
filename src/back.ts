import express from 'express';
import path from 'path';

const port = 19609;
const dirname = '/home/public/dixit'

const app = express();

// Serve static files from the ./client directory
app.use(express.static(path.join(dirname, 'client')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
   //palle culo  
});

