import { Fragment } from "react";
import { Link } from "react-router-dom";

import Avatar from "@components/avatar";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Edit, Trash, MoreVertical, User, BookOpen } from "react-feather";

export const columns = (handleDelete) => [
  {
    name: "استاد یار گروه آموزشی",
    sortable: true,
    minWidth: "300px",
    cell: (row) => {
      const fullName = `${row.assistance?.user?.fName || ""} ${
        row.assistance?.user?.lName || ""
      }`.trim();
      return (
        <div className="d-flex justify-content-left align-items-center">
          <Avatar
            color="light-primary"
            icon={<User size={18} />}
            className="me-1"
          />
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">
              {fullName || "بدون نام"}
            </h6>
            <small className="text-truncate text-muted mb-0">
              استاد یار گروه آموزشی
            </small>
          </div>
        </div>
      );
    },
  },
  {
    name: "لیست استادیاریها",
    sortable: false,
    minWidth: "250px",
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <span className="fw-bold">{row.worktitle || "بدون عنوان"}</span>
        </div>
      );
    },
  },
  {
    name: "توضیحات",
    sortable: false,
    minWidth: "200px",
    cell: (row) => (
      <span className="text-truncate">{row.workDescribe || "-"}</span>
    ),
  },
  {
    name: "تاریخ",
    sortable: true,
    minWidth: "150px",
    cell: (row) => {
      const date = new Date(row.workDate);
      return <span>{date.toLocaleDateString("fa-IR")}</span>;
    },
  },
  {
    name: "انجام عملیات",
    minWidth: "150px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Link to={`/ostad-yaran/edit/${row.id}`} className="text-body">
          <Edit size={17} className="cursor-pointer" />
        </Link>
        <UncontrolledDropdown className="ms-1">
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              tag={Link}
              to={`/ostad-yaran/edit/${row.id}`}
              className="w-100"
            >
              <Edit size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/ostad-yaran/add-to-course/${row.assistanceId}`}
              className="w-100"
            >
              <BookOpen size={14} className="me-50" />
              <span className="align-middle">افزودن به دوره</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                if (handleDelete) {
                  handleDelete(row.id);
                }
              }}
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
