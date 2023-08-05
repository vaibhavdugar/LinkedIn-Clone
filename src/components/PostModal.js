import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleContentClick = (e) => {
    e.stopPropagation(); // onClick will not work on content with this
  };

  const handleChange = (e) => {
    const image = e.target.files[0]; // files is an array of files uploaded by the user
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a  + ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    };
    // this will add the post to the firestore database
    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container onClick={(event) => reset(event)}>
          <Content onClick={handleContentClick}>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  {props.user && props.user.displayName
                    ? props.user.displayName
                    : "Name"}
                </span>
              </UserInfo>
              <Editor>
                {/* e is the event object, target is the textarea and value is the value set by the user */}
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    {/* this will create an URL for the image */}
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Plase share a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        style={{
                          width: "50%",
                          height: "25px",
                          textAlign: "center",
                          width: "100%",
                          fontFamily: "system-ui, sans-serif",
                        }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </div>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <ShareThings>
                <AttachAssets>
                  <button onClick={() => setAssetArea("image")}>
                    <AddPhoto>Add a photo</AddPhoto>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }} // this will hide the input tag
                      onChange={handleChange}
                    />
                    <label htmlFor="file">
                      <img src="/images/modal-photo.svg" alt="" />
                    </label>
                  </button>
                  <button onClick={() => setAssetArea("media")}>
                    <AddVideo>Add a Video</AddVideo>
                    <img src="/images/modal-video.svg" alt="Upload Video" />
                  </button>
                </AttachAssets>
                <ShareComment>
                  <button>
                    <img src="/images/comment.svg" alt="" />
                    Anyone
                  </button>
                </ShareComment>
              </ShareThings>
              {/* 'disabled' attribute is used to disable elements like button */}
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
          )
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed; // ThiAssetButton>l make the modal appear on top of everything else
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 625px;
  background-color: white;
  height: 70%;
  overflow: initial;
  border-radius: 5px;
  display: flex;
  position: relative;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    background: transparent;
    border: none;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto; // when more content scrollbar will come
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px 20px 16px;
  flex-wrap: wrap;
  gap: 10px;
`;

const AddPhoto = styled.span`
  position: absolute;
  bottom: 80px;
  left: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  padding: 8px 10px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
  display: none;
  transition: box-shadow 83ms;
  background-color: white;
`;

const AddVideo = styled(AddPhoto)`
  left: 53px;
  transition: box-shadow 83ms;
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 10px;
  gap: 10px;
  button {
    display: flex;
    align-items: center;
    height: 50px;
    min-width: auto; // This will make the button shrink to fit the content
    color: rgba(0, 0, 0, 0.5);
    width: 50px;
    padding: 0;
    border-radius: 50%;
    border: none;
    label {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.15), 0 5px 4px rgba(0, 0, 0, 0.2);
    }
    &:first-child {
      &:hover {
        ${AddPhoto} {
          display: block;
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      justify-content: center;
      &:hover {
        ${AddVideo} {
          display: block;
        }
      }
    }
  }
`;

const ShareComment = styled.div`
  padding-left: 12px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    min-width: auto;
    width: 100px;
    border-radius: 5px;
    border: none;
    font-family: system-ui, sans-serif;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: auto;
  width: 70px;
  border: none;
  border-radius: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) =>
    props.disabled ? `rgba(0, 0, 0, 0.09)` : `#0a66c2`};
  color: ${(props) => (props.disabled ? `rgba(0, 0, 0, 0.5)` : `white`)};
  font-weight: 600;
  font-family: system-ui, sans-serif;
  ${(props) => props.disabled && `cursor: not-allowed`}
  &:hover {
    background: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 12px 24px 12px;
  textarea {
    border: none;
    width: 100%;
    min-height: 100px;
    resize: none;
    font-family: system-ui, sans-serif;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  textarea:focus {
    outline: none;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const ShareThings = styled.div`
  display: inline-flex;
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
