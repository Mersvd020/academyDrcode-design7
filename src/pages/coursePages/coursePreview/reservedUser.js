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
    name: "نام دانشجو",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar
            className="me-1"
            color="light-primary"
            content={row.studentName?.charAt(0) || "U"}
            initials
          />
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.studentName || "نام نامشخص"}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "شماره تماس",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.studentPhone,
    cell: (row) => <span>{row.studentPhone || "-"}</span>,
  },
  {
    name: "وضعیت رزرو",
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
    name: "تاریخ رزرو",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.reserverDate,
    cell: (row) => {
      const date = row.reserverDate
        ? new Date(row.reserverDate).toLocaleDateString("fa-IR")
        : "-";
      return <span>{date}</span>;
    },
  },
];

const CourseReserveList = ({ courseId }) => {
  // ** States
  const [reserveData, setReserveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ** Fetch Reserve Data
  useEffect(() => {
    const fetchReserves = async () => {
      if (!courseId) {
        console.log("courseId:", courseId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://sepehracademy.liara.run/CourseReserve/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setReserveData(data);
      } catch (error) {
        console.log("reserve error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReserves();
  }, [courseId]);

  return (
    <Card>
      <CardHeader tag="h4">لیست کاربران رزرو شده دوره</CardHeader>

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
        ) : reserveData.length === 0 ? (
          <div className="text-center p-3">
            <p className="text-muted">هیچ رزروی یافت نشد</p>
          </div>
        ) : (
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={reserveData}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        )}
      </div>
    </Card>
  );
};

export default CourseReserveList;
