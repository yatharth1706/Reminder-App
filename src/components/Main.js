import React from "react";
import { Table } from "reactstrap";
import Filters from "./Filters";
import Pagination from "./Pagination";

function Main() {
  return (
    <div className="bg-white drop-shadow-2xl rounded-md w-5/6 h-96 p-8">
      {/* Filters */}
      <Filters />
      <Table bordered className="mt-6">
        <thead>
          <tr className="text-gray-700">
            <th>Name</th>
            <th>Scheduled On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      <div className="text-center text-sm text-gray-600">
        <span>No reminders found</span>
      </div>
      <Pagination />
    </div>
  );
}

export default Main;
