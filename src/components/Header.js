import styled from "styled-components";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";
import { Navigate } from "react-router-dom";

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search"></input>
          </div>
          <SearchIcon>
            <img src="/images/search.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/home">
                <img src="/images/home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/people.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/message.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="/images/notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  Me
                  <img src="/images/down.svg" alt="" />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Business>
              <a>
                <img src="/images/business.svg" alt="" />
                <span>
                  For Business
                  <img src="/images/down.svg" alt="" />
                </span>
              </a>
            </Business>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  max-width: 100vw;
  z-index: 100;
  @media (max-width: 768px) {
    padding: 5px 24px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.div`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  position: relative;
  flex-grow: 1;

  & > div {
    max-width: 280px;

    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 4px;
      width: 218px;
      color: rgba(0, 0, 0, 0.9);
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      border-color: #dce6f1;
      height: 34px;
      font-family: system-ui, sans-serif;
      @media (max-width: 768px) {
        width: 75%;
      }
    }
  }
`;
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 8px;
  left: 2px;
  border-radius: 0 4px 4px 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.div`
  margin-left: auto;
  background-color: white;
  z-index: 100;
  @media (max-width: 768px) {
    min-width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: no-wrap;
  list-style-type: none;
  justify-content: space-between;

  .active {
    span:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: 2px solid rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  padding: 4.5px 0;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    min-height: 42px;
    min-width: 80px;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      text-align: center;
      @media (max-width: 941px) {
        font-size: 10px;
      }
      @media (max-width: 422px) {
        font-size: 9px;
      }
    }

    img {
      @media (max-width: 422px) {
        height: 18px;
        width: 18px;
      }
    }

    @media (max-width: 935px) {
      min-width: 56px;
    }

    @media (max-width: 768px) {
      min-width: 50px;
    }
  }
  &:hover,
  &:active a {
    span {
      color: rgba(0, 0, 0, 0.9);
    }
    cursor: pointer;
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 5px;
  font-size: 16px;
  width: 100px;
  height: 40px;
  text-align: center;
  transition-duration: 167ms;
  display: none;
  color: #0a66c2;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
`;

// we're borrowing style from NavList
const User = styled(NavList)`
  a > img {
    border-radius: 50%;
    height: 24px;
    width: 24px;
  }
  span img {
    @media (max-width: 422px) {
      height: 12px;
      width: 12px;
    }
  }

  &:hover {
    ${SignOut} {
      display: block;
    }
  }
`;
const Business = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  max-width: 90px;
  display: flex;
  justify-content: center;
  padding-left: 10px;
  span img {
    @media (max-width: 422px) {
      height: 12px;
      width: 12px;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
