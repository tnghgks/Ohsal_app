import React, { useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import BattleMakerForm from "Components/BattleMakerForm";
import BattleList from "Components/BattleList";
import BattleDetail from "Components/BattleDetail";
import axios from "axios";
import Loader from "Components/Loader";

const socket = io("http://localhost:3001/");

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const BattleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
const Main = styled.div`
  width: calc(100% - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  text-align: left;
  line-height: 50px;
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const Battle = () => {
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [mainData, setMainData] = useState(false);
  const [battleList, setBattleList] = useState();

  const getBattle = async () => {
    const result = await axios({
      url: "/battle/getBattleList",
      method: "get",
    });
    setBattleList(result.data);
  };

  return (
    <Container>
      <BattleContainer>
        <BattleList
          setFormVisible={setFormVisible}
          battleList={battleList}
          getBattle={getBattle}
          setMainData={setMainData}
          setLoading={setLoading}
        />
        <Main>
          {formVisible && formVisible ? (
            <BattleMakerForm
              setMainData={setMainData}
              setFormVisible={setFormVisible}
              getBattle={getBattle}
            />
          ) : loading ? (
            ""
          ) : mainData ? (
            ""
          ) : (
            <Image
              src="Assets/pubg_black_fan_art.jpg"
              alt="pubg_black_fan_art"
            />
          )}
          {loading && loading ? (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          ) : (
            mainData && (
              <BattleDetail
                data={mainData}
                getBattle={getBattle}
                setMainData={setMainData}
                socket={socket}
              />
            )
          )}
        </Main>
      </BattleContainer>
    </Container>
  );
};

export default Battle;
