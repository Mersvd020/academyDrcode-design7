// ** React Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardBody, Button, Input, Row, Col } from "reactstrap";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown, Plus } from "react-feather";

import { getDepartments, deleteDepartment } from "../store";
import { useDispatch, useSelector } from "react-redux";

import { columns } from "./columns";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const DepartmentsList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.departments);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این دپارتمان اطمینان دارید؟")) {
      dispatch(deleteDepartment(id));
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.data.length / rowsPerPage));

    return (
      <ReactPaginate
        nextLabel="بعدی"
        breakLabel="..."
        previousLabel="قبلی"
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={
          "pagination react-paginate justify-content-center mt-2"
        }
      />
    );
  };

  return (
    <div className="departments-wrapper">
      <div className="text-center mb-3">
        <h1
          className="text-primary"
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          لیست دپارتمان‌ها
        </h1>
      </div>

      <Card>
        <CardBody>
          <div className="mb-3">
            <Button
              color="primary"
              tag={Link}
              to="/departments/create"
              style={{ borderRadius: "10px", padding: "10px 30px" }}
            >
              <Plus size={16} className="me-50" />
              اضافه کردن دپارتمان
            </Button>
          </div>

          <div className="react-dataTable">
            <DataTable
              noHeader
              pagination
              paginationServer
              paginationComponent={CustomPagination}
              columns={columns(handleDelete)}
              sortIcon={<ChevronDown size={10} />}
              className="react-dataTable"
              data={store.data.slice(
                (currentPage - 1) * rowsPerPage,
                currentPage * rowsPerPage
              )}
              noDataComponent={
                <div className="text-center p-3">هیچ دپارتمانی یافت نشد</div>
              }
              progressPending={store.loading}
              progressComponent={
                <div className="text-center p-3">در حال بارگذاری...</div>
              }
            />
          </div>

          <div className="text-center mt-2">
            <span>
              صفحه {currentPage} از {Math.ceil(store.data.length / rowsPerPage)}
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DepartmentsList;
