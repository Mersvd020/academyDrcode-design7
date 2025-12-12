import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { columns } from "./columns";

import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

import { Button, Input, Row, Col, Card } from "reactstrap";

import { getAssistanceWork, deleteAssistanceWork } from "../store";
import { useDispatch, useSelector } from "react-redux";

import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
          <Button tag={Link} to="/ostad-yaran/create" color="primary">
            افزودن وظیفه
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">جستجو</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجوی کار"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const OstadYaranFehrest = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.assistanceWork);

  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAssistanceWork());
  }, [dispatch]);

  const handleFilter = (val) => {
    setValue(val);
    setCurrentPage(1);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این مورد اطمینان دارید؟")) {
      dispatch(deleteAssistanceWork(id));
    }
  };

  const dataToRender = () => {
    if (!store.data || store.data.length === 0) {
      return [];
    }

    let filteredData = store.data;

    if (value) {
      filteredData = filteredData.filter((work) => {
        const searchLower = value.toLowerCase();
        const fullName = `${work.assistance?.user?.fName || ""} ${
          work.assistance?.user?.lName || ""
        }`.toLowerCase();
        return (
          work.worktitle?.toLowerCase().includes(searchLower) ||
          work.workDescribe?.toLowerCase().includes(searchLower) ||
          fullName.includes(searchLower)
        );
      });
    }

    return filteredData;
  };

  const CustomPagination = () => {
    const filteredData = dataToRender();
    const count = Number(Math.ceil(filteredData.length / rowsPerPage));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
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
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            subHeader={true}
            columns={columns(handleDelete)}
            responsive={true}
            data={dataToRender().slice(
              (currentPage - 1) * rowsPerPage,
              currentPage * rowsPerPage
            )}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
            progressPending={store.loading}
            progressComponent={
              <div className="text-center p-3">در حال بارگذاری...</div>
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default OstadYaranFehrest;
