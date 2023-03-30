import { tmpdir } from 'os';
import { join } from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type File } from 'formidable';
import { FileTypes, readExcel, writeExcel } from '@/lib/excel';
import { parseForm } from '@/lib/form';
import { ErrorResponse, send } from '@/lib/httpHandler';
import { Answers, mark, Points, Responses } from '@/lib/mark';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    send({ res, status: 405, error: 'Method Not Allowed' });
    return;
  }
  try {
    const { files } = await parseForm(req, FileTypes);
    const template = files['template'] as File;
    const answers = files['answers'] as File;
    if (!template || !answers)
      throw new ErrorResponse(400, 'Invalid File Types');
    const [ans, pts] = readExcel(template.filepath) as [Answers, Points];
    const responses = readExcel(answers.filepath) as Responses;
    const results = mark(ans, pts, responses);
    const filename = `Results_${Date.now()}.xlsx`;
    writeExcel(results, join(tmpdir(), filename));
    send({ res, data: { results, filename } });
  } catch (err) {
    console.error(err);
    send({
      res,
      status: (err as ErrorResponse)?.httpCode || 500,
      error: (err as ErrorResponse)?.message || 'Internal Server Error',
    });
  }
}
