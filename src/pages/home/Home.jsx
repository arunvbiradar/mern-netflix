import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], [])
  
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('/users/stats', {
          headers: {token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmRiNDM1MTc2ZWE2MDk3NGJkZGYxNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzY2MDIzMywiZXhwIjoxNjk4MDkyMjMzfQ.xrkQOYrQ1f1JzWouxO9jE4wGBwHV1lPkzHQf3n0N_TQ'}
        });
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        })
        // need to add  -1 to months coz MONTH is an array and starts from 0 index
        statsList.map(item => setUserStats(prev => [
          ...prev,
          {
            name: MONTHS[item._id - 1],
            "New User": item.total
          },
        ]))
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  }, [MONTHS]);
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
