import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { setPost, removePost } from "../../actions";
import PostEdit from "./PostEdit";

export default function PostInfoModal(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [showEdit, setShowEdit] = useState(false);
  const [tempPostId, setTempPostId] = useState("");
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();
  const userId = 1;

  function handleCloseEdit() {
    setShowEdit(false);
  }

  function handleShowEdit(id) {
    setTempPostId(id);
    setShowEdit(true);
  }

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    async function traerPost() {
      const token = await getAccessTokenSilently();
      axios
        .get(`/api/operations/${props.postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(setPost(response.data));
        })
        .catch((error) => {
          console.log(("error", error));
        });
    }
    traerPost();
  }, [dispatch, props]);

  function imprimirAlgo() {
    console.log("algo");
  }

  async function handleDelete() {
    const token = await getAccessTokenSilently();

    axios
      .delete(`/api/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(removePost(post._id));
      })
      .catch((error) => {
        console.log("error", error);
        alert(
          `No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`
        );
      });
    props.handleCloseInfo();
  }

  return (
    <div>
      <Modal
        show={open}
        size={"lg"}
        onHide={props.handleCloseInfo}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título:</Form.Label>
              <Form.Control value={post.title} readOnly></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Fecha:</Form.Label>
              <Form.Control value={post.date} readOnly></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Contenido:</Form.Label>
              <Form.Control
                as={"textarea"}
                value={post.content}
                readOnly
              ></Form.Control>
            </Form.Group>
          </Form>

          <div className="btn-group mt-3 mx-5 d-flex justify-content-center">
            <button
              className="btn btn-warning"
              onClick={() => handleShowEdit(String(props.postId))}
            >
              Editar
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDelete}
            >
              Borrar
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        <PostEdit
          postId={tempPostId}
          isOpen={showEdit}
          handleCloseEdit={handleCloseEdit}
        ></PostEdit>
      </div>
    </div>
  );
}
