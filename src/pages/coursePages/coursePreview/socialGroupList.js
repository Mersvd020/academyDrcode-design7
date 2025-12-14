import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { ChevronDown, Plus, MoreVertical, Edit, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import axios from "axios";
import toast from "react-hot-toast";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const SocialGroupList = ({ courseId }) => {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(groupData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = groupData.slice(offset, offset + itemsPerPage);
  const fetchSocialGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://sepehracademy.liara.run/CourseSocialGroup`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data || [];
      setGroupData(data);
    } catch (error) {
      console.log("social group:", error);
      setError("خطا در دریافت اطلاعات گروه‌های اجتماعی");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialGroups();
  }, [courseId]);


  const handleEdit = (row) => {
    navigate(`/social-group/edit/${row.id}`, { state: { group: row, courseId } });
  };


  const handleDelete = (row) => {
    setSelectedGroup(row);
    setDeleteModal(true);
  };


  const confirmDelete = async () => {
    if (!selectedGroup) return;

    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      
      await axios.delete(
        `https://sepehracademy.liara.run/CourseSocialGroup/${selectedGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("گروه با موفقیت حذف شد");
      setDeleteModal(false);
      setSelectedGroup(null);
      

      fetchSocialGroups();
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("خطا در حذف گروه");
    } finally {
      setDeleting(false);
    }
  };


  const handleAddGroup = () => {
    navigate(`/social-group/add`, { state: { courseId } });
  };
  const columns = [
    {
      name: "نام گروه",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.groupName,
      cell: (row) => {
        return (
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.groupName || "-"}</span>
          </div>
        );
      },
    },
    {
      name: "لینک گروه",
      sortable: true,
      minWidth: "300px",
      selector: (row) => row.groupLink,
      cell: (row) => {
        return (
          <a
            href={row.groupLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {row.groupLink || "-"}
          </a>
        );
      },
    },
    {
      name: "عملیات",
      minWidth: "120px",
      center: true,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className="w-100" onClick={() => handleEdit(row)}>
                  <Edit size={14} className="me-50" />
                  <span className="align-middle">ویرایش</span>
                </DropdownItem>
                <DropdownItem className="w-100" onClick={() => handleDelete(row)}>
                  <Trash size={14} className="me-50" />
                  <span className="align-middle">حذف</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={pageCount || 1}
      breakLabel={"..."}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <>
      <Card>
        <CardHeader tag="h4">لیست گروه های اجتماعی</CardHeader>

        {error && (
          <Alert color="danger" className="mx-2 mt-2">
            {error}
          </Alert>
        )}

        <div className="react-dataTable user-view-account-projects">
          {loading ? (
            <div className="text-center p-3">
              <Spinner color="primary" />
              <p className="mt-2">در حال بارگذاری...</p>
            </div>
          ) : groupData.length === 0 ? (
            <div className="text-center p-3">
              <p className="text-muted">هیچ گروه اجتماعی یافت نشد</p>
            </div>
          ) : (
            <>
              <DataTable
                noHeader
                responsive
                columns={columns}
                data={currentPageData}
                className="react-dataTable"
                sortIcon={<ChevronDown size={10} />}
              />

              {groupData.length > itemsPerPage && (
                <Row className="mx-0">
                  <Col sm="12">
                    <CustomPagination />
                  </Col>
                </Row>
              )}
            </>
          )}
        </div>

        <div className="p-2">
          <Button
            color="primary"
            block
            className="d-flex align-items-center justify-content-center"
            style={{
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={handleAddGroup}
          >
            <Plus size={20} className="me-2" />
            افزودن گروه
          </Button>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} centered>
        <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>
          تأیید حذف
        </ModalHeader>
        <ModalBody>
          آیا از حذف گروه "<strong>{selectedGroup?.groupName}</strong>" اطمینان دارید؟
        </ModalBody>
        <ModalFooter>
          <Button 
            color="danger" 
            onClick={confirmDelete}
            disabled={deleting}
          >
            {deleting ? <Spinner size="sm" /> : "حذف"}
          </Button>
          <Button 
            color="secondary" 
            onClick={() => setDeleteModal(false)}
            disabled={deleting}
          >
            انصراف
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SocialGroupList;