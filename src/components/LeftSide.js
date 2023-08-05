import styled from "styled-components";
import { connect } from "react-redux";

const LeftSide = (props) => {
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />
          <a>
            <Photo />
            <Link>
              Welcome,
              {props.user && props.user.displayName
                ? props.user.displayName
                : "there"}
              !
            </Link>
          </a>
          <a>
            <AddPhotoText>Add a photo</AddPhotoText>
          </a>
        </UserInfo>
        <Widgets>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </Widgets>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Followed Hashtags</span>
        </a>
        <a>
          <span>Discover More</span>
        </a>
      </CommunityCard>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside;
`;

const ArtCard = styled.div`
  text-align: center;
  border: 2px solid red;
  overflow: hidden;
  margin-bottom: 8px;
  border: none;
  position: relative;
  transition: box-shadow 83ms;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
`;
const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
`;
const Photo = styled.div`
  box-shadow: none;
  background-image: url("/images/camera.svg");
  width: 72px;
  height: 72px;
  background-size: 60%;
  box-sizing: border-box;
  background-clip: content-box;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  background-position: center;
  border-radius: 50%;
  background-color: white;
`;
const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;
const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.33;
  font-weight: 600;
`;

const Widgets = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 13px;
        line-height: 1.333;
        font-weight: 600;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
`;
const Item = styled.div`
  border-color: rgba(0, 0, 0, 0.8);
  padding: 12px;
  font-size: 12px;
  text-align: left;
  span {
    display: flex;
    align-items: center;
    font-weight: 600;
    img {
      margin-right: 5px;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;

  a {
    color: #0a66c2;
    padding: 4px 12px 4px 12px;
    font-size: 13px;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      border-top: 1px solid #d6cec2;
      padding: 12px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin-top: 5px;
      &:hover {
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftSide);
