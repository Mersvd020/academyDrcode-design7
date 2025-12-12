import { useEffect, useState } from "react";

import axios from "axios";
import { Users } from "react-feather";

import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";
const SubscribersGained = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://sepehracademy.liara.run/Report/DashboardReport"
        );

        console.log("DASHBOARD DATA:", res.data);

        setData(res.data);
      } catch (error) {
        console.error("API ERROR:", error);
      }
    };

    fetchData();
    return () => setData(null);
  }, []);

  if (!data) return null;

  return (
    <StatsWithAreaChart
      icon={<Users size={21} />}
      color="primary"
      stats={data.allUser}
      statTitle="تعداد دانشجویان"
      series={[data.activeUserPercent, data.interActiveUserPercent]}
      type="area"
    />
  );
};

export default SubscribersGained;
