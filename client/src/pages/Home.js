import React, { useState, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";



const Home = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState(""); 

  const navigate = useNavigate();
//  const handleSearch = (e) =>{
 //   e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
  //  navigate("/search ? name=${search}");
  //  setSearch("");
   //   }

  const loadData = async () => {
    const response = await axios.get("http://localhost:3009/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
    const loadPosts = async()=>{
      setLoading(true);
      const response = await axios.get("http://localhost:3009/api/get");
      setPosts(response.data);
      setLoading(false);
    }
  loadPosts();
  }, []);
const [loading,setLoading] = useState(false);
const [posts,setPosts] = useState([]);
const [searchTitle,setSearchTitle] = useState("");

  function deleteReview(id) {
    if (window.confirm("Do you really want to delete the review?")) {
      axios.delete(`http://localhost:3009/api/remove/${id}`);
      toast.success("Review deleted sucessfully");
      setTimeout(() => loadData(), 100);
    }
  }
    
  return (
    <div style={{ marginTop: "150px" }}>
      <h1 className="p_title">Transport review</h1>
      <Link to="/addReview">
        <button className="btn-transport">Add new review</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Review Id</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Transport used</th>
            <th style={{ textAlign: "center" }}>Punct de plecare</th>
            <th style={{ textAlign: "center" }}>Punct de sosire</th>
            <th style={{ textAlign: "center" }}>Ora plecare</th>
            <th style={{ textAlign: "center" }}>Durata calatorie(minute)</th>
            <th style={{ textAlign: "center" }}>Grad de aglomerare</th>
            <th className="obs" style={{ textAlign: "center" }}>Observatii</th>
            <th style={{ textAlign: "center" }}>Nivelul de satisfactie</th>
            <th style={{ textAlign: "center" }}>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.transport}</td>
                <td>{item.punct_plecare}</td>
                <td>{item.punct_sosire}</td>
                <td>{item.ora_plecare}</td>
                <td>{item.durata}</td>
                <td>{item.grad_aglomerare}</td>
                <td>{item.observatii}</td>
                <td>{item.nivel_satisfactie}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteReview(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="SearchDIV">
      <h4>Search filter</h4>
        <input className="inputsearch"
        type="text"
        placeholder="Search.."
        onChange={(e) => setSearchTitle(e.target.value)}/>
        
        {loading ? (
          <h4>Loading</h4>
        ) : (
          
          posts.filter((value) => {
            if(searchTitle === "") {
              return null;
            }
            else if(value.name.toLowerCase().includes(searchTitle.toLowerCase()) || value.transport.toLowerCase().includes(searchTitle.toLowerCase()) || value.punct_plecare.toLowerCase().includes(searchTitle.toLowerCase()) || value.punct_sosire.toLowerCase().includes(searchTitle.toLowerCase()))
            {
              return value
            
            }
         
          })
          .map((item) => 
              <h5 key={item}>  {item.name }  {"|"}  {item.transport} {"|"} {item.punct_plecare} {"|"} {item.ora_plecare} {"|"}  {item.punct_sosire}</h5> )
        )
        }
        </div>
    </div>
  );
};

export default Home;
