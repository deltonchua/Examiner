import { readFile, writeFile, utils } from 'xlsx';

export const FileTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
];

export const readExcel = (file: string) => {
  const wb = readFile(file);
  const sheet = wb.SheetNames[0];
  return utils.sheet_to_json(wb.Sheets[sheet], { defval: '' });
};

export const writeExcel = (data: unknown[], filename: string) => {
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(data);
  utils.book_append_sheet(workbook, worksheet);
  writeFile(workbook, filename, { compression: true });
};
