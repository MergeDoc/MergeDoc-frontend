import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import myAxios from "../src/others/myAxios";
import File from "../public/assets/file.svg";
import Image from "next/future/image";

const Home = () => {
  const router = useRouter();
  const [unitData, setUnitData] = useState([]);

  const createNewUnit = () => {
    router.push("/edit");
  };

  const getUnitData = async () => {
    const res = await myAxios("get", "unit");
    setUnitData(res.data);
  };

  const goToViewer = (id) => {
    router.push(`/viewer?id=${id}`);
  };

  useEffect(() => {
    getUnitData();
  }, []);

  return (
    <StyledHome>
      <div className={"header"}>통합저장소</div>
      <div className={"drive"}>
        <div className={"add"} onClick={createNewUnit}>
          +
        </div>
        {unitData.map(({ id, title }) => {
          return (
            <div
              className={"unitContainer"}
              key={id}
              onClick={() => goToViewer(id)}
            >
              <div>
                <Image src={File} />
              </div>
              <p>{title}</p>
            </div>
          );
        })}
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 60px 40px 0 40px;
  & .header {
    padding: 5px;
    font-size: 20px;
    border-bottom: solid 3px #29434e;
    margin-bottom: 20px;
  }

  & .drive {
    display: flex;
    align-items: left;
    justify-content: left;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding: 30px;
    gap: 60px;
    & > .unitContainer {
      display: flex;
      flex-direction: column;
      width: 200px;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 130px;
        background: #fff;
        border: solid 2px #ddd;
        cursor: pointer;
        & > img {
          width: 60px;
          height: 80px;
        }
      }
      & > p {
        width: 100%;
        cursor: pointer;
      }
    }
    & > .add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 130px;
      font-size: 60px;
      color: #333;
      border: solid 2px #ddd;
      cursor: pointer;
    }
  }
`;

export default Home;
