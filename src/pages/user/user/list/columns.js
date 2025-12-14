import { Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "@components/avatar";
import { Button, UncontrolledTooltip } from "reactstrap";
import { Trash2, Edit } from "react-feather";



//  @param {function} onDeleteClick
//  @param {function} onEditClick

export const columns = (onDeleteClick, onEditClick) => [
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
    minWidth: "80px",
  },
  {
    name: "نام کامل",
    sortable: true,
    sortField: "fName",
    selector: (row) =>
      `${row.fName || ""} ${row.lName || ""}`.trim(),
    minWidth: "150px",
    maxWidth: "200px",
    wrap: true,
  },
  {
    name: "ایمیل",
    sortable: true,
    sortField: "userName",
    selector: (row) => row.userName,
    minWidth: "200px",
    maxWidth: "250px",
    wrap: true,
  },
  {
    name: "نقش‌ها",
    sortable: false,
    selector: (row) => row.roles?.join("، ") || "-",
    minWidth: "300px",
    wrap: true,
  },
  {
    name: "عملیات",
    allowOverflow: true,
    minWidth: "300px",
    cell: (row) => (
      <Fragment>
        <div className="d-flex align-items-center gap-1">
          <Link
            to={`/users/view/${row.id}`}
            id={`detail-${row.id}`}
            className="text-primary fw-bolder"
            style={{ whiteSpace: "nowrap" }}
          >
            مشاهده جزئیات
          </Link>
          <UncontrolledTooltip target={`detail-${row.id}`}>
            مشاهده جزئیات کاربر
          </UncontrolledTooltip>
          <Button
            color="primary"
            id={`edit-${row.id}`}
            size="sm"
            style={{
              padding: "5px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
            onClick={() => onEditClick(row)}
          >
            <Edit size={14} />
            ویرایش
          </Button>
          <UncontrolledTooltip target={`edit-${row.id}`}>
            ویرایش کاربر
          </UncontrolledTooltip>
          <Button
            color="danger"
            id={`delete-${row.id}`}
            size="sm"
            style={{
              padding: "5px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
            onClick={() => onDeleteClick(row.id)}
          >
            <Trash2 size={14} />
            حذف
          </Button>
          <UncontrolledTooltip target={`delete-${row.id}`}>
            حذف کاربر
          </UncontrolledTooltip>
        </div>
      </Fragment>
    ),
  },
];
