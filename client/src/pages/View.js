import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3009/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="view">
        <div className="view_head">
          <p>User review details</p>
        </div>
        <div className="container">
          <strong>Review id: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Nume: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Gradul de aglomerare: </strong>
          <span>{user.grad_aglomerare}</span>
          <br />
          <br />
          <strong>Loc plecare: </strong>
          <span>{user.punct_plecare}</span>
          <br />
          <br />
          <strong>Ora plecare: </strong>
          <span>{user.ora_plecare}</span>
          <br />
          <br />
          <strong>Durata calatorie: </strong>
          <span>{user.durata}</span>
          <br />
          <br />
          <strong>Loc sosire: </strong>
          <span>{user.punct_sosire}</span>
          <br />
          <br />
          <strong>Observatii: </strong>
          <span>{user.observatii}</span>
          <br />
          <br />
          <strong>Nivelul de satisfactie total(maxim 5): </strong>
          <span>{user.nivel_satisfactie}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
