// https://www.npmjs.com/package/dateformat

import dateFormat, { masks } from "dateformat";

export default function toLocaleDate(data?: string, formatter: string = 'dd/mm/yyyy') {
  if (data === '' || data == undefined) return '';

  return dateFormat(data, formatter);
}