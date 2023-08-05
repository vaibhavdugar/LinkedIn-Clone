import styled from "styled-components";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <Container>
      {/* when we click on signOut in header, the user is not logged in */}
      {!props.user && <Navigate to="/" />}
      <Section>
        <h5>
          <a>Hiring in a hurry? -&nbsp; </a>
        </h5>
        <p>
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>
      <Layout>
        <LeftSide />
        <Main />
        <RightSide />
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0 20px;
  max-width: 100vw;
  min-height: 100vh;
  background-color: #f3f2ef;
`;
const Section = styled.section`
  max-width: 1128px;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  text-decoration: underline;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    text-decoration: underline;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    font-weight: 600;
    color: #434639;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 15px;
  }
`;

const Layout = styled.div`
  max-width: 1128px;
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 6.5fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px auto;
  padding: 0 20px;
  @media (max-width: 993px) {
    grid-template-areas:
      "leftside main main"
      "leftside rightside rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr);
    max-width: 740px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);
