import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import PostInfoModal from "./PostInfoModal";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { removePost } from "../../actions";

export default function PostListTable(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [showInfo, setShowInfo] = useState(false);
  const [tempPostId, setTempPostId] = useState("");
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    return state.posts;
  });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen,posts]);

  function handleCloseInfo() {
    setShowInfo(false);
  }

  function handleShowInfo(id) {
    setTempPostId(id);
    setShowInfo(true);
  }

  async function handleDelete(postId) {
    const token = await getAccessTokenSilently();

    axios
      .delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(removePost(postId));
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
  }

  return (
    <div>
      <Modal
        show={open}
        onHide={props.handleCloseList}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Administrar posteos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Título</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.length &&
                posts.map((post) => {
                  return (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.date}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleShowInfo(String(post._id))}
                          >
                            Info
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(String(post._id))}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <div>
        <PostInfoModal
          postId={tempPostId}
          isOpen={showInfo}
          handleCloseInfo={handleCloseInfo}
        ></PostInfoModal>
      </div>
    </div>
  );
}
