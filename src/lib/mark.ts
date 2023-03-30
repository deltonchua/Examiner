import { exclude } from './dictionary';
import { ErrorResponse } from './httpHandler';

export type Answers = Record<string, string>;
export type Points = Record<string, number>;
export type Responses = Record<string, unknown>[];
type Keywords = Record<string, string[]>;

const optionalFields = ['NAME', 'ID', 'EMAIL'];

const extractKeywords = (sentence: string) => {
  const kw = sentence
    .match(/\w{2,}/g)
    ?.filter((w) => !exclude.includes(w.toLowerCase()));
  if (!kw || kw.length < 1)
    throw new Error(`No Valid Keyword for Answer: ${sentence}`);
  return Array.from(new Set(kw));
};

export const mark = (
  answers: Answers,
  points: Points,
  responses: Responses
) => {
  try {
    const kws: Keywords = {};
    Object.entries(answers).forEach(([k, v]) => {
      kws[k] = extractKeywords(v);
    });
    return responses.map((r) => {
      const obj: Record<string, unknown> = {};
      optionalFields.forEach((o) => {
        if (r[o]) obj[o] = r[o];
      });
      let total = 0;
      for (const [k, v] of Object.entries(kws)) {
        if (!r[k]) {
          obj[k] = 0;
          continue;
        }
        const point = points[k];
        let match = 0;
        for (const kw of v) {
          if (new RegExp(kw, 'i').test(String(r[k]))) match++;
        }
        const score = Math.round((match / v.length) * point);
        total += score;
        obj[k] = score;
      }
      obj['TOTAL'] = total;
      return obj;
    });
  } catch (err) {
    throw new ErrorResponse(
      400,
      `Invalid Format: ${(err as ErrorResponse)?.message}`
    );
  }
};
