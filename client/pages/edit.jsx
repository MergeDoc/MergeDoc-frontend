import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import myAxios from "../src/others/myAxios";

const Edit = () => {
  const router = useRouter();
  const [myUnitData, setMyUnitData] = useState({
    title: "이름없음",
    content: "",
    category: "A",
  });
  const [unitListData, setUnitListData] = useState([]);

  console.log(myUnitData);

  const saveAndGoToViewer = async () => {
    const { title, content, category } = myUnitData;
    const res = await myAxios("post", "unit", {
      title,
      content,
      category,
    });
    router.push(`/viewer?id=${res.data.id}`);
  };

  const changeValue = (e, target) => {
    console.log(target);
    const tempMyUnitData = { ...myUnitData };
    tempMyUnitData[target] = e.target.value;
    setMyUnitData(tempMyUnitData);
  };

  const coverContent = (id) => {
    setMyUnitData(unitListData.find((unit) => unit.id === id));
  };

  const getUnitListData = async () => {
    const res = await myAxios("get", "unit");
    setUnitListData(res.data);
  };

  useEffect(() => {
    getUnitListData();
  }, []);

  return (
    <StyledEdit>
      <div className={"editer"}>
        <div className={"header"}>
          <div></div>
          <div>유닛 편집기 &nbsp; |&nbsp; {myUnitData?.title}</div>
          <button className={"save"} onClick={saveAndGoToViewer}>
            저장
          </button>
        </div>
        <div className={"container"}>
          <div className={"page"}>
            <input
              className={"title"}
              type={"text"}
              value={myUnitData?.title}
              onChange={(e) => changeValue(e, "title")}
              placeholder={"제목"}
            />
            <textarea
              className={"content"}
              value={myUnitData?.content}
              onChange={(e) => changeValue(e, "content")}
              placeholder={"내용을 작성하세요."}
            />
          </div>
        </div>
      </div>
      <div className={"searcher"}>
        <h4>유닛 탐색기</h4>
        {unitListData.map((unit) => {
          const { id, title, category } = unit;
          return (
            <div key={id} onClick={() => coverContent(id)}>
              <div>유닛 ID : {id}</div>
              <div>제목 : {title}</div>
              <div>카테고리 : {category}</div>
            </div>
          );
        })}
      </div>
    </StyledEdit>
  );
};

const StyledEdit = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  & > .editer {
    display: flex;
    flex-direction: column;
    width: 70%;
    & > .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 55px;
      background: #29434e;
      color: #fff;
      padding: 20px;
      & > .save {
        background: #fff;
        border: none;
        outline: none;
        width: 70px;
        height: 30px;
        border-radius: 3px;
      }
    }
    & > .container {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #ddd;
      padding: 10px;
      & > .page {
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 100%;
        background: #fff;
        overflow: scroll;
        padding: 30px 30px;
        gap: 20px;
        & .title {
          text-align: center;
          border: none;
          font-size: 18px;
          outline: none;
        }
        & .content {
          height: 100%;
          border: none;
          outline: none;
        }
      }
    }
  }
  & > .searcher {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    width: 30%;
    height: 100%;
    background: #fff;
    overflow: scroll;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      min-height: 80px;
      margin-bottom: 25px;
      border-radius: 5px;
      border: solid 1.5px #ddd;
      background: #fff;
      cursor: pointer;
      padding: 0 10px;
      & > div {
        white-space: nowrap;
      }
    }
  }
`;

export default Edit;
