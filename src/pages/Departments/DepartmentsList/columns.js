// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Third Party Components
import { Edit } from "react-feather";

// ** Table columns
export const columns = (handleDelete) => [
  {
    name: "#",
    sortable: false,
    width: "80px",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  {
    name: "شناسه (ID)",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.id,
    cell: (row) => <span>{row.id || "-"}</span>,
  },
  {
    name: "نام دپارتمان",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.depName,
    cell: (row) => <span className="fw-bold">{row.depName || "-"}</span>,
  },
  {
    name: "تاریخ ثبت",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.insertDate,
    cell: (row) => {
      if (!row.insertDate) return <span>-</span>;
      const date = new Date(row.insertDate);
      return <span>{date.toLocaleDateString("fa-IR")}</span>;
    },
  },
  {
    name: "نام ساختمان",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.buildingName,
    cell: (row) => <span>{row.buildingName || "-"}</span>,
  },
  {
    name: "عملیات",
    minWidth: "150px",
    center: true,
    cell: (row) => {
      console.log("Row data:", row); // Debug log
      return (
        <div className="d-flex gap-1">
          <Button
            color="info"
            size="sm"
            tag={Link}
            to={`/departments/edit/${row.id}`}
            style={{
              borderRadius: "8px",
              padding: "8px 20px",
              backgroundColor: "#00d4ff",
              border: "none",
            }}
          >
            <Edit size={14} className="me-50" />
            ویرایش
          </Button>
        </div>
      );
    },
  },
];
