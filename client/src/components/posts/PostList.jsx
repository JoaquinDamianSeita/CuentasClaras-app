import { React, useState } from "react";
import { useSelector } from "react-redux";
import PostInfo from "./PostInfo";

export default function PostList() {
  const [showInfo, setShowInfo] = useState(false);
  const [tempPostId, setTempPostId] = useState("");

  function handleCloseInfo() {
    setShowInfo(false);
  }

  function handleShowInfo(id) {
    setTempPostId(id);
    setShowInfo(true);
  }

  const posts = useSelector((state) => {
    return state.posts;
  });

  return (
    <div>
      <div>
        <PostInfo
          postId={tempPostId}
          isOpen={showInfo}
          handleCloseInfo={handleCloseInfo}
        ></PostInfo>
      </div>

      <div className="container background-white">
        <div>
          <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
              <h1 className="display-4 fst-italic">Sección de Posteos</h1>
              <p className="lead my-3">
                En esta parte de la página se van a mostar los artículos
                publicados por el administrador de forma sencilla con el
                contenido reducido.
              </p>
            </div>
          </div>

          <hr />
          <div className="row mb-2">
            {posts.length &&
              posts.map((post) => {
                return (
                  <div key={post._id} className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">
                          Post
                        </strong>
                        <h3 className="mb-0">{post.title}</h3>
                        <div className="mb-1 text-muted">{post.date}</div>
                        <p className="card-text mb-auto">
                          {post.content.substring(0, 100) + " ..."}
                        </p>
                        <p style={{color:"#3415be",textDecoration:"underline"}} onClick={() => handleShowInfo(String(post._id))}>
                          Leer Más!
                        </p>
                      </div>
                      <div className="col-auto d-none d-lg-block">
                        <img
                          className="my-5 app-logo"
                          src={process.env.PUBLIC_URL + "/images/blog.svg"}
                          alt="Blog logo"
                          width="160"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
