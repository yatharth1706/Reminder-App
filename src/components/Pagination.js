import React from "react";
import { PaginationItem, PaginationLink, Pagination } from "reactstrap";

function PaginationPage({currRecords, totalRecords}) {
  return (
    <div className="flex justify-between text-sm text-gray-600 mt-10">
      <span>{currRecords} of {totalRecords} Records</span>
      <span>
        <Pagination>
          <PaginationItem>
            <PaginationLink first href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" previous />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" last />
          </PaginationItem>
        </Pagination>
      </span>
    </div>
  );
}

export default PaginationPage;
