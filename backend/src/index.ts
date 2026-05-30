import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import { errorHandler } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(
	cors({
		origin: (process.env.CORS_ORIGIN || "http://localhost:3001").split(","),
		credentials: true,
	}),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);

// TODO: Add routes
// app.use('/api/cards', cardRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`✓ Server running on http://localhost:${PORT}`);
	console.log(`✓ Environment: ${process.env.NODE_ENV}`);
});

export default app;
