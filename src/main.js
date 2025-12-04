import express from "express";
import { router } from "./route/api.js";
import { errorMiddleware } from "./middleware/error-middleware.js"

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.get('/api', (req, res) => {
    res.send('Welcome!')
})

app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})