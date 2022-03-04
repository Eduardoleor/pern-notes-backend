// TDOO: Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// TODO: Routes
const taskRoutes = require('./routes/tasks.routes');

// TODO: App Config
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// TODO: Handle Routes
app.use(taskRoutes);

// TODO: Listen App
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    })
});

app.listen(3000);
console.log('Server on port 3000');