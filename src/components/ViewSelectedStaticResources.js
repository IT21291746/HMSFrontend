import React, { useState, useEffect } from "react";
import axios from "axios";
import{useParams} from 'react-router-dom';

function ViewSelectedStaticResources() {
    const {id} = useParams();
    const [staticresources, setStaticResources] = useState({});
    const [substaticresources, setSubStaticResources] = useState([]);
    const [ssrid, setSSRID] = useState("");
    const [availability, setAvailability] = useState("");
    const [location, setLocation] = useState("");
    const [condition, setCondition] = useState("");
    const [showsubstaticresources, setShowSubStaticResources] = useState(false);
    const [showaddsubstaticresources, setShowAddSubStaticResources] = useState(false);

    const counttotal = substaticresources.length;

  function sendData(e){
    e.preventDefault();
    
    const newSubStaticResources = {
        ssrid,
        srid : id,
        availability,
        location,
        condition
        }
    
        setSubStaticResources([...substaticresources, newSubStaticResources]);

    axios.post("http://localhost:8070/substaticresources/add", newSubStaticResources).then(()=>{
        alert("Record Added")
        fetchSubStaticResources(id);
        setSubStaticResources("");


    }).catch((err)=>{
        alert(err)
    })
}



useEffect(() => {
  generateSubStaticResourceId();
}, []);

function generateSubStaticResourceId() {
  axios
    .post("http://localhost:8070/substaticresources/maxId")
    .then((response) => {
      const maxId = response.data.maxId.toString();
      const newId = "SSRID" + (parseInt(maxId.substring(5)) + 1);
      setSSRID(newId);
    })
    .catch((err) => {
      alert(err);
    });
}



useEffect(()=>{
    axios.post(`http://localhost:8070/staticresources/findOne/${id}`).then((res)=> {
      setStaticResources([res.data]);
    }).catch((err)=>{
      console.log(err);
      alert("Error with retriving data");
    });
  },[id]);


const fetchSubStaticResources = async (id) => {
  try {
    const response = await axios.post(`http://localhost:8070/substaticresources/findbyId/${id}`);
    setSubStaticResources(response.data);
    setShowAddSubStaticResources(false)
    setShowSubStaticResources(true);
    console.log(response.data)
  } catch (error) {
    console.log(error);
    alert("Error with retrieving data");
  }
};

  const handleDelete = (recordID) => {
    axios
      .delete(`http://localhost:8070/substaticresources/delete/${recordID}`)
      .then((response) => {
        console.log(response.data);
        setSubStaticResources(substaticresources.filter((substaticresources) => substaticresources._id !== recordID));
        alert("Record Deleted")
      })
      .catch((error) => {
        console.log(error);
      });};


  return (
    <div>
        {staticresources &&  staticresources.map && staticresources.map((staticresources) => (
    <div className="main-div" key={staticresources._id}>
    
      <table > 
        <tr>
            <th>Resource ID</th>
            <td>{staticresources.srid}</td>
        </tr>

        <tr>
            <th>Name</th>
            <td>{staticresources.name}</td>
        </tr>
        
        <tr>
            <th>Available Number</th>
            <td>{counttotal}</td>
        </tr>
               
      </table>

            <div>
                <br/><br/>
            <button type="submit" className="btn btn-primary" onClick={()=>fetchSubStaticResources(id)}>View Sub Resources</button>
            <button type="submit" className="btn btn-danger" onClick={()=>{setShowSubStaticResources(false); setShowAddSubStaticResources(true);}} >Add New Sub Resources</button>

            </div>

            {showsubstaticresources && 
            
                <div>

                    <div>
                        <table>
                            <tr>
                                <th>Sub Resource ID</th>
                                <th>Availability</th>
                                <th>Location</th>
                                <th>Condition</th>
                                <th>Action</th>
                            </tr>

                            {substaticresources && substaticresources.map && substaticresources.map(substaticresources => (
                        <tbody className="container" key={substaticresources._id}>
                          <tr>
                          
                            <td>{substaticresources.ssrid}</td>
                            <td>{substaticresources.availability}</td>
                            <td>{substaticresources.location}</td>
                            <td>{substaticresources.condition}</td>
                            <td><button type="submit" className="btn btn-danger" onClick={()=> handleDelete(substaticresources._id)}>Delete</button></td>
                          </tr> 
                        </tbody>
                    ))}


                        </table>
                    </div>
                </div>


            }

            {showaddsubstaticresources && 

                    <div>
                        <form onSubmit={sendData}> 
                        <div>
                          <label for="" >Sub Resource ID</label>
                          <input type="text" required className="form-control" value={ssrid} readOnly/>


                          <label for="" >Availability</label>
                          <input type="radio" name="availability" value="Available"  onChange={(e)=>{setAvailability(e.target.value);}} />Available
                          <input type="radio" name="availability" value="Not Available"  onChange={(e)=>{setAvailability(e.target.value);}} />Not Available

                            <select className="form-control" required onChange={(e)=>{setLocation(e.target.value);}}>
                                <option value="Location A">Location A</option>
                                <option value="Location B">Location B</option>
                                <option value="Location C">Location C</option>
                            </select>

                            
                            <label for="" >Condition</label>
                          <input type="radio" name="condition" value="Brand New"  onChange={(e)=>{setCondition(e.target.value);}} />Brand New
                          <input type="radio" name="condition" value="Used"  onChange={(e)=>{setCondition(e.target.value);}} />Used

                        
                        <button className="btn btn-success" type="submit">Confirm</button>

                        </div>
                      </form>
                    </div>
            
            
            }


    </div>       
    ))} 
</div>

  );
}

export default ViewSelectedStaticResources;
