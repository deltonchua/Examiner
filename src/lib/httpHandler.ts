import type { NextApiResponse } from 'next';

export class ErrorResponse extends Error {
  httpCode: number;

  constructor(httpCode: number, message: string) {
    super(message);
    this.httpCode = httpCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

interface Payload {
  res: NextApiResponse;
  status?: number;
  data?: unknown;
  error?: string | null;
}

export const send = ({
  res,
  status = 200,
  data = null,
  error = null,
}: Payload) => {
  res.status(status).json({ timestamp: Date.now(), data, error });
};
