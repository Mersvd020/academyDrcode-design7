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
            <small className="text-muted">
              {row.groupName || "گروه نامشخص"}
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "وضعیت پرداخت",
    sortable: true,
    minWidth: "200px",
    center: true,
    selector: (row) => row.peymentDone,
    cell: (row) => {
      return (
        <Badge color={row.peymentDone ? "light-success" : "light-danger"} pill>
          {row.peymentDone ? "پرداخت شده" : "پرداخت نشده"}
        </Badge>
      );
    },
  },
];

const UserPaymentList = ({ courseId }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://sepehracademy.liara.run/CoursePayment/UserPayList?CourseId=${courseId}&StudentId=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set data from API
        const data = response.data || [];
        setPaymentData(data);
      } catch (error) {
        console.log("newsPreviewErrorww:", error);
        setError("خطا در دریافت اطلاعات ");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [courseId]);

  return (
    <Card>
      <CardHeader tag="h4">لیست کاربران دوره :</CardHeader>

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
        ) : paymentData.length === 0 ? (
          <div className="text-center p-3">
            <p className="text-muted">هیچ پرداختی یافت نشد</p>
          </div>
        ) : (
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={paymentData}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        )}
      </div>
    </Card>
  );
};

export default UserPaymentList;
