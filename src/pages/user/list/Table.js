import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import SidebarNewUsers from "./Sidebar";
import { fetchUsers } from "../store";
import { columns } from "./columns";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";

const UsersList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.appUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const roleIdMap = {
      admin: 1,
      teacher: 2,
      student: 3,
      all: undefined,
    };
    const currentRoleId = roleIdMap[roleFilter];

    dispatch(
      fetchUsers({
        page: currentPage,
        perPage: rowsPerPage,
        sort,
        sortColumn,
        q: searchTerm,
        roleId: currentRoleId,
      })
    );
  }, [
    dispatch,
    currentPage,
    rowsPerPage,
    sort,
    sortColumn,
    searchTerm,
    roleFilter,
  ]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage - 1}
        onPageChange={handlePagination}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        nextClassName="page-item next"
        nextLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  const handleSort = (column, direction) => {
    setSort(direction);
    setSortColumn(column.sortField);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر نقش‌ها</CardTitle>
        </CardHeader>

        <CardBody>
          <div className="d-flex flex-wrap">
            <Button
              color={roleFilter === "admin" ? "danger" : "secondary"}
              onClick={() =>
                setRoleFilter(roleFilter === "admin" ? "all" : "admin")
              }
              style={{
                width: "140px",
                height: "50px",
                margin: "12px",
                fontSize: "20px",
              }}
            >
              ادمین
            </Button>

            <Button
              color={roleFilter === "teacher" ? "primary" : "secondary"}
              onClick={() =>
                setRoleFilter(roleFilter === "teacher" ? "all" : "teacher")
              }
              style={{
                width: "140px",
                height: "50px",
                margin: "12px",
                fontSize: "20px",
              }}
            >
              استاد
            </Button>

            <Button
              color={roleFilter === "student" ? "success" : "secondary"}
              onClick={() =>
                setRoleFilter(roleFilter === "student" ? "all" : "student")
              }
              style={{
                width: "140px",
                height: "50px",
                margin: "12px",
                fontSize: "20px",
              }}
            >
              دانشجو
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row className="align-items-center mb-3">
            <Col md="3">
              <Button
                color="primary"
                className="add-new-user"
                onClick={toggleSidebar}
                style={{ width: "100%" }}
              >
                افزودن کاربر جدید
              </Button>
            </Col>

            <Col md="5">
              <Input
                placeholder="جستجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          <div  className="react-dataTable mt-3">
            <DataTable 
              noHeader
              pagination
              responsive
              columns={columns}
              data={store.data}
              sortServer
              onSort={handleSort}
              sortIcon={<ChevronDown />}
              paginationComponent={CustomPagination}
              noDataComponent={<div className="p-3">هیچ داده‌ای یافت نشد</div>}
            />
          </div>
        </CardBody>
      </Card>

      <SidebarNewUsers open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  );
};

export default UsersList;
