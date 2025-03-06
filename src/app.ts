import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { logger } from "./middleware/logger";
import {
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getAllOrders,
  transitionOrderState,
} from "./controllers/orderController";

const app = new Koa();
const router = new Router();

// Use body parser middleware
app.use(bodyParser());

// Routes
router.post("/orders", createOrder); // Add a new Order
router.get("/orders", getAllOrders); // Get list of all Orders
router.get("/orders/:id", getOrderById); // Get Order by ID
router.put("/orders/:id", updateOrderById); // Update Order by ID
router.delete("/orders/:id", deleteOrderById); // Delete Order by ID
router.post("/orders/:id/transition", transitionOrderState); // Transition Order State

// Middleware
app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

export { app };
