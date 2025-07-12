import Pusher from 'pusher';

PUSHER_APP_ID="2021483"
PUSHER_APP_KEY="95b243e9b86aaca1c94b"
PUSHER_APP_SECRET="0ebd337ce5ff2a57ec06"
PUSHER_APP_CLUSTER="eu"
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: 'mt1',
  useTLS: true,
});

await pusher.trigger(`private-user-${userId}`, 'lootbox-opened', {
  message: 'You got a lootbox!',
});
