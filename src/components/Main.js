import styled from "styled-components";
import PostModal from "./PostModal";
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";
import { setLikedNumberArray } from "../actions/index";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  // making an array where each element is false initially
  const [likedArticle, setLikedArticle] = useState(
    new Array(props.articles.length).fill(false)
  );

  // this will not work since the state is not persistent
  /*
  // load the likedNumberArray from local storage when the page loads
  useEffect(() => {
    const storedLikedNumberArray = localStorage.getItem("likedNumberArray");
    if (storedLikedNumberArray) {
      setLikedNumberArray(JSON.parse(storedLikedNumberArray));
    }
  }, []);

  // save the likedNumberArray to local storage whenever it changes
  // second argument is the dependency array
  useEffect(() => {
    localStorage.setItem("likedNumberArray", JSON.stringify(likedNumberArray));
    console.log(likedNumberArray);
  }, [likedNumberArray]); */

  useEffect(() => {
    const storedLikedArticle = localStorage.getItem("likedArticle");
    if (storedLikedArticle) {
      setLikedArticle(JSON.parse(storedLikedArticle));
    }
  }, []);

  const handleLikeClick = (index) => {
    let temp = [...likedArticle];
    temp[index] = !temp[index];
    setLikedArticle(temp);

    const newLikedNumberArray = [...props.likedNumberArray];
    newLikedNumberArray[index] = temp[index]
      ? newLikedNumberArray[index] + 1
      : newLikedNumberArray[index] - 1;

    props.setLikedNumberArray(newLikedNumberArray);

    // setting the value of likedArticle in the local storage
    localStorage.setItem("likedArticle", JSON.stringify(temp));
  };

  // fetching the articles from the firestore database
  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    e.preventDefault(); // sometimes the event have this defalut behaviour of refreshing the page onClick, so to prevent that we use this

    // target is the element with event listener now (inner button) and current target is the element on which the event listener was attached initially (outer div)
    // if (e.target !== e.currentTarget) {
    //   return;
    // }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={handleClick} disabled={props.loading ? true : false}>
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/job.svg" alt="" />
            <span>Job</span>
          </button>
          <button>
            <img src="/images/article.svg" alt="" />
            <span>Write Article</span>
          </button>
        </div>
      </ShareBox>
      <>
        {props.articles.length === 0 ? (
          <p
            style={{
              textAlign: "center",
            }}
          >
            oops☹️! No posts to show
          </p>
        ) : (
          <Content>
            {props.loading && <img src={"/images/animation.gif"} />}
            {props.articles.length > 0 &&
              props.articles.map((article, index) => (
                <Article index={index}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img src="/images/ellipses.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImg>
                  <SocialCount>
                    <li>
                      <button>
                        <img src="/images/like-post.svg" alt="" />
                        <img src="/images/innovative-post.svg" alt="" />
                        <img src="/images/love-post.svg" alt="" />
                        <span>{props.likedNumberArray[index]}</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                  </SocialCount>
                  <SocialActions>
                    <button onClick={() => handleLikeClick(index)}>
                      {likedArticle[index] ? (
                        <img src="/images/likeButton.svg" alt="" />
                      ) : (
                        <img src="/images/like.svg" alt="" />
                      )}
                      <span
                        style={{
                          color: likedArticle[index] ? "#378fe9" : "#00000099",
                        }}
                      >
                        Like
                      </span>
                    </button>
                    <button>
                      <img src="/images/comment.svg" alt="" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="/images/repost.svg" alt="" />
                      <span>Repost</span>
                    </button>
                    <button>
                      <img src="/images/share.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
      </>

      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgba(0, 0, 0, 0.2);
`;

// Inheriting style from CommonCard
// We'll post from ShareBox
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      font-family: system-ui, sans-serif;
      cursor: pointer;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #fff;
        text-align: left;
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
          transition-duration: 210ms;
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around; // same space on both sides of an item
      padding-bottom: 4px;

      button {
        padding: 0 10px;
        border-radius: 5px;
        img {
          margin: 0 8px 0 -2px;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.08);
          transition-duration: 210ms;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1; // take up all the space if there is single item
    overflow: hidden;
    display: flex;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);

        &:first-child {
          font-weight: bolder;
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f9fafb;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  a {
    width: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto; // if the content is more than the container, it will scroll
  margin: 0 16px;
  list-style: none;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  justify-content: space-between;
  li {
    margin-right: 5px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);

    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;

      img {
        &:nth-child(2) {
          margin: 0 -4px;
          background-color: white;
          border-radius: 50%;
        }
        &:nth-child(3) {
          background-color: white;
          border-radius: 50%;
        }
      }
      span {
        margin-left: 3px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
    min-width: 50px;
    color: #00000099;
    border: none;
    background-color: transparent;
    border-radius: 5px;

    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      transition-duration: 210ms;
    }

    span {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
      font-family: system-ui, sans-serif;
      @media (max-width: 415px) {
        display: none;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles, // getting articles from firebase in the form of array
    likedNumberArray: state.likedState.likedNumberArray,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
  setLikedNumberArray: (likedNumberArray) =>
    dispatch(setLikedNumberArray(likedNumberArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
