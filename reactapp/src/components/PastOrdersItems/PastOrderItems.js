import React, { useState, useEffect } from 'react';
import './PastOrderItems.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PastOrdersItems() {

  const [items, setItems] = useState([]);
  const {patientID} = useParams(); 
  const [sum, setSum] = useState(0); 
  const token = localStorage.getItem('token');
  console.log(patientID);

  useEffect(() => {
    // console.log(PatientID)

    axios.get(`http://localhost:8000/Authentication/patient/${patientID}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      setItems(response.data);
  
      
          
        })
        .catch(error => {
          console.log(error);
        });
    }
    , [patientID])
    
  
  



  function updateSum(newItems) {
    let sum = 0;
    for (let i = 0; i < newItems.length; i++) {
      sum += (newItems[i].quantity * newItems[i].price);
    }
    setSum(sum);
  }

  return (
    <div>
    <div className="text-center">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="ibox">
           
              <div className="ibox-title">
                  
                
                <h5>Your Patient</h5>
              </div>
              <div className="ibox-content">
                <div className="table-responsive">
        
                  <table className="table shoping-cart-table">
                    <tbody>
                      <tr>
                        <td width="90">
                          <div className="cart-product-imitation" style={{ marginBottom:'20px'}}>
                          <img style={{ borderRadius: '0' }} width="230px" height="200px"  src={items.first_name}/>

                          </div>
                        </td>
                        <td className="desc">
  <h3>
    <a style={{ fontSize: '23px', fontWeight: 'bold' }}>{items.last_name}</a>
  </h3>
  <dl className="small m-b-none">
    
    <dd style={{ fontSize: '16px' }}>{items.c_age}</dd>
  </dl>
  <div className="m-t-sm"></div>
</td>

                    
                    <td width="80"style={{ fontSize: '16px', fontWeight: 'bold' }}>
  {/* Quantity: <span style={{ fontSize: '30px' }}>{product.quantity}</span> */}
</td>



                        <td>
                          {/* <h4>{product.price*product.quantity} EGP</h4> */}
                        </td>
                      </tr>
                      
                          </tbody>
                      </table>
                      <div style={{
        textAlign:"center",

    }}>
    <button
  type="submit"
  className="order-btn"
  style={{
    marginLeft: "40px",
    marginTop: "5px",
    width: "200px",
    height: "40px"       
  }}
>
  <Link to={`/AddApp/${patientID}` }style={{ textDecoration: 'none', color: 'inherit' }}>
    Add Appointment
  </Link>
</button>

      </div>
                  </div>
                 
              </div>
            

              <div class="ibox-content">
                  
                  <div style={{ marginRight: '630px' }}>
                  <Link to="/PastOrders">
                    <button className="btn btn-white">
                      <i className="fa fa-arrow-left"></i> Go Back
                      
                    </button>
                  </Link>
                  </div>
              </div>
              
          </div>

      </div>
      <div class="col-md-4">
          

          <div class="ibox">
              <div class="ibox-title">
                  <h5>BAA Support</h5>
              </div>
              <div class="ibox-content text-center">
                  <h3><i class="fa fa-phone"></i> +00201234567</h3>
                  <span class="small">
                      Please contact with us if you have any questions. We are avalible 24h.
                  </span>
              </div>
          </div>

          

      </div>
     </div>
  </div>
 </div>
</div> 
  );
  
}

export default PastOrdersItems;
