import styled from "styled-components";
import Image from "next/future/image";
import Icon from "../../public/assets/icon.png";
import Info from "../../public/assets/info.svg";
import Setting from "../../public/assets/setting.svg";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <StyledHeader>
      <div className={"main"} onClick={goToHome}>
        <Image src={Icon} fill={"true"} />
        <p>MergeDoc</p>
      </div>
      <div className={"other"}>
        <Image src={Info} fill={"true"} />
        <Image src={Setting} fill={"true"} />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 0 20px;
  border-bottom: solid 1px #ddd;
  & > .main {
    display: flex;
    align-items: center;
    width: 70px;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
    gap: 10px;
    cursor: pointer;
    & > img {
      width: 40px;
      height: 40px;
    }
  }
  & > .other {
    display: flex;
    gap: 20px;
  }
`;

export default Header;
