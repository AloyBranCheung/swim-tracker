// app/api/auth/[auth0]/route.js
import { handleAuth } from "@auth0/nextjs-auth0";

// https://auth0.com/docs/quickstart/webapp/nextjs?a=pcbU8tuKH5G6WwoBtwVmB0BzvZcZ6mPp&framed=1&sq=1&theme=light#install-the-auth0-next-js-sdk
export const GET = handleAuth();
