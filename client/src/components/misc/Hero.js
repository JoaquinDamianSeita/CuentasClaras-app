import React from "react";

const Hero = () => (
  <div className="text-center hero">
    <img
      className="mb-3 app-logo"
      src={process.env.PUBLIC_URL + "/images/blog.svg"}
      alt="Blog logo"
      width="120"
    />
    <h1 className="mb-4">Bienvenido user.name!</h1>

    <small className="lead mb-2">
      ¿No sos user.name? Para iniciar sesión con otro usuario click{" "}
      <a href="#">aquí!</a>
    </small>

    <h3 className="mb-2">Saldo en la cuenta:</h3>
    <h1 className="mb-4">user.balance</h1>

    <hr />
  </div>
);

export default Hero;
