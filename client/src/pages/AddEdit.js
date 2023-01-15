import React, { useState, useEffect } from "react";
import {  useParams, Link, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  transport: "",
  grad_aglomerare:"",
  punct_plecare: "",
  punct_sosire:"",
  ora_plecare:"",
  durata:"",
  observatii:"",
  nivel_satisfactie:"",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, transport, grad_aglomerare,punct_plecare,punct_sosire, ora_plecare ,durata, observatii, nivel_satisfactie} = state;



  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    axios
      .get(`http://localhost:3009/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !transport || !grad_aglomerare || !punct_plecare || !punct_sosire || !ora_plecare || !durata || !observatii || !nivel_satisfactie) {
      toast.error("Provide value into each field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3009/api/post", {
            name,
            email,
            transport,
            grad_aglomerare,
            punct_plecare,
            punct_sosire,
            ora_plecare,
            durata,
            observatii,
            nivel_satisfactie,
          })
          .then(() => {
            setState({ name: "", email: "", transport: "" ,grad_aglomerare:"" , punct_plecare:"" ,punct_sosire:"",ora_plecare:"",durata:"", observatii:"" , nivel_satisfactie:""});
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Review added successfully");
      } else {
        axios
          .put(`http://localhost:3009/api/update/${id}`, {
            name,  
            email,         
            transport,
            grad_aglomerare,
            punct_plecare,
            punct_sosire,
            ora_plecare,
            durata,
            observatii,
            nivel_satisfactie,
          })
          .then(() => {
            setState({ name: "", email: "", transport: "" ,grad_aglomerare:"",punct_plecare:"",punct_sosire:"",ora_plecare:"",durata:"", observatii:"" , nivel_satisfactie:""});
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Review updated successfully");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    
    <div style={{ marginTop: "100px" }}>
    
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
    
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
        />
      
        <label htmlFor="transport">Transport</label>
        <input
          type="text"
          id="transport"
          name="transport"
          placeholder="Transport.."
          value={transport || ""}
          onChange={handleInputChange}
        />
          <label htmlFor="plecare">Punct plecare</label>
        <input
          type="text"
          id="punct_plecare"
          name="punct_plecare"
          placeholder="Loc plecare ..."
          value={punct_plecare ||""}
          onChange={handleInputChange}
        />
          <label htmlFor="sosire">Punct sosire</label>
        <input
          type="text"
          id="punct_sosire"
          name="punct_sosire"
          placeholder="Loc sosire..."
          value={punct_sosire ||""}
          onChange={handleInputChange}
        />
                <label htmlFor="ora">Ora plecarii</label>
        <input
          type="time"
          id="ora_plecare"
          name="ora_plecare"
          placeholder="Ora plecarii ..."
          value={ora_plecare ||""}
          onChange={handleInputChange}
        />
                <label htmlFor="durata_calatorie">Durata calatoriei</label>
        <input
          type="text"
          id="durata"
          name="durata"
          placeholder="Durata ..."
          value={durata ||""}
          onChange={handleInputChange}
        />
                <label htmlFor="grad">Grad aglomerare</label>
        <input
          type="number"
          id="grad_aglomerare"
          name="grad_aglomerare"
          placeholder="Gradul de aglomerare ..."
          value={grad_aglomerare ||""}
          onChange={handleInputChange}
        />
                 <label htmlFor="obs">Observatii</label>
        <input
          type="text"
          id="observatii"
          name="observatii"
          placeholder="Observatii..."
          value={observatii ||""}
          onChange={handleInputChange}
        />
         <label htmlFor="satisfactie">Nivel de satisfactie</label>
        <input
          type="number"
          id="nivel_satisfactie"
          name="nivel_satisfactie"
          placeholder="Nivel de satisfactie..."
          value={nivel_satisfactie ||""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
