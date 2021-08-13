import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { setPost } from "../../actions";

import LoadingTiny from "../Loading-tiny";

export default function PostInfo(props) {
  const [open, setOpen] = useState(props.isOpen);
  const [isLoading, setIsLoading] = useState(false);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/posts/${props.postId}`)
      .then((response) => {
        dispatch(setPost(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(("error", error));
      });
  }, [dispatch, props]);

  return (
    <div>
      <Modal
        show={open}
        size="xl"
        onHide={props.handleCloseInfo}
        backdrop="static"
        keyboard={false}
      >
        {isLoading ? (
          <LoadingTiny />
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title className="text-center m-auto">
                {post.title}
                <h5 className="text-muted">{post.date}</h5>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="body-modal-info">
              <p>{post.content}</p>
            </Modal.Body>
          </div>
        )}
      </Modal>
    </div>
  );
}
