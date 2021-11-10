import React, { useState, useEffect } from "react";
import ChickenBox from "Components/ChickenBox";
import Loader from "Components/Loader";
import axios from "axios";

const ChickenEvent = () => {
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState([]);
  const [totalMember, setTotalMember] = useState("");

  const getRanking = async () => {
    const { data } = await axios.get("/api/getChickenEvent");
    const memberLength = Object.keys(data).length;
    setTotalMember(memberLength);
    setRanking(data);
    setLoading(false);
  };

  useEffect(() => {
    getRanking();
    return () => {
      setLoading(false);
      setRanking([]);
      setTotalMember("");
    };
  }, []);
  return loading && loading ? (
    <Loader />
  ) : (
    <>
      <div className="ChickenEvent__container">
        <div className="ChickenEvent__title">오살 치킨 게임 이벤트</div>
        <div className="ChickenEvent__rankBox">
          {ranking &&
            ranking.map((user, index) => (
              <ChickenBox
                key={user.id}
                index={index + 1}
                username={user.username}
                nickname={user.nickname}
                rankPoint={user.rankPoint}
                totalMember={totalMember}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ChickenEvent;
