import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useStyles } from "./style";

const Profile = () => {
  const [pic, setPic] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/myposts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPic(result.myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram-clone");
      data.append("cloud_name", "dtwrzv0of");
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);

          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.secure_url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: data.secure_url })
              );
              dispatch({ type: "UPDATEPIC", payload: data.secure_url });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const classes = useStyles();
  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          margin: "18px 0",
          borderBottom: "1px solid gray",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "80px",
              }}
              src={state ? state.pic : "loading"}
              alt="profile"
            />
          </div>
          <div>
            <h4> {state ? state.name : "loading"}</h4>
            {/* <h4>{state?state.email:"loading"}</h4> */}
            <div className={classes.profileInfo}>
              <h6>
                <span className={classes.numFollowers}>{pic.length}</span> posts
              </h6>
              <h6>
                {state ? (
                  <span className={classes.numFollowers}>
                    {state.followers.length}
                  </span>
                ) : (
                  "0"
                )}{" "}
                followers
              </h6>
              <h6>
                {state ? (
                  <span className={classes.numFollowers}>
                    {state.following.length}
                  </span>
                ) : (
                  "0"
                )}{" "}
                following
              </h6>
            </div>
          </div>
        </div>
        <div className="file-field input-field">
          <div className={`btn ${classes.ggg}`}>
            <span>Change Picture</span>
            <input
              type="file"
              onChange={(e) => {
                updatePhoto(e.target.files[0]);
              }}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {pic.map((item) => {
          return (
            <img
              className="item"
              src={item.photo}
              alt={item.name}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
