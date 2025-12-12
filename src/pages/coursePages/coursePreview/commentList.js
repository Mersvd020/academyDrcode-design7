// ** React Imports
import { useState, useEffect } from "react";

// ** Reactstrap Imports
import { Card, CardHeader, Badge, Spinner, Alert } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import axios from "axios";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Columns Definition
const columns = [
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.author,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar
            className="me-1"
            color="light-primary"
            content={row.author?.charAt(0) || "U"}
            initials
          />
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.author || "نام نامشخص"}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "عنوان کامنت",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.title,
    cell: (row) => <span>{row.title || "-"}</span>,
  },
  {
    name: "متن کامنت",
    sortable: false,
    minWidth: "300px",
    selector: (row) => row.describe,
    cell: (row) => (
      <div className="text-truncate" style={{ maxWidth: "300px" }}>
        {row.describe || "-"}
      </div>
    ),
  },
  {
    name: "وضعیت کامنت",
    sortable: true,
    minWidth: "150px",
    center: true,
    selector: (row) => row.accept,
    cell: (row) => {
      return (
        <Badge color={row.accept ? "light-success" : "light-warning"} pill>
          {row.accept ? "تایید شده" : "در انتظار تایید"}
        </Badge>
      );
    },
  },
  {
    name: "تاریخ ثبت",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.insertDate,
    cell: (row) => {
      const date = row.insertDate
        ? new Date(row.insertDate).toLocaleDateString("fa-IR")
        : "-";
      return <span>{date}</span>;
    },
  },
];

const CourseCommentsList = ({ courseId }) => {
  // ** States
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ** Fetch Comments Data
  useEffect(() => {
    const fetchComments = async () => {
      if (!courseId) {
        console.log("courseId:", courseId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
      
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://sepehracademy.liara.run/Course/GetCourseCommnets/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setCommentsData(data);
      } catch (error) {
        console.log("commentError:", error);
        setError("خطا در دریافت اطلاعات کامنت‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [courseId]);

  console.log("Comments Data", commentsData);

  return (
    <Card>
      <CardHeader tag="h4">لیست کامنت‌های دوره</CardHeader>

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
        ) : commentsData.length === 0 ? (
          <div className="text-center p-3">
            <p className="text-muted">هیچ کامنتی یافت نشد</p>
          </div>
        ) : (
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={commentsData}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        )}
      </div>
    </Card>
  );
};

export default CourseCommentsList;
