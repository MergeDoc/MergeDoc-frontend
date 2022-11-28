import styled from "styled-components";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      <StyledLogin>
        <div>
          <h3>로그인</h3>
          <div onClick={goToHome}>카카오톡으로 소셜 로그인</div>
        </div>
      </StyledLogin>
    </>
  );
};

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 200px;
    border: solid 1px #ddd;
    border-radius: 5px;
    gap: 40px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 50px;
      border: solid 1px #ddd;
      border-radius: 5px;
      background: #ffd800;
      cursor: pointer;
    }
  }
`;

export default Login;
