import Avatar from "@components/avatar";
import { Button, UncontrolledTooltip } from "reactstrap";
import { Eye } from "react-feather";
import { Link } from "react-router-dom";

export const columns = [
  {
    name: "آواتار",
    sortable: false,
    selector: (row) => row.pictureAddress || row.currentPictureAddress,
    cell: (row) => (
      <Avatar
        img={row.pictureAddress || row.currentPictureAddress}
        imgHeight="40"
        imgWidth="40"
      />
    ),
  },
  {
    name: "نام کامل",
    sortable: true,
    sortField: "fName",
    selector: (row) => `${row.fName || ""} ${row.lName || ""}`.trim(),
  },
  {
    name: "ایمیل",
    sortable: true,
    sortField: "userName",
    selector: (row) => row.userName,
  },
  {
    name: "نقش‌ها",
    sortable: false,
    selector: (row) => row.roles?.join(", ") || "-",
  },
  {
    name: "عملیات",
    allowOverflow: true,
    cell: (row) => (
      <div className="d-flex align-items-center gap-1">
        <Link to={`/users/view/${row.id}`} id={`detail-btn-${row.id}`}>
          <Button
            color="primary"
            size="sm"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Eye size={18} />
          </Button>
        </Link>
        <UncontrolledTooltip placement="top" target={`detail-btn-${row.id}`}>
          مشاهده جزئیات
        </UncontrolledTooltip>
      </div>
    ),
  },
];
