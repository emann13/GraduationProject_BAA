import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddNewPat.css';
// import { Carousel } from 'react-responsive-carousel';

// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-button";
// import UploadPreview from "@rpldy/upload-preview";
// import { Link, Navigate,Route, Routes } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { RightOutlined, LeftOutlined  } from '@ant-design/icons';



function AddNewPat (){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cAge, setCAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [doctorId, setDoctorId] = useState(''); // the ID of the logged-in doctor
  const [boneAge, setBoneAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');

  const [previewUrls, setPreviewUrls] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);  
  const slider = React.useRef(null);
  const [price, setPrice] = useState('');
  const [SubCategory, setSubCategory] = useState('');

  const [up, setUpload] = useState(1);

  const fileInput1 = document.getElementById('file-input1');

  const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:8000/Products/categories/')
  //   .then(response => {setCategories( JSON.stringify(response.data.data));
  //   })      .catch(response => console.log(JSON.stringify(response.data)));
  // }, []);

  const addPatient = () => {
    const data = new FormData();
    data.append('first_name', firstName);
    data.append('last_name', lastName);
    data.append('DoctorID', doctorId);
    data.append('c_age', cAge);
    data.append('Gender', gender);
    data.append('Weight', weight);
    data.append('Height', height);
    data.append('Img', Img);
    data.append('Bone_age', boneAge);
    data.append('Diagnosis', diagnosis);
    data.append('Notes', notes);
  
    axios.post('http://localhost:8000/Authentication/add-patient/', data)
      .then((response) => {
        console.log(response.data);
        // handle success response
      })
      .catch((error) => {
        console.error(error);
        // handle error response
      });
  }
  
  const [Img, setImg] = useState();

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result); 
      // console.log(Img);
    };
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    setImg(Img);
  }, [Img]);
  
console.log(Img)  
const fileInput = document.getElementById('file-input');





  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    size: "small",
    responsive: [
      {
        breakpoint: 768,
        settings: {
        variableWidth: false,

          slidesToShow: 1,
          slidesToScroll: 1,
          size: "small",
        },
      },
      {
        breakpoint: 480,
        settings: {
        variableWidth: false,

          slidesToShow: 1,
          slidesToScroll: 1,
          size: "small",
        },
      },
    ],
  };
  
  
  

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [previewUrls]);

 

  
        const handleSubmit = (event) => {
          event.preventDefault();
          console.log("price")

          console.log(price)
          if (!firstName || !lastName || !cAge || !gender || !weight || !height || !Img) {
            // Display error message
            toast.error("Please fill all fields");
            return;
          }
          const formData = new FormData();
          const token = localStorage.getItem('token');
          console.log("Eman")
          console.log(SubCategory)
          const data = new FormData();
          if (fileInput.files[0] != null){
            data.append('Img', fileInput.files[0]);
          
          }
          data.append('first_name', firstName);
          data.append('last_name', lastName);
          data.append('DoctorID', doctorId);
          data.append('c_age', cAge);
          if (gender=="VENDOR")
          data.append('Gender', "male");
          else  
          data.append('Gender', "female");

          data.append('Weight', weight);
          data.append('Height', height);
          // data.append('Img', Img);
          data.append('Bone_age', boneAge);
          data.append('Diagnosis', diagnosis);
          data.append('Notes', notes);
        
          axios.post('http://localhost:8000/Authentication/add-patient/', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          })
          .then((response) => {
            console.log(response.data);
            toast.success("patient added")
          })
          .catch((error) => {
            console.error(error);
            toast.error(":(((")
          });
                        
      };

      useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);
  return(
    
  <>
 <div className="product-request-form-container" >
      <div className="product-request-form-card"style={{
        marginTop:"50px",
        
        backgroundColor:'white'}}>
        <h2 className="product-request-form-title">Enter Patient's Info</h2>
        <form className="product-request-form"
        
        
        >
          <label htmlFor="productName" className="product-request-form-label ">
First Name          </label>
          <input 
            type="text"
            id="productName"
            className="product-request-form-input "
            placeholder="first Name"
            onChange={(event) => setFirstName(event.target.value)}

          />
    <label htmlFor="productName" className="product-request-form-label ">
Last Name          </label>
          <input 
            type="text"
            id="productName"
            className="product-request-form-input "
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}

          />
  <label htmlFor="productName" className="product-request-form-label ">
Gender         </label>
<div class="wrapper"
style={{
  marginTop:"-10px"
}}

>
  <input
    type="radio"
    name="select"
    id="option-1"
    value="CUSTOMER"
    checked={gender === "CUSTOMER"}
    
    onChange={(e) => setGender(e.target.value)}
  />
  <input
    type="radio"
    name="select"
    id="option-2"
    value="VENDOR"
    checked={gender === "VENDOR"}
    onChange={(e) => setGender(e.target.value)}
  />
  <label for="option-1" class="option option-1">
    <div class="dot"></div>
    <span className="spancustomer">Female</span>
  </label>
  <label for="option-2" class="option option-2">
    <div class="dot"></div>
    <span>Male</span>
  </label>
</div>

<label htmlFor="productName" className="product-request-form-label ">
Weight         </label>
          <input 

min={0}
onKeyPress={(event) => {
  if (event.charCode < 48 || event.charCode > 57 ) {
    event.preventDefault();
  }
}}
            type="number"
            id="productName"
            className="product-request-form-input "
            placeholder="Weight"
            onChange={(event) => {
              if (event.target.value > 0) {
                setWeight(event.target.value);
              }
            }}
          />
  <label htmlFor="productName" className="product-request-form-label ">
Height         </label>
          <input 

min={0}
onKeyPress={(event) => {
  if (event.charCode < 48 || event.charCode > 57 ) {
    event.preventDefault();
  }
}}
            type="number"
            id="productName"
            className="product-request-form-input "
            placeholder="Height"
            onChange={(event) => {
              if (event.target.value > 0) {
                setHeight(event.target.value);
              }
            }}
          />
  

             
          <label htmlFor="productName" className="product-request-form-label ">
Age         </label>
          <input 

min={0}
onKeyPress={(event) => {
  if (event.charCode < 48 || event.charCode > 57 ) {
    event.preventDefault();
  }
}}
            type="number"
            id="productName"
            className="product-request-form-input "
            placeholder="Age"
            onChange={(event) => {
              if (event.target.value > 0) {
                setCAge(event.target.value);
              }
            }}
          />
  
          <label htmlFor="productDescription" className="product-request-form-label">
            Notes
          </label>
          <textarea
          placeholder="Notes"       
            rows="4"
            id="productDescription"
            className="product-request-form-input"
            onChange={(event) => setNotes(event.target.value)}

          ></textarea>

          <div>

          <div style={{ position: 'relative' }}>
 <img className=" mt-5 xrayImg fadeInDisplayName" width="150px" src={Img} />
 <input
   type="file"
   id="file-input"
   onChange={handleFileUpload}
   style={{
     opacity: 0,
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: '100%',
     height: '100%',
     zIndex: 1,
     cursor: 'pointer'
   }}
 />
</div>
<button
 className="upload-btn profile-image-upload-btn-unique fadeInDisplayName"
 type="button"
 style={{
   zIndex: 0,
   position: 'relative',
   backgroundColor: '#C0C0C0',
   color: '#fff',
   border: 'none',
   borderRadius: '20px',
   padding: '8px 16px',
   cursor: 'pointer',
  //  marginTop: '10px'
 }}
 onClick={() => document.getElementById('file-input').click()}
>
 Upload Xray
</button>

            
          </div>
                    
          {!Img  ? (
<div className='slider-space2'>
<h3 className="slider-space"

> No Xray Uploaded Yet</h3>
</div>
): null}

         <div>
          <button type="submit" className="product-request-form-button"
                           onClick={handleSubmit}

          >
Get results          </button>
          </div>
        </form>
      </div> 
    </div>
  
   </>
  );
 }

 
 export default AddNewPat;