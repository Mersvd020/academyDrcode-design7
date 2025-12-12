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

const columns = [
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.author,
    cell: (row) => {
      const NameInfo =
        row.user.fname || row.user.lname
          ? row.user?.fname + " " + row.user?.lname
          : "نام نامشخص";
      return (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar
            className="me-1"
            color="light-primary"
            content={row.author?.charAt(0) || "U"}
            initials
          />
          <div className="d-flex flex-column">
            <span className="fw-bolder">{NameInfo}</span>
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
    name: "تاریخ ثبت",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.insertDate,
    cell: (row) => {
      const date = row.inserDate
        ? new Date(row.inserDate).toLocaleDateString("fa-IR")
        : "-";
      return <span>{date}</span>;
    },
  },
];

const CourseCommentsList = ({ courseId, commentN }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!courseId) {
        console.log("courseId is missing:", courseId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://sepehracademy.liara.run/News/GetNewsComments?NewsId=${courseId}`,
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
  }, [commentN]);

  // console.log("commentsData",commentsData);

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
        ) : commentsData?.length === 0 ? (
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
