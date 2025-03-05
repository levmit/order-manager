import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { logger } from './middleware/logger';
import { getOrderState, transitionOrderState } from './controllers/orderController';

const app = new Koa();
const router = new Router();

// Use body parser middleware
app.use(bodyParser());

router.get('/order/state', getOrderState);
router.post('/order/transition', transitionOrderState);

app.use(logger);
app.use(router.routes());
app.use(router.allowedMethods());

// Export the Koa app
export { app };

// Start the server only if this file is executed directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}