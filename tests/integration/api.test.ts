import request from "supertest";
import { app } from "../../src/app";
import { Order } from "../../src/models/Order";

describe("Order API", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(async () => {
    await Order.deleteMany({}); // Clean up the database
    server.close();
  });

  it("should create a new order", async () => {
    const res = await request(server)
      .post("/orders")
      .send({ customerName: "John Doe", product: "Laptop", quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body.customerName).toBe("John Doe");
    expect(res.body.product).toBe("Laptop");
    expect(res.body.quantity).toBe(1);
    expect(res.body.state).toBe("created");
  });

  it("should get all orders", async () => {
    const res = await request(server).get("/orders");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get an order by ID", async () => {
    const order = await Order.create({
      customerName: "Jane Doe",
      product: "Phone",
      quantity: 2,
      state: "created",
    });
    const res = await request(server).get(`/orders/${order._id}`);
    expect(res.status).toBe(200);
    expect(res.body.customerName).toBe("Jane Doe");
  });

  it("should update an order by ID", async () => {
    const order = await Order.create({
      customerName: "Alice",
      product: "Tablet",
      quantity: 3,
      state: "created",
    });
    const res = await request(server)
      .put(`/orders/${order._id}`)
      .send({ customerName: "Alice Smith" });
    expect(res.status).toBe(200);
    expect(res.body.customerName).toBe("Alice Smith");
  });

  it("should delete an order by ID", async () => {
    const order = await Order.create({
      customerName: "Bob",
      product: "Monitor",
      quantity: 1,
      state: "created",
    });
    const res = await request(server).delete(`/orders/${order._id}`);
    expect(res.status).toBe(204);
  });

  it("should transition the order state", async () => {
    const order = await Order.create({
      customerName: "Charlie",
      product: "Keyboard",
      quantity: 2,
      state: "created",
    });
    const res = await request(server)
      .post(`/orders/${order._id}/transition`)
      .send({ event: "CONFIRM" });
    expect(res.status).toBe(200);
    expect(res.body.state).toBe("confirmed");
  });
});
