import { send } from '@/lib/httpHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    send({ res, status: 405, error: 'Method Not Allowed' });
    return;
  }
  send({ res, data: 'OK' });
}
