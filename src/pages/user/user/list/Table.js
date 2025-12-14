import { Fragment, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { ChevronDown } from "react-feather";
import { fetchUsers } from "../store";
import { columns } from "./columns"; 
import EditUserSidebar from "./EditUserSidebar";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SidebarNewUsers from "./Sidebar";
const axiosInstance = axios.create({
  baseURL: "https://sepehracademy.liara.run/User/", 
  headers: {
    "Content-Type": "application/json",
  },
});

const UsersList = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.appUsers);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); 
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editSidebarOpen, setEditSidebarOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); 

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const roleIdMap = {
    admin: 1,
    teacher: 2,
    student: 3,
    all: undefined,
  };

  
  const getUsers = useCallback(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        perPage: rowsPerPage,
        sort,
        sortColumn,
        q: searchTerm,
        roleId: roleIdMap[roleFilter],
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

  useEffect(() => {
    getUsers(); 
  }, [getUsers]); 

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleSort = (column, direction) => {
    setSort(direction);
    setSortColumn(column.sortField);
  };

  const toggleSidebar = () => {
    
    if (sidebarOpen) {
      setEditUser(null);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return; 
    setDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = async () => {
    try {
      setDeleteLoading(true);
  
      await axios.delete(
        "https://sepehracademy.liara.run/User/DeleteUser",
        {
          data: { userId: selectedUserId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      toast.success("کاربر حذف شد");
      getUsers();         
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error ("شما به این روت دسترسی ندارید درصورت ریکوست مجدد بن میشوید" )
    } finally {
      setDeleteLoading(false);
    }
  };

  
  const handleEditClick = (user) => {
    setEditUser(user); 
    setSidebarOpen(true); 
  };

  const CustomPagination = () => {
    const count = Math.ceil((store.total || 0) / rowsPerPage);

    return (
      <ReactPaginate
        pageCount={count || 1}
        forcePage={currentPage - 1}
        onPageChange={handlePagination}
        previousLabel=""
        nextLabel=""
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item prev"
        nextClassName="page-item next"
        activeClassName="active"
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر نقش‌ها</CardTitle>
        </CardHeader>
        <CardBody className="d-flex flex-wrap gap-1">
          <Button
            color={roleFilter === "admin" ? "danger" : "secondary"}
            onClick={() =>
              setRoleFilter(roleFilter === "admin" ? "all" : "admin")
            }
          >
            ادمین
          </Button>

          <Button
            color={roleFilter === "teacher" ? "primary" : "secondary"}
            onClick={() =>
              setRoleFilter(roleFilter === "teacher" ? "all" : "teacher")
            }
          >
            استاد
          </Button>

          <Button
            color={roleFilter === "student" ? "success" : "secondary"}
            onClick={() =>
              setRoleFilter(roleFilter === "student" ? "all" : "student")
            }
          >
            دانشجو
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row className="mb-2">
            <Col md="3">
              <Button
                color="primary"
                block
                onClick={() => {
                  setEditUser(null); 
                  toggleSidebar();
                }}
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

          <DataTable
            noHeader
            responsive
            pagination
            data={Array.isArray(store.data) ? store.data : []}
            
            columns={columns(openDeleteModal, handleEditClick)}
            sortServer
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            paginationComponent={CustomPagination}
            noDataComponent={<div className="p-3">داده‌ای وجود ندارد</div>}
          />
        </CardBody>
      </Card>

      <Modal isOpen={deleteModal} toggle={closeDeleteModal} centered>
        <ModalHeader toggle={closeDeleteModal}>
          حذف کاربر
        </ModalHeader>
        <ModalBody>
          آیا از حذف این کاربر مطمئن هستید؟
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeDeleteModal} disabled={deleteLoading}>
            انصراف
          </Button>
          <Button
            color="danger"
            onClick={handleDeleteUser}
            disabled={deleteLoading}
          >
            {deleteLoading ? "در حال حذف..." : "حذف"}
          </Button>
        </ModalFooter>
      </Modal>

    
     
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar
  theme="colored"
/>

<SidebarNewUsers
  open={sidebarOpen && !editUser}
  toggleSidebar={toggleSidebar}
/>


<EditUserSidebar
  open={sidebarOpen && !!editUser}
  toggleSidebar={toggleSidebar}
  user={editUser}
  onSuccess={getUsers}
/>
    </Fragment>
  );
};

export default UsersList;