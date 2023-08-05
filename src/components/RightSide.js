import styled from "styled-components";

const RightSide = (props) => {
  return (
    <Container>
      <Follow>
        <Title>
          <span>LinkedIn News</span>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>
        <NewsList>
          <div>
            <News>
              <a>
                <span>Fidelity International to hire 800</span>
                <span>2d ago</span>
              </a>
            </News>
          </div>
          <div>
            <News>
              <a>
                <span>Bridging the gender gap in STEM</span>
                <span>1d ago</span>
              </a>
            </News>
          </div>
          <div>
            <News>
              <a>
                <span>Prioritising employee well-being</span>
                <span>4d ago</span>
              </a>
            </News>
          </div>
          <div>
            <News>
              <a>
                <span>Travel loans rise in non-metros</span>
                <span>5d ago</span>
              </a>
            </News>
          </div>
          <div>
            <News>
              <a>
                <span>For gender equity at India Inc</span>
                <span>2d ago</span>
              </a>
            </News>
          </div>
        </NewsList>
        <ShowMore>
          <span>
            Show More
            <img src="/images/down-arrow.svg" alt="" />
          </span>
        </ShowMore>
      </Follow>
      <Ad>
        <a>
          <img src="/images/linkedin-ad.png" alt="" />
        </a>
      </Ad>
      <Copyright>
        <img src="/images/login-logo.svg" alt="" />
        <span>LinkedIn Corporation © 2023</span>
      </Copyright>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;
  margin-bottom: 30px;
`;

const Follow = styled.div`
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgba(0, 0, 0, 0.2);
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 12px;
  padding-bottom: 0;
  span {
    font-weight: 500;
  }
`;

const NewsList = styled.ul`
  margin-top: 10px;
  div {
    padding: 2px 0;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const News = styled.li`
  padding: 2px 0;
  list-style-type: circle;
  position: relative;
  left: 32px;
  max-width: 85%;
  margin-right: 40px;
  a {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 14px;
    font-weight: 600;

    span {
      &:nth-child(2) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: 400;
        padding-top: 4px;
      }
    }
  }
`;

const ShowMore = styled.div`
  padding: 6px 25px 15px;
  text-align: left;
  span {
    font-size: 14px;
    font-weight: 500;
    color: #00000099;
    display: inline-flex;
    align-items: center;
    padding: 4px 7px;
    border-radius: 5px;
    img {
      margin-left: 3px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transition: all 190ms ease-out;
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  gap: 4px;
  img {
    width: 56px;
    height: 14px;
  }
  span {
    font-size: 12px;
  }
`;

const Ad = styled(Follow)`
  margin-top: 8px;
  padding: 0;
  img {
    display: block;
    margin: 0 auto;
  }
`;

export default RightSide;
