import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmRiNDM1MTc2ZWE2MDk3NGJkZGYxNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzY2MDIzMywiZXhwIjoxNjk4MDkyMjMzfQ.xrkQOYrQ1f1JzWouxO9jE4wGBwHV1lPkzHQf3n0N_TQ'}
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewUsers();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePic || 'https://images.pexels.com/photos/11650772/pexels-photo-11650772.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
