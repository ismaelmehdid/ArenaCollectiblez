import 'server-only';
import Pusher from 'pusher';

const APP_ID = process.env.PUSHER_APP_ID;
const KEY = process.env.PUSHER_APP_KEY;
const SECRET = process.env.PUSHER_APP_SECRET;
const CLUSTER = process.env.PUSHER_APP_CLUSTER;

if (!APP_ID || !KEY || !SECRET || !CLUSTER) {
  throw new Error('Pusher configuration is not set properly');
}

export const pusher = new Pusher({
  appId: APP_ID,
  key: KEY,
  secret: SECRET,
  cluster: CLUSTER,
  useTLS: true,
});
