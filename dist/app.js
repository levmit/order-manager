"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const logger_1 = require("./middleware/logger");
const orderController_1 = require("./controllers/orderController");
const app = new koa_1.default();
exports.app = app;
const router = new koa_router_1.default();
// Use body parser middleware
app.use((0, koa_bodyparser_1.default)());
router.get('/order/state', orderController_1.getOrderState);
router.post('/order/transition', orderController_1.transitionOrderState);
app.use(logger_1.logger);
app.use(router.routes());
app.use(router.allowedMethods());
// Start the server only if this file is executed directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
