// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";

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

// ** Table columns
export const columns = [
  {
    name: "دوره",
    sortable: true,
    minWidth: "250px",
    sortField: "title",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.courseName}</h6>
        </div>
      );
    },
  },
  {
    name: "دانشجو",
    sortable: true,
    minWidth: "250px",
    sortField: "teacher.fName",
    selector: (row) => row.studentName,
    cell: (row) => {
      const name = row.studentName || "نامشخص";

      return (
        <div className="d-flex justify-content-left align-items-center">
          {/* {renderTeacher(row)} */}
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">{name}</h6>
          </div>
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "وضیعت ",
    sortField: "startTime",
    selector: (row) => row.startTime,
    cell: (row) => {
      const acceptt = row.accept ? "پذیرفته شده" : "در انتظار تایید";

      return (
        <div className="d-flex bg-[red] justify-content-left align-items-center">
          <span className="text-xs">
            <Badge
              style={{ fontSize: "13px", padding: "5px" }}
              color={`${acceptt === "پذیرفته شده" ? "success" : "warning"}`}
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
    name: "عملیات",
    minWidth: "110px",
    cell: (row) => {
      let status = "Inactive";
      if (row.isActive && !row.isExpire) {
        status = "Active";
      } else if (row.isExpire) {
        status = "Expired";
      }
      if (row.isDelete) {
        status = "Deleted";
      }

      return (
        <div className="column-action d-flex align-items-center">
          <Link
            to={`/course/preview/${row.courseId}`}
            id={`pw-tooltip-${row.courseId}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledTooltip
            placement="top"
            target={`pw-tooltip-${row.courseId}`}
          >
            مشاهده دوره
          </UncontrolledTooltip>

        </div>
      );
    },
  },
];
