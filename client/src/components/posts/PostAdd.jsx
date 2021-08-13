import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addPost } from "../../actions";
import { Modal } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";

export default function PostAdd(props) {
  const initialState = { date: "", title: "", content: "" };
  const [post, setFields] = useState(initialState);
  const [open, setOpen] = useState(props.isOpen);
  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  function handleChange(event) {
    setFields({ ...post, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    props.history.push("/posts");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const token = await getAccessTokenSilently();

    if (post.date || post.title || post.content) {
      return axios
        .post(
          "/api/posts",
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
        .then((response) => {
          dispatch(addPost(response.data));
          setFields(initialState);
        })
        .catch((err) => {
          console.log(err);
          alert(
            `No estas autorizado a realizar esta acción! ${err} Enviar un mensaje a joaquindamianseita@gmail.com`
          );
        });
    }
  }

  return (
    <div>
      <Modal
        show={open}
        size="lg"
        onHide={props.handleCloseAdd}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Posteo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Fecha:</label>
              <input
                type="date"
                name="date"
                required
                value={post.date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Título:</label>
              <input
                type="text"
                name="title"
                required
                value={post.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Título"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contenido:</label>
              <textarea
                type="text"
                name="content"
                required
                value={post.content}
                onChange={handleChange}
                className="form-control"
                placeholder="Contenido"
              />
            </div>
            <div className="btn-group d-flex justify-content-center">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={props.handleCloseAdd}>
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
    </div>

    // <div>
    //   <div className="container" style={{ width: 800 }}>
    //     <form onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <input
    //           type="date"
    //           name="date"
    //           required
    //           value={post.date}
    //           onChange={handleChange}
    //           className="form-control"
    //         />
    //         <input
    //           type="text"
    //           name="title"
    //           required
    //           value={post.title}
    //           onChange={handleChange}
    //           className="form-control"
    //           placeholder="Título"
    //         />
    //         <textarea
    //           type="text"
    //           name="content"
    //           required
    //           value={post.content}
    //           onChange={handleChange}
    //           className="form-control"
    //           placeholder="Contenido"
    //         />
    //       </div>
    //       <div className="btn-group">
    //         <input
    //           type="submit"
    //           value="Confirmar"
    //           className="btn btn-primary"
    //         />
    //         <button className="btn btn secondary" onClick={handleCancel}>
    //           Cancel
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}
