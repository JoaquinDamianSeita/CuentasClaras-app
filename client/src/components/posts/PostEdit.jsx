import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { setPost, replacePost } from "../../actions";

export default function PostEdit(props) {
  const [open, setOpen] = useState(props.isOpen);
  const initialState = useSelector((state) => state.post);
  let [post, changePost] = useState(initialState);
  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    changePost(initialState);
  }, [props.postId]);


  function handleChange(event) {
    changePost({
      ...post,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = await getAccessTokenSilently();
    axios
      .patch(
        `/api/posts/${props.postId}`,
        {
          data: {
            date: post.date,
            title: post.title,
            content: post.content,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(setPost(post));
        dispatch(replacePost(post));
        console.log(post);
      })
      .catch((error) => {
        console.log(error);
        alert(`No estas autorizado a realizar esta acción! ${error} Enviar un mensaje a joaquindamianseita@gmail.com`);
      });
    props.handleCloseEdit();
  }

  return (
    <div>
      <Modal
        show={open}
        size={"lg"}
        onHide={props.handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar posteo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              defaultValue={post.title}
              onChange={handleChange}
            ></Form.Control>

            <Form.Label>Fecha:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              defaultValue={post.date}
              onChange={handleChange}
            ></Form.Control>

            <Form.Label column sm={2}>
              Contenido:
            </Form.Label>
            <Form.Control
              as={"textarea"}
              type="text"
              name="content"
              defaultValue={post.content}
              onChange={handleChange}
            ></Form.Control>
          </form>

          <div className="btn-group d-flex justify-content-center">
            <input
              type="submit"
              value="Confirmar Cambios"
              className="btn btn-primary"
              onClick={handleSubmit}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.handleCloseEdit}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
