import { useEffect, useState } from "react";

import axios from "axios";
import Chart from "react-apexcharts";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
} from "reactstrap";

const SupportTrackerReserve = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://sepehracademy.liara.run/Report/DashboardReport")
      .then((res) => setData(res.data))
      .catch(() => setData(null));

    return () => setData(null);
  }, []);

  if (!data) return null;

  const series = [data.reserveAcceptPercent];

  const options = {
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 20,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "65%",
        },
        track: {
          background: "#fff",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            offsetY: -5,
            fontFamily: "Montserrat",
            fontSize: "1rem",
          },
          value: {
            offsetY: 15,
            fontFamily: "Montserrat",
            fontSize: "1.714rem",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    colors: [props.danger],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [props.primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: { dashArray: 8 },
    labels: ["Accepted %"],
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle tag="h4">وضعیت رزرو</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col sm="2" className="d-flex flex-column flex-wrap text-center">
            <h1 className="font-large-2 fw-bolder mt-2 mb-0">
              {data.allReserve}
            </h1>
            <CardText>تعداد کل رزرو ها</CardText>
          </Col>

          <Col sm="10" className="d-flex justify-content-center">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={270}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-1">
          <div className="text-center">
            <CardText className="mb-50">رزرو های اکسپت شده</CardText>
            <span className="font-large-1 fw-bold">
              {data.allReserveAccept}
            </span>
          </div>

          <div className="text-center">
            <CardText className="mb-50">رزرو های اکسپت نشده %</CardText>
            <span className="font-large-1 fw-bold">
              {data.reserveNotAcceptPercent}%
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SupportTrackerReserve;
