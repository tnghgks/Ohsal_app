import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import BattleMakerForm from "Components/BattleMakerForm";

const socket = io("http://localhost:3001/");

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #637373;
  padding-left: 50px;
`;

const BattleContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: cadetblue;
`;
const BattleList = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  background-color: blueviolet;
`;

const Title = styled.h1`
  width: 100%;
  height: 50px;
  background-color: coral;
  text-align: center;
  line-height: 50px;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
`;
const BattleName = styled.li`
  width: 100%;
  height: 50px;
  background-color: cyan;
`;
const BattleMaker = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: cornsilk;
  text-align: center;
  line-height: 50px;
`;
const Battle = () => {
  const battleMaker = useRef();
  const battleContainer = useRef();
  const onClick = () => {
    if (battleContainer.current) {
      battleContainer.current.append("<BattleMakerForm></BattleMakerForm>");
    }
  };

  useEffect(() => {
    if (battleMaker.current) {
      battleMaker.current.addEventListener("click", onClick);
    }
    return () => {
      if (battleMaker.current) {
        battleMaker.current.removeEventListener("click", onClick);
      }
    };
    //socket.emit("message", "hi");
  }, []);

  return (
    <Container>
      <BattleContainer ref={battleContainer}>
        <BattleList>
          <Title>내전 목록</Title>
          <List>
            <BattleName>오살과 함께하는 즐거운 내전</BattleName>
            <BattleMaker ref={battleMaker}>+ 내전만들기</BattleMaker>
          </List>
        </BattleList>
      </BattleContainer>
    </Container>
  );
};

export default Battle;
