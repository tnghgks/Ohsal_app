import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import BattleMakerForm from "Components/BattleMakerForm";
import BattleList from "Components/BattleList";
import axios from "axios";

const socket = io("http://localhost:3001/");

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding-left: 50px;
`;

const BattleContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: cadetblue;
`;
const Main = styled.div`
  width: calc(100% - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: darkslategray;
  text-align: left;
  margin-left: 250px;
  line-height: 50px;
`;
const Battle = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [mainData, setMainData] = useState(false);
  const [battleList, setBattleList] = useState();
  const battleContainer = useRef();

  const getBattle = async () => {
    const result = await axios({
      url: "/battle/getBattleList",
      method: "get",
    });
    setBattleList(result.data);
  };

  return (
    <Container>
      <BattleContainer ref={battleContainer}>
        <BattleList
          setFormVisible={setFormVisible}
          battleList={battleList}
          getBattle={getBattle}
        />
        <Main>
          {formVisible && formVisible ? (
            <BattleMakerForm
              setMainData={setMainData}
              setFormVisible={setFormVisible}
              getBattle={getBattle}
            />
          ) : (
            ""
          )}
          {mainData ? Object.values(mainData) : ""}
        </Main>
      </BattleContainer>
    </Container>
  );
};

export default Battle;
