import { connectDB } from "../src/config/db";
import { Order } from "../src/models/Order";

const initDB = async () => {
  await connectDB();

  // Create an initial order if none exists
  const order = await Order.findOne();
  if (!order) {
    await Order.create({ state: "created" });
    console.log("Initial order created in MongoDB");
  } else {
    console.log("Order already exists in MongoDB:", order);
  }

  process.exit(0);
};

initDB();
