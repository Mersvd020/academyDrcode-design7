import Table from "./Table";
import { Row, Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import "@styles/react/apps/app-users.scss";

const UsersList = () => {
  return (
    <div className="app-user-list">
      <Table />
    </div>
  );
};

export default UsersList;
