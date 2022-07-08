import { Router } from 'express';
import axios from 'axios';
import { createClient } from '../cache/cache-driver.js';
// import { createClient } from 'redis';

const router = Router();
const cacheDriver = createClient();
await cacheDriver.connect();

const { CACHE_DEFAULT_EXPIRATION } = process.env;

router.get('/total-de-processos', async (req, res, next) => {
  try {
    const { clienteId } = req.user;

    const key = `totalProcessos_${clienteId}`;

    let responseData = await cacheDriver.get(key);

    if (!responseData) {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1'
      );

      responseData = res.data;

      await cacheDriver.set(key, JSON.stringify(responseData), {
        EX: CACHE_DEFAULT_EXPIRATION
      });
    } else {
      console.log(responseData);
      responseData = JSON.parse(responseData);
    }
    res.json(responseData);
  } catch (error) {
    next(error);
  }
});

router.use((req, res) => {
  res.send('DEU ERRO');
});

export default router;
