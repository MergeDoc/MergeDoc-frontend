import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import myAxios from "../src/others/myAxios";

const Viewer = () => {
  const router = useRouter();
  const { id } = router.query;
  const [unitData, setUnitData] = useState();
  const [unitListData, setUnitListData] = useState([]);
  const [additionalUnitData, setAdditionalUnitData] = useState(null);

  console.log(unitData);

  const getUnitData = async () => {
    const res = await myAxios("get", `unit/${id}`);
    setUnitData(res.data);
  };

  const getUnitListData = async () => {
    const res = await myAxios("get", "unit");
    setUnitListData(res.data.filter((unit) => unit.id !== Number(id)));
  };

  const handleAdditionalContent = (id, content) => {
    setAdditionalUnitData(
      id === additionalUnitData?.id ? null : { id, content },
    );
  };

  const mergeAndGoToNewViewer = async () => {
    const res = await myAxios("post", "unit/merge", {
      baseUnitId: unitData.id,
      mergeUnitId: additionalUnitData.id,
    });
    await router.push(`/viewer?id=${res.data.id}`);
    router.reload();
  };

  useEffect(() => {
    if (!id) return;
    getUnitData();
    getUnitListData();
  }, [id]);

  return (
    <StyledViewer>
      <div className={"viewer"}>
        <div className={"header"}>
          {unitData && (
            <>
              <div className={"dummy"}></div>
              <div>유닛 뷰어 &nbsp; |&nbsp; {unitData.title}</div>
              {additionalUnitData ? (
                <button className={"merge"} onClick={mergeAndGoToNewViewer}>
                  병합
                </button>
              ) : (
                <div className={"dummy"}></div>
              )}
            </>
          )}
        </div>

        <div className={"container"}>
          <div className={"page"}>
            {unitData && (
              <>
                <h2>{unitData.title}</h2>
                {unitData.content?.split("\n").map((para, index) => {
                  if (para === "") return <br />;
                  return <p key={"original" + index}>{para}</p>;
                })}
              </>
            )}
            {additionalUnitData && (
              <>
                {additionalUnitData.content?.split("\n").map((para, index) => {
                  if (para === "") return <br />;
                  return (
                    <p className={"additional"} key={"additional" + index}>
                      {para}
                    </p>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={"searcher"}>
        <h4>유닛 탐색기</h4>
        {unitListData.map((unit) => {
          const { id, title, content, category } = unit;
          return (
            <div key={id} onClick={() => handleAdditionalContent(id, content)}>
              <div>유닛 ID : {id}</div>
              <div>제목 : {title}</div>
              <div>카테고리 : {category}</div>
            </div>
          );
        })}
      </div>
    </StyledViewer>
  );
};

const StyledViewer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  & > .viewer {
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
      & > .dummy {
        width: 70px;
      }
      & > .merge {
        background: #fff;
        border: none;
        outline: none;
        width: 70px;
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
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
        padding: 20px 30px;
        & > * {
          width: 100%;
        }
        & h2 {
          text-align: center;
        }
        & p {
          margin: 2px 0;
        }
        & .additional {
          background: #61affe35;
          box-shadow: 0 0 3px 3px #61affe30;
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

export default Viewer;
