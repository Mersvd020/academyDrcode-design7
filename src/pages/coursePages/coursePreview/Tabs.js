// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link, Users } from "react-feather";


import UserProjectsList from "./UserProjectsList";
import GroupList from "./GroupList";
import CourseCommentsList from "./commentList";
import ReservedUserList from "./reservedUser";
import SocialGroupList from "./socialGroupList";

const UserTabs = ({ active, toggleTab, courseId, teacherId }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem key="tab-users">
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold font-medium-5">کاربرها</span>
          </NavLink>
        </NavItem>
        <NavItem key="tab-groups">
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold font-medium-5">گروه ها</span>
          </NavLink>
        </NavItem>
        <NavItem key="tab-comments">
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold font-medium-5">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem key="tab-reserved">
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold font-medium-5">کاربران رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem key="tab-social">
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold font-medium-5">گروه‌های اجتماعی</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserProjectsList courseId={courseId} />
        </TabPane>

        <TabPane tabId="2">
          <GroupList courseId={courseId} teachId={teacherId} />
        </TabPane>
        <TabPane tabId="3">
          <CourseCommentsList courseId={courseId} />
        </TabPane>
        <TabPane tabId="4">
          <ReservedUserList courseId={courseId} />
        </TabPane>
        <TabPane tabId="5">
          <SocialGroupList courseId={courseId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
