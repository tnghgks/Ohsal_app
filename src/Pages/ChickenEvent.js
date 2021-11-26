import React, { useState, useEffect } from "react";
import ChickenBox from "Components/ChickenBox";
import styled from "styled-components";
import Loader from "Components/Loader";
import axios from "axios";

const Container = styled.div`
  width: 40%;
  height: 100vh;
  margin: 0 auto;
  background-color: #30336b;
`;
const Title = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
`;

const RankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
      <Container>
        <Title>오살 치킨 게임 이벤트</Title>
        <RankBox>
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
        </RankBox>
      </Container>
    </>
  );
};

export default ChickenEvent;
