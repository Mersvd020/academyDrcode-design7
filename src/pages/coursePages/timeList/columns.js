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
    name: "نام دوره کلاس",
    sortable: true,
    minWidth: "200px",
    sortField: "title",
    selector: (row) => row.termName,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.termName}</h6>
        </div>
      );
    },
  },
  {
    name: "نام بخش",
    sortable: true,
    minWidth: "200px",
    sortField: "title",
    selector: (row) => row.departmentName,
    cell: (row) => {
      return (
        <div className="d-flex flex-column">
          <h6 className="user-name text-truncate mb-0">{row.departmentName}</h6>
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "تاریخ شروع",
    sortField: "startTime",
    selector: (row) => row.startDate,
    cell: (row) => {
      const date = new Date(row.endDate);
      return date.toLocaleDateString("fa-IR");
    },
  },
  {
    sortable: true,
    minWidth: "150px",
    name: "تاریخ پایان",
    sortField: "startTime",
    selector: (row) => row.endDate,
    cell: (row) => {
      const date = new Date(row.endDate);
      return date.toLocaleDateString("fa-IR");
    },
  },

  {
    sortable: true,
    minWidth: "150px",
    name: "وضیعت دوره",
    sortField: "startTime",
    selector: (row) => row.startTime,
    cell: (row) => {
      const acceptt = row.expire ? "فعال" : "قفل شده";

      return (
        <div className="d-flex bg-[red] justify-content-left align-items-center">
          <span className="text-xs">
            <Badge
              style={{ fontSize: "13px", padding: "5px" }}
              color={`${acceptt === "فعال" ? "success" : "warning"}`}
              pill
            >
              {acceptt}
            </Badge>
          </span>
        </div>
      );
    },
  },
];
