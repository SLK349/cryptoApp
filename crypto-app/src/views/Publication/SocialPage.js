import { useState, useEffect } from "react";
import axios from "axios";
import "./SocialPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faHeart, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "sonner";

const SocialPage = () => {
  const [file, setFile] = useState();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [pub, setPub] = useState([]);
  const [username, setUsername] = useState();
  // const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getAllPub();
  }, []);

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/publication/getUsername", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((res) => setUsername(res.data[0].username))
      .catch((err) => console.error(err));
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => {
        console.log(res.data.imagePath);
        const imagePath = res.data.imagePath;
        const token = localStorage.getItem("token");
        const data = { publications: { content, image: imagePath, token } };
        axios
          .post("http://localhost:3001/publication/createPub", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            setContent("");
            setImage("");
            getAllPub();
            toast("Publication created");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((err) => console.error(err));
  };

  const handleLike = (publicationId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3001/publication/like/${publicationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => getAllPub())
      .catch((err) => console.error(err));
  };

  const getAllPub = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3001/publication/allPub", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        setPub(res.data);
      })
      .catch((err) => console.error(err));
  };
  console.log(pub);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const deletePub = (publicationId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/publication/deletePub/${publicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        getAllPub();
      })
      .catch((error) => {
        toast("Unauthorized user to delete this publication.");
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      toast("File uploaded");
    }
  };

  const pubData = pub
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((item, index) => {
      const likeIconClass = item.userLikes === true ? "like-icon red" : "like-icon";

      return (
        <div key={index} className="social-pub">
          <div className="pub-info">
            <p>
              @{item.username} · {formatDate(item.created_at)}
            </p>
          </div>
          <p className="pub-content">{item.content}</p>
          <img src={`http://localhost:3001/` + `${item.image_url}`} />
          <div className="container-like">
            <div className="like-button" onClick={() => handleLike(item.id_publication)}>
              <span>{item.like}</span>

              <FontAwesomeIcon icon={faHeart} className={likeIconClass} />
            </div>
            <div className="del-button" onClick={() => deletePub(item.id_publication)}>
              <FontAwesomeIcon icon={faTrash} className="del-icon" />
            </div>
          </div>
        </div>

        // <div className="container-social-pub">
        //   <div className="social-pub-raw">
        //     <div className="social-pub-left">
        //       <div className="author-pub">
        //         <div className="profil-pic">
        //           <FontAwesomeIcon icon={faUser} />
        //         </div>
        //         <div details-pubs>
        //           <div className="container-author">
        //             <p className="author-name">{item.username}</p>
        //           </div>
        //           <div className="container-pub-date">
        //             <p className="pub-date">{formatDate(item.created_at)}</p>
        //           </div>
        //         </div>
        //       </div>

        //       <div className="container-pub-content">
        //         <p>{item.content}</p>
        //       </div>
        //     </div>

        //     <div
        //       className="social-pub-right"
        //       style={{
        //         backgroundImage: `url(http://localhost:3001/${item.image_url})`,
        //         backgroundSize: "cover",
        //         backgroundPosition: "left",
        //         backgroundRepeat: "no-repeat",
        //         width: "100%",
        //         height: "100%",
        //       }}
        //     ></div>
        //   </div>
        //   <div className="social-pub-raw2">
        //     <div className="container-social-btn">
        //       <div className="like-button" onClick={() => handleLike(item.id_publication)}>
        //         <span>{item.like}</span>
        //         <FontAwesomeIcon icon={faHeart} className={likeIconClass} />
        //       </div>

        //       <div className="del-button" onClick={() => deletePub(item.id_publication)}>
        //         <FontAwesomeIcon icon={faTrash} className="del-icon" />
        //       </div>
        //     </div>
        //   </div>
        // </div>
      );
    });

  return (
    <div className="container-social">
      <Navbar />
      <div className="social-post">
        <div className="container-social-username">
          <p className="social-username">@{username}</p>
        </div>

        <div className="social-post-text">
          <form onSubmit={handleSubmit} className="social-form">
            <div className="social-post-content">
              <textarea
                placeholder="How do you feel about the markets today ? Share your ideas here!"
                value={content}
                onChange={handleContentChange}
                rows="4"
                cols="50"
                required
              ></textarea>
              <div className="form-bottom">
                {/* <input type="file" id="img" onChange={(e) => setFile(e.target.files[0])} /> */}
                <input type="file" id="img" onChange={handleFileChange} />
                <label for="img">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </label>
                <button type="button" onClick={handleSubmit}>
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container-social-feed">
        <div className="social-feed">{pubData}</div>
      </div>
    </div>
  );
};

export default SocialPage;
