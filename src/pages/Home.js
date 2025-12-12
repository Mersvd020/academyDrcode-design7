import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";

import CardCongratulations from "./ui-elements/cards/dashboard/CardCongratulations";
import SubscribersGained from "./ui-elements/cards/dashboard/SubscribersGained";
import TedadAsatid from "./ui-elements/cards/dashboard/TedadAsatid";
import SupportTrackerCourse from "./ui-elements/cards/dashboard/SupportTrackerCourse";
import SupportTrackerReserve from "./ui-elements/cards/dashboard/SupportTrackerReserve";
const Home = () => {
  return (
    <div>
      <Row>
        <Col>
          <CardCongratulations/>
        </Col>
        <Col>
          <SubscribersGained />
        </Col>
        <Col>
          <TedadAsatid />
        </Col>
      </Row>
      <Row>
        <Col>
          <SupportTrackerCourse />
        </Col>
        <Col>
          <SupportTrackerReserve />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
