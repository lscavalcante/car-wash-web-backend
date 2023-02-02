import { CheckCircle, XCircle } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

interface TableProps {
  data: any;
  tableHeaders: any;
  tableBodies: any;
  currentPage: number;
  count: number;
  pageSize?: number;
  onPageChange: (page: number) => void
}

export default function Table({ data, tableHeaders, tableBodies, currentPage, count, onPageChange, pageSize = 10, ...props }: TableProps) {

  const getProperty = (obj: any, prop: any) => {
    var parts = prop.split(".");

    if (Array.isArray(parts)) {
      var last = parts.length > 1 ? parts.pop() : parts;
      var l = parts.length,
        i = 1,
        current = parts[0];

      while ((obj = obj[current]) && i < l) {
        current = parts[i];
        i++;
      }

      if (typeof obj === 'boolean') {
        return obj ?
          <CheckCircle size={28} className="text-green-400" weight="duotone" />
          : <XCircle size={28} className="text-red-400" weight="duotone" />
      }

      if (typeof obj === "object") {
        // return last in obj === true ? obj[last] : null
        return obj?.hasOwnProperty(last) ? obj[last] : null;
      }
      return obj;
    } else {
      throw "parts is not valid array";
    }
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg max-sm:mx-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tableHeaders.map((header: any, index: any) => (
                <th scope="col" className="py-3 px-6" key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((data: any) => (
              <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {tableBodies.map((body: any) =>
                  typeof body === "string"
                    ? (
                      <td className="py-4 px-6" key={body}>{getProperty(data, body)}</td>
                    )
                    : (
                      <td className="py-4 px-6" key={body}>
                        <Link to={`${body.base}/${data[`${body.param}`]}/`}>
                          <div className="font-medium text-nuPurple hover:underline">Edit</div>
                        </Link>
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={count}
        pageSize={pageSize}
        onPageChange={(page: number) => onPageChange(page)}
      />
    </>
  )
}