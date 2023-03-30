import { tmpdir } from 'os';
import { join, extname, basename } from 'path';
import { existsSync, readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { send } from '@/lib/httpHandler';
import { FileTypes } from '@/lib/excel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    send({ res, status: 405, error: 'Method Not Allowed' });
    return;
  }
  const filename = basename(String(req.query.q));
  if (extname(filename) !== '.xlsx') {
    send({ res, status: 400, error: 'Invalid Filename.' });
    return;
  }
  const filepath = join(tmpdir(), filename);
  if (!existsSync(filepath)) {
    send({ res, status: 404, error: 'File Not Found.' });
    return;
  }
  const file = readFileSync(filepath);
  res.writeHead(200, {
    'Content-Type': FileTypes[0],
    'Content-Disposition': `attachment; filename=${filename}`,
  });
  res.end(file);
}
