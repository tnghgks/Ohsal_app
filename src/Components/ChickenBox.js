import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50px;
  border-left: 5px solid #6b8d40;
  background-color: #dce4cf;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const User = styled.div``;
const Ranking = styled.div``;
const RankPoint = styled.div``;
const CurrentRanking = styled.span``;
const TotalMember = styled.span``;

const ChickenBox = ({ index, username, nickname, rankPoint, totalMember }) => {
  return (
    <Container>
      <Ranking>
        <CurrentRanking>#{index}</CurrentRanking>/
        <TotalMember>{totalMember}</TotalMember>
      </Ranking>
      <User>{nickname ? nickname : username}</User>
      <RankPoint>{rankPoint}</RankPoint>
    </Container>
  );
};

export default ChickenBox;
