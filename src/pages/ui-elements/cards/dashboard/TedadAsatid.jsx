import { useEffect, useState } from "react";

import axios from "axios";
import { Package } from "react-feather";

import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";

const TedadAsatid = () => {
  const [data, setData] = useState(null);

  const options = {
    chart: {
      id: "revenue",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    grid: { show: false },
    colors: ["#ff9f43"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: { x: { show: false } },
  };

  useEffect(() => {
    axios
      .get("https://sepehracademy.liara.run/Report/DashboardReport")
      .then((res) => setData(res.data))
      .catch(() => setData(null));

    return () => setData(null);
  }, []);

  if (!data) return null;

  const statValue = data.allUser || 0;

  return (
    <StatsWithAreaChart
      icon={<Package size={21} />}
      color="warning"
      stats={statValue}
      statTitle="تعداد اساتید"
      options={options}
      type="area"
    />
  );
};

export default TedadAsatid;
