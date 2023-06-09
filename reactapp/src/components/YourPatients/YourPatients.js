import React, { useState, useEffect ,useRef , PureComponent } from 'react';
import axios from 'axios';
import './YourPatients.css';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { LinearProgress } from '@material-ui/core';
import { fontWeight, height, textAlign } from '@mui/system';
import { Checkbox } from '@material-ui/core';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,AreaChart,Area } from 'recharts';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Collapse
} from '@material-ui/core';
import {
  Home,
  Menu as MenuIcon,
  Store,
  ShoppingBasket,
  AccountCircle,
  Settings,
  Help,
  ExitToApp,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  ArrowForwardIos,
  ArrowBackIos,
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  ArrowBack,
  AccountCircleSharp,
  AccountBox
} from '@material-ui/icons';
import Logout from '@mui/icons-material/Logout';
import { color, fontSize } from '@mui/system';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
root: {
    display: 'flex',
},
bold: {
    marginLeft: '10px',
    fontWeight: 'bold',
  },
appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 1,
},
drawer: {   
    width: drawerWidth,
    flexShrink: 0
},
shrink: {
    paddingTop: '6px',
    fontSize: '12px'
  },

drawerPaper: {
  width: drawerWidth,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '20px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.grey[600],
  },
},
toolbar: theme.mixins.toolbar,
listItem: {
    color: theme.palette.text.primary,
},
bottomList: {
    // position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
},
upperNav: {
    zIndex: theme.zIndex.drawer + 1,
    // backgroundColor: theme.palette.background.paper,
    background: '#165581',
    color: '#fff',
    '& .MuiToolbar-gutters': {
        minHeight:'64px',
        padding:'unset' // replace with your desired padding
      },
    // borderBottom: `1px solid ${theme.palette.divider}`,
},
lowerNav:{
    background: '#f3edd0;', 
    color:'#f3edd0;'
},
box: {
    paddingTop: '42px',
  },

}));






function YourPatients() {
  
  const token = localStorage.getItem('token');
  const [patients, setPatients] = useState([]);
  const classes = useStyles();
  const [draweropen, setdrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSubcategories,setFilteredSubcategories]=useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [subcategoriesDrawerOpen, setSubcategoriesDrawerOpen] = useState(false);
  const [subcategoriesDrawerOpen1, setSubcategoriesDrawerOpen1] = useState(false);
  const [subcategoriesDrawerOpen2, setSubcategoriesDrawerOpen2] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoriesDrawerOpen3, setSubcategoriesDrawerOpen3] = useState(false);
  const chartRef = useRef(null);



  const all = [
    {
      name: 'Patient A',
      boneage: 4000,
      progress: 2400,
      age: 7400,
    },
    {
      name: 'Patient B',
      boneage: 1000,
      progress: 1200,
      age: 5400,
    },
    {
      name: 'Patient B',
      boneage: 1000,
      progress: 1200,
      age: 5400,
    },

    {
      name: 'Patient B',
      boneage: 600,
      progress: 1200,
      age: 6400,
    },
    {
      name: 'Patient B',
      boneage: 1000,
      progress: 1200,
      age: 5400,
    },
    {
      name: 'Patient B',
      boneage: 300,
      progress: 200,
      age: 7400,
    },
    {
      name: 'Patient B',
      boneage: 500,
      progress: 1200,
      age: 6400,
    },
    {
      name: 'Patient E',
      boneage: 2000,
      progress: 1200,
      age: 6400,
    },
  ];
  
  const data = [
    { month: 'January', Age: 10, Boneage: 5 },
    { month: 'February', Age: 11 , Boneage: 7 },
    { month: 'March', Age: 15 , Boneage: 10 },
    { month: 'April', Age: 20 , Boneage: 23 },
    { month: 'May', Age: 25 , Boneage: 15 },
    { month: 'June', Age: 28 , Boneage: 25   },
  ];



  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   async function fetchPatients() {
  //     console.log("fetching patients...")
  //     try {
  //       const token = localStorage.getItem('token');
  //       const response = await axios.get('http://localhost:8000/Authentication/get-patient/', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setPatients(response.data);
  //       console.log("hereeeee")
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   fetchPatients();
  // }, []);
  


  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8000/Authentication/get-patient/', {
        headers: {
          Authorization: `Bearer ${token}`
        } 
      }) 
      .then((response) => {
        setPatients(response.data);  
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);   



  const handleDrawerOpen = () => {
    setdrawerOpen(true);
};

const handleToggle = () => {
    setOpen(!open);
  };


const handleDrawerClose = () => {
    setdrawerOpen(false);
};

const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
};


const handleSubcategoriesDrawerOpen = ()=> {
 
  };

  const handleSubcategoriesDrawerClose = () => {
    setSubcategoriesDrawerOpen(false);
    setSelectedCategoryId(null);
    setFilteredSubcategories([]);
  };
  const handleSubcategoriesDrawerOpen1 = () => {
    setSubcategoriesDrawerOpen1(true);
  };

  const handleSubcategoriesDrawerClose1 = () => {
    setSubcategoriesDrawerOpen1(false);
  };
  const handleSubcategoriesDrawerOpen2 = () => {
    setSubcategoriesDrawerOpen2(true);
  };

  const handleSubcategoriesDrawerClose2 = () => {
    setSubcategoriesDrawerOpen2(false);
  };
  const handleSubcategoriesDrawerOpen3 = () => {
    setSubcategoriesDrawerOpen3(true);
  };

  const handleSubcategoriesDrawerClose3 = () => {
    setSubcategoriesDrawerOpen3(false);
  };
  const [highlightedCard, setHighlightedCard] = useState(null);

  const handleCardHover = (index) => {
    setHighlightedCard(index);
  };

  const handleCardLeave = () => {
    setHighlightedCard(null);
  };




    const [message, setMessage] = useState('');
    const config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    const navigate = useNavigate();
const handleLogout = async () => {

try {
const response = await axios.put('http://localhost:8000/Authentication/logout/',null,config
);

if (response.status === 200) {
    localStorage.removeItem('token');
    navigate('/');
}
} catch (error) {
setMessage('You\'re not logged in.');
}
};


  return (
    <>
    
    <div style={{backgroundColor:'#d8dfec'}}>
    <h2
  style={{
    marginTop: "27px",
    fontSize: "40px",
    fontFamily: "Ubuntu"
    // 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    
  }}
>
  Your Patients
</h2>


    <div>
    {/* <ResponsiveContainer width="1500px" height="300px"> */}
        <BarChart
          width={1500}
          height={300}
          data={all}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="boneage" stackId="a" fill="#8884d8" />
          <Bar dataKey="progress" stackId="a" fill="#82ca9d" />
          <Bar dataKey="age" fill="#ffc658" />
        </BarChart>
      {/* </ResponsiveContainer> */}
    </div>

    <div className="SubP-list" style={{ marginLeft: '20px' }}>
      <div className='containerSub2'
      style={{
        
      }}      
      >
      <div className="Pastordercontainer">
      <div 
      style={{
        textAlign:"center",
        display:"flex",
        marginLeft:"450px"
      }}
      >
      <input 
            type="text"
            id="productName"
            className="product-request-form-input "
            placeholder="Search in your patients"
            // onChange={(event) => setFirstName(event.target.value)}
                 style={{
                  width:"500px",
                  height:"50px"
                 }}
          />
   <div style={{
        textAlign:"center",

    }}>
    <button type="submit" class="order-btn" style={{
      marginLeft:"40px",
      marginTop:"5px",
    width:"100px",
    height:"40px"       
    }}
          >
Search         </button>
      </div>
   
    </div>
      <ul className="responsive-table">
      {/* <div className="col col-1">
              Your Patients
            </div> */}

        <li className="table-header" style={{
          marginBottom:"20px",
          height:"120px",
          fontWeight:"bold",
            fontSize:"20px",
            marginTop:"50px",

        }}>

          <div className="col col-3" Style={{}}>Name</div>
          <div style={{ paddingLeft: '30px'}} className="col col-4">Age</div>
          <div className="col col-5">Progress</div>
          <div className="col col-6" style={{marginLeft:"60px"}}>Last Visit</div>
          {/* <div className="col col-2"style={{marginLeft:"-20px"}}>View User</div> */}
        </li>
        {patients.map((order) => (
          <li className="table-row " key={order.PatientID}>
            <div className="col col-3" data-label="Total" style={{marginTop:"130px", fontWeight:"bold"
          
          ,fontSize:"30px"
          }}>{order.first_name} {order.last_name}</div>
            <div className="col col-4" data-label="Status"style={{marginTop:"130px"  ,fontWeight:"bold",
            // fontSize:"70px"
}} >    

              <span style={{ paddingRight: '10px',fontWeight:"bold",
            fontSize:"30px", marginLeft:"80px"}} >
              {order.c_age}
            </span>
            

              </div>
            <div style={{ paddingLeft: '20px', marginLeft:"-130px"}} className="col col-5" data-label="Delivery">  
            <LineChart width={400} height={270} data={data} margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="month" /> */}
        {/* <YAxis type="number" domain={[0, 100]} /> */}
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Age" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Boneage" stroke="#82ca9d" activeDot={{ r: 8 }} />

      </LineChart>

</div>
            <div className="col col-6" data-label="Order Date"
            style={{marginTop:"130px", fontWeight:"bold",
            marginLeft:"170px"
            ,fontSize:"30px"
            }}
            >13/10/2022</div>
            <div className="col col-2" data-label="View Items" style={{
              marginTop:"130px" 
            }}>
            <Link to={`/PastOrderItems/${order.PatientID}`}>
  <FontAwesomeIcon icon={faEye} style={{width:'100%', marginLeft:"-70px"}} size="2x" aria-hidden="true" />
</Link>


</div>


          </li>
        ))}
      </ul>
    </div>
      </div>
     
    </div>.
    

    <div class="row5">
  <a href="#">Back to the top <FontAwesomeIcon icon={faArrowUp} /></a>  
</div>



    </div>
    
  </>
  );
}

export default YourPatients;