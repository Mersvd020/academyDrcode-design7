// ** React Imports
import { useState, useEffect, Fragment } from "react";
import Avatar from "@components/avatar";
// ** Reactstrap Imports
import { Card, CardHeader, Button, Spinner, Alert, Row, Col } from "reactstrap";

// ** Third Party Components
import { ChevronDown, Plus } from "react-feather";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import axios from "axios";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";


import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";


import {
  Eye,
  Send,
  Edit,
  Copy,
  Trash,
  Download,
  MoreVertical,
  BookOpen,
  Calendar,
  DollarSign,
  Save,
  Info,
  PieChart,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  EyeOff,
  Delete,
  CloudOff,
} from "react-feather";


const courseStatusObj = {
  Active: { color: "light-success", icon: CheckCircle },
  Inactive: { color: "light-secondary", icon: EyeOff },
  Expired: { color: "light-danger", icon: Info },
};


const columns = [
  {
    name: "عنوان دسته بندی",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <span className="fw-bolder">{row.title || "-"}</span>
        </div>
      );
    },
  },
  {
    name: "نام دسته بندی",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.describe,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <span className="fw-bolder">{row.describe || "-"}</span>
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "تاریخ انتشار",
    sortField: "insertDate",
    selector: (row) => row.insertDate,
    cell: (row) => {
      const date = new Date(row.insertDate);
      return date.toLocaleDateString("fa-IR");
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "آخرین ابدیت",
    sortField: "updateDate",
    selector: (row) => row.updateDate,
    cell: (row) => {
      const date = new Date(row.updateDate);
      return date.toLocaleDateString("fa-IR");
    },
  },
  {
    sortable: true,
    minWidth: "102px",
    sortField: "isActive",
    name: "وضیعت",
    cell: (row) => {
      let status = "Inactive";
      if (row.active) {
        status = "Active";
      } else {
        status = "Inactive";
      }

      const color = courseStatusObj[status]?.color || "light-secondary";
      const Icon = courseStatusObj[status]?.icon || BookOpen;

      return (
        <Fragment key={`status-${row.id}`}>
          <Avatar
            color={color}
            icon={<Icon size={15} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            <span className="fw-bold">
              وضعیت:{" "}
              {status === "Active"
                ? "فعال"
                : status === "Expired"
                ? "منقضی"
                : "غیرفعال"}
            </span>
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },
];

const SocialGroupList = ({ SelectedNews }) => {

  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(groupData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = groupData.slice(offset, offset + itemsPerPage);

  
  useEffect(() => {
    const fetchSocialGroups = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://sepehracademy.liara.run/News/GetNewsWithCategory/${parseInt(
            SelectedNews?.newsCatregoryId
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data || [];
        setGroupData(data);
        setCurrentPage(0); // ریست کردن به صفحه اول
      } catch (error) {
        console.log("Socialgroup:", error);
        setError("خطا در دریافت اطلاعات");
      } finally {
        setLoading(false);
      }
    };

    if (SelectedNews?.newsCatregoryId) {
      fetchSocialGroups();
    }
  }, [SelectedNews]);


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
    <Card>
      <CardHeader tag="h4">لیست اخبار های مشابه</CardHeader>

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
          onClick={() => console.log("Add Social Group")}
        >
          <Plus size={20} className="me-2" />
          افزودن گروه
        </Button>
      </div>
    </Card>
  );
};

export default SocialGroupList;
