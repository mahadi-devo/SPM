const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoConnect = require('./config/db');

// env config
dotenv.config({ path: './backend/config/.env' });

// DB Connection
mongoConnect();

// Routes
const auth = require('./routes/auth.route');



const app = express();

// Body Parser
app.use(express.json());


// CORS
app.use(cors());

// Mount routes
app.use('/api/v1/auth', auth);

const dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(dirname, 'frontend/build')))
//
// 	app.get('*', (req, res) =>
// 		res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
// 	)
// } else {
// 	app.get('/', (req, res) => {
// 		res.send('API is running....')
// 	})
// }

// Static Files
app.use(express.static('public'));

// morgan http
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
	// process.exit(1);
});
