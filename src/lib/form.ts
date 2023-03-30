import { IncomingForm, type Fields, type Files } from 'formidable';
import { NextApiRequest } from 'next';

export const parseForm = async (
  request: NextApiRequest,
  fileTypes?: string[]
): Promise<{ fields: Fields; files: Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = new IncomingForm({
      filter: (part) =>
        fileTypes ? fileTypes.includes(part.mimetype || '') : true,
    });
    form.parse(request, function (err, fields, files) {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
