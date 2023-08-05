import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom";

// To display this component on screen, import it into App.js and add it to the JSX
const Login = (props) => {
  return (
    <Container>
      {/* it is checking if user is not null then redirect it */}
      {props.user && <Navigate to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <ul>
            <li>
              <a href="/">
                <img src="/images/articles.svg" alt="" />
                <span>Articles</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/images/people.svg" alt="" />
                <span>People</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/images/learning.svg" alt="" />
                <span>Learning</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/images/jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </li>
          </ul>
          <div>
            <Join>Join now</Join>
            <SignIn>
              <span>Sign in</span>
            </SignIn>
          </div>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Stay on top of the latest news, insights, and industry trends</h1>
          <img src="/images/section-image.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="" />
            <span>Sign in with Google</span>
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div``;
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 5px 16px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  justify-content: space-between;
  @media (max-width: 342px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      width: 105px;
    }
  }

  & > div {
    display: flex;
    align-items: center;
  }

  & > div > ul {
    display: flex;
    @media (max-width: 990px) {
      display: none;
    }
  }

  & > div > ul::after {
    content: "";
    width: 1px;
    background-color: #00000099;
    opacity: 0.4;
    margin: 0 15px;
  }

  & > div > ul > li {
    list-style: none;
    padding: 0 17px;
  }

  & > div > ul > li > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }

  & > div > ul > li > a > span {
    font-size: 14px;
    color: #00000099;
    line-height: 1.5;
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 15px 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.9);
  margin-right: 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 25px;
    color: rgba(0, 0, 0, 1);
  }
`;
const SignIn = styled.a`
  font-size: 16px;
  padding: 15px 21px;
  text-decoration: none;
  box-shadow: inset 0 0 0 1.5px #0a66c2;
  border-radius: 25px;
  color: #0a66c2;
  font-weight: 600;
  vertical-align: middle;

  & > span {
    text-align: center;
    vertical-align: top;
    font-weight: 500;
  }

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a4784;
  }
`;

const Section = styled.section`
  display: flex;
  min-height: 500px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  margin: auto;
  @media (max-width: 768px) {
    min-height: 0;
    margin: auto;
    justify-content: center;
  }
`;

const Hero = styled.div`
  width: 100%;
  text-align: center;
  padding: 0px 5px;
  h1 {
    padding-bottom: 0;
    width: 50%;
    font-size: 56px;
    font-weight: 100;
    line-height: 1.25;
    color: #8f5849;
    text-align: left;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 32px;
      width: 100%;
    }
  }

  img {
    padding: 30px 0 30px 5px;
    width: 700px;
    position: absolute;
    top: 120px;
    height: 565px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 600px;
      top: 230px;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  width: 380px;
  position: relative;
  top: 20px;
  @media (max-width: 768px) {
    position: initial;
    top: initial;
  }
`;
const Google = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  gap: 10px;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-family: system-ui, sans-serif;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);

  & > span {
    vertical-align: top;
    font-weight: 500;
  }

  &:hover {
    background-color: rgba(112, 181, 249, 0.04);
    border-color: rgba(112, 181, 249, 0.8);
    box-shadow: 0 3px 8px 0 rgba(112, 181, 249, 0.1);
  }
`;

// this func is used to reflect any updates to the redux store and merge them into props in your component, like whenever a new user logins it's info is stored in the redux store and this will reflect that change in the ui. state parameter is the redux store state
const mapStateToProps = (state) => {
  return {
    user: state.userState.user, // store -> rootReducer -> userReducer -> user
    // The user information is with the store that's why we're connecting with the store
  };
};

//we have to dispatch the actions to the store to update the states
const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

// export default Login;

// connecting this component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(Login);
