import React from "react";
import { PaginationItem, PaginationLink, Pagination } from "reactstrap";

function PaginationPage() {
  return (
    <div className="flex justify-between text-sm text-gray-600 mt-10">
      <span>0 of 0 Records</span>
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
