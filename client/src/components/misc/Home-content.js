import React from "react";

const HomeContent = () => (
  <div className="next-steps px-5">
    <h2 className="my-5 text-center">Funciones implementadas:</h2>

    <div className="row">
      <div className="col-md-5 mb-4 ">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://auth0.com/"
          >
            <i className="fas fa-link mr-2" />
            Login y Roles con Auth0
          </a>
        </h6>
        <p>
          Auth0 es una plataforma de autenticación y autorización adaptable y
          fácil de implementar.
        </p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            rel="noopener noreferrer"
            href="/admin-home"
          >
            <i className="fas fa-link mr-2" />
            Modo administrador
          </a>
        </h6>
        <p>
          Un modo donde se pueden crear, borrar y editar posteos de la página.
          Solo lo pueden utilizar usuarios autorizados.
        </p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/posts"
          >
            <i className="fas fa-link mr-2" />
            Posteos
          </a>
        </h6>
        <p>
          En esta sección se muestran los posteos directamente desde la base de
          datos en MongoDB Atlas.
        </p>
      </div>

      <div className="col-md" />

      <div className="col-md-5 mb-4">
        <h6 className="mb-3">
          <a
            rel="noopener noreferrer"
            href="/profile"
          >
            <i className="fas fa-link mr-2" />
            Sección perfil
          </a>
        </h6>
        <p>
          En esta parte de la página los usuarios pueden ver la información a la
          que accede la app de forma transparente.
        </p>
      </div>
    </div>
  </div>
);

export default HomeContent;
