// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { activeComment, deleteComment } from "./store";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
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

// ** Vars
const courseStatusObj = {
  Active: { color: "light-success", icon: CheckCircle },
  Inactive: { color: "light-secondary", icon: EyeOff },
  Expired: { color: "light-danger", icon: Info },
};

// ** renders teacher column
const renderTeacher = (row) => {
  const teacher = row.teacher || {};

  if (teacher.currentPictureAddress) {
    return (
      <Avatar
        className="me-50"
        img={teacher.currentPictureAddress}
        width="32"
        height="32"
      />
    );
  } else {
    const teacherName =
      `${teacher.fName || ""} ${teacher.lName || ""}`.trim() || "استاد";
    return (
      <Avatar
        color="light-primary"
        className="me-50"
        content={teacherName}
        initials
      />
    );
  }
};

// ** Table columns
export const columns = [
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "150px",
    sortField: "title",
    selector: (row) => row.userFullName,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.userFullName}</h6>
        </div>
      );
    },
  },

  {
    name: "عنوان دوره",
    sortable: true,
    minWidth: "250px",
    sortField: "title",
    selector: (row) => row.courseTitle,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.courseTitle}</h6>
        </div>
      );
    },
  },
  {
    name: "متن کامنت",
    sortable: true,
    minWidth: "250px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.title}</h6>
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "وضیعت ",
    selector: (row) => row.accept,
    cell: (row) => {
      const acceptt = row.accept ? "تایید شده" : "رد شده";

      return (
        <div className="d-flex bg-[red] justify-content-left align-items-center">
          <span className="text-xs">
            <Badge
              style={{ fontSize: "13px", padding: "5px" }}
              color={`${acceptt === "تایید شده" ? "success" : "warning"}`}
              pill
            >
              {acceptt}
            </Badge>
          </span>
        </div>
      );
    },
  },
  {
    sortable: true,
    name: "لایک ها",
    minWidth: "100px",
    sortField: "likeCount",
    selector: (row) => row.likeCount,
    cell: (row) => {
      return (
        <Badge color="warning" pill>
          {row.likeCount}
        </Badge>
      );
    },
  },

  {
    sortable: true,
    name: "دیس لایک ها",
    minWidth: "100px",
    sortField: "disslikeCount",
    selector: (row) => row.disslikeCount,
    cell: (row) => {
      return (
        <Badge color="light-info" pill>
          {row.disslikeCount}
        </Badge>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => {
      let activing = true;
      let status = "Inactive";

      if (row.accept) {
        status = "Active";
        activing = false;
      } else if (!row.accept) {
        status = "Inactive";
        activing = true;
      }

      if (row.isDelete) {
        status = "Deleted";
      }
      //  console.log("rowId:", row.courseId)
      const isExpired = row.isExpire;

      return (
        <div className="column-action d-flex align-items-center">
          {/* <Link to={`/course/preview/${row.courseId}`} id={`pw-tooltip-${row.courseId}`}>
            <Eye size={17} className='mx-1' />
          </Link>
          <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.courseId}`}>
            مشاهده دوره
          </UncontrolledTooltip> */}

          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>

            <DropdownMenu end>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch(activeComment(row.commentId));
                }}
              >
                <Delete size={14} className="me-50" />
                <span className="align-middle">
                  {status === "Active" ? "رد کردن" : "تایید کردن"}
                </span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch(deleteComment(row.commentId));
                }}
              >
                <Delete size={14} className="me-50" />
                <span className="align-middle">{"حذف کامنت"}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
