import { Hono } from 'hono';
import { handle } from '@hono/node-server/vercel';

const app = new Hono().basePath('/api');

// CORS middleware function
const corsMiddleware = (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (c.req.method === 'OPTIONS') {
    c.res.status = 204; // No Content
    return c.json({});
  }

  return next();
};

app.get('/', (c) => {
  // Retrieve IP address and user-agent

  const userAgent = c.req.headers.get('user-agent'); // Access user-agent header
console.log(c);
  // Prepare response data
  const response = {
    message: 'IP services Working CoolieWale',
   IP: c.ip|| c.req.headers.get('x-real-ip')||c.req.headers.get('x-forwarded-for')||c.req.headers.get('x-vercel-forwarded-for'),
    VERCEL_latitude: c.req.headers.get('x-vercel-ip-latitude'),
    VERCEL_longitude: c.req.headers.get('x-vercel-ip-longitude'),
    VERCEL_city: c.req.headers.get('x-vercel-ip-city'),
    VERCEL_region: c.req.headers.get('x-vercel-ip-country-region'),
   VERCEL_country: c.req.headers.get('x-vercel-ip-country'),
   UA: userAgent,
    date_time: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  };

  // Use c.json to send the data as JSON
  return c.json(response);
});

app.post('/', async (c) => {
  const input = await c.req.json();
  return c.json(input);
});

export default handle(app);
