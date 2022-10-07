import React from "react";
import { PaginationItem, PaginationLink, Pagination } from "reactstrap";

function PaginationPage({
  currPage,
  currRecords,
  totalRecords,
  firstPage,
  lastPage,
  decrementPage,
  incrementPage,
}) {
  return (
    <div className="flex justify-between text-sm text-gray-600 mt-10">
      <span>
        {currRecords} of {totalRecords} Records
      </span>
      <span>
        <Pagination>
          <PaginationItem>
            <PaginationLink first onClick={() => firstPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous onClick={() => decrementPage(currPage)} />
          </PaginationItem>
          <PaginationItem active>
            <PaginationLink>{currPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={() => incrementPage(currPage)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => lastPage()} />
          </PaginationItem>
        </Pagination>
      </span>
    </div>
  );
}

export default PaginationPage;
