import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const  res = await axios.get(`lists${type ? "?type=" + type : ''}${genre ? '&genre=' + genre : ''}`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmRiNDE2MTc2ZWE2MDk3NGJkZGYxMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTc2NDkzMTQsImV4cCI6MTY5ODA4MTMxNH0.Uut05Eknrr9Bl6d4S7MOi1q82q2mbg_qGL0nxjeEXjw`,
          }
        });
        setLists(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists();
  }, [type, genre])

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map(list => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
