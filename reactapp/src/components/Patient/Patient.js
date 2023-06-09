import React, { useState, useEffect ,useRef , PureComponent } from 'react';
import axios from 'axios';
import './Patient.css';
import { PieChart, Pie } from "recharts";
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Modal, Navbar } from "react-bootstrap";
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
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";
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






function PastOrders() {
  
  const token = localStorage.getItem('token');
  const {patientID} = useParams(); 

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
  const [patient, setPatient] = useState([]);



  
  const data = [
    { month: 'January', Age: 10, Boneage: 5 ,note:"sss"},
    { month: 'February', Age: 11 , Boneage: 7 ,note:"sss"},
    { month: 'March', Age: 15 , Boneage: 10 ,note:"sss"},
    { month: 'April', Age: 20 , Boneage: 23 ,note:"sss"},
    { month: 'May', Age: 25 , Boneage: 15 ,note:"sss"},
    { month: 'June', Age: 28 , Boneage: 25 ,note:"sss"  },
  ];



  
 

  useEffect(() => {
    // console.log(PatientID)

    axios.get(`http://localhost:8000/Authentication/patient/${patientID}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const data = response.data;
      setPatient(response.data);
  
      
          
        })
        .catch(error => {
          console.log(error);
        });
    }
    , [patientID])
    
  


  
  
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


const handleSubcategoriesDrawerOpen = (categoryId) => {
  // console.log('Selected category ID:', categoryId);
    setSelectedCategoryId(categoryId);
    const filteredSubcategories = subcategories.filter(subcategory => subcategory.Category__CategoryID === categoryId);
    console.log('Filtered subcategories:', filteredSubcategories);
    setFilteredSubcategories(filteredSubcategories);
    setSubcategoriesDrawerOpen(true);
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

function Chart2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Sample data
    const sampleData = [
      { year: '2020', boneAge: 10 },
      { year: '2021', boneAge: 12 },
      { year: '2022', boneAge: 14 },
      { year: '2023', boneAge: 10 },
      { year: '2024', boneAge: 15 },
      { year: '2020', boneAge: 10 },
      { year: '2021', boneAge: 12 },
      { year: '2022', boneAge: 14 },
      { year: '2023', boneAge: 10 },
      { year: '2024', boneAge: 15 },
      { year: '2020', boneAge: 10 },
      { year: '2021', boneAge: 12 },
      { year: '2022', boneAge: 14 },
      { year: '2023', boneAge: 10 },
      { year: '2024', boneAge: 15 },
    ];

    setData(sampleData);
  }, []);
 
  const innerdata = [
    { name: 'C1', value: 100 },
    { name: 'C2', value: 20 },
    { name: 'C3', value: 300 },
    { name: 'C4', value: 90 },
  ];
  
  const outerdata = [
    { name: 'P1', value: 10 },
    { name: 'P2', value: 100 },
    { name: 'P3', value: 20 },
    { name: 'P4', value: 30 },
    { name: 'P5', value: 90 }
  ];
  charts(FusionCharts);

charts(FusionCharts);

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  
  return (
    <div className="chart-container">
                <CartesianGrid strokeDasharray="3 3" />

      <BarChart width={1200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
>
        <Bar dataKey="boneAge" fill="rgb(43, 127, 128)" /> 
          <Legend />
        <XAxis dataKey="year" axisLine={{ strokeWidth: 2, stroke: 'blue' }} />   
        <YAxis axisLine={{ strokeWidth: 2, stroke: 'blue' }} />  
        <Tooltip labelFormatter={(value) => `Year: ${value}`} formatter={(value) => [`Bone Age: ${value}`,]} />

      </BarChart>     
    </div>   
  )
}


const patientData = [
  {
    id: 1,  
    name: "John Doe",
    age: 10, 
    boneage: 9,
    diagnosis: "Delayed bone age",
    imageUrl: "./10005.png",
    date:"1/1/2003"
  },
  {
    id: 2,  
    name: "Jane Doe",    
    age: 12,    
    boneage: 11,   
    diagnosis: "Accelerated bone age",    
    imageUrl: "./10005.png" ,
    date:"1/1/2003"
  },
  {
    id: 3, 
    name: "Sam Smith",      
    age: 8,        
    boneage: 7,        
    diagnosis: "Normal bone age for chronological age",        
    imageUrl: "./10005.png" ,
    date:"1/1/2003"
  },
  // ... more patients
]


const datas = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PieChartComponent() {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={datas}
        cx={120}
        cy={120}
        
        fill="#8884d8"
        
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
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
{
    patient.first_name
}   
   {
     patient.last_name
   }
 </h2>
   </div>
    <div style={{backgroundColor:'#d8dfec', marginTop:"-30px"}}>
    <div className="app-container">
      
        <div className="chart2">
        <Chart2 />
  <PieChartComponent/>
        </div>
    </div>

    <div className="SubP-list" style={{ marginLeft: '20px' }}>
      <div className='containerSub2'
      style={{
        
      }}      
      >
      <div className="Pastordercontainer">
     
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

          <div className="col col-3" Style={{}}>Date</div>
          <div className="col col-6" style={{marginLeft:"60px"}}>Img </div>
          <div style={{ paddingLeft: '30px'}} className="col col-4"> Age</div>
          <div className="col col-6" style={{marginLeft:"60px"}}>Bone Age</div>
         
          {/* <div className="col col-2"style={{marginLeft:"-20px"}}>View User</div> */}
        </li>
        {patientData.map((order) => (
          <li className="table-row " key={order.id}>
            <div className="col col-3" data-label="Total" style={{marginTop:"70px", fontWeight:"bold"
          
          ,fontSize:"30px"
          }}>{order.date} </div>
          <div style={{ paddingRight: '5px',fontWeight:"bold",
            fontSize:"30px", marginTop:"70px",marginLeft:"0px",position:'absolute' ,left:"350px",}} >
              <img src={require('./10005.png')} style={{marginTop:"-70px",width:'200px',height:'120px',borderRadius:'0px'}}/>
           

              </div>

              <div style={{ paddingRight: '5px',fontWeight:"bold",
            fontSize:"30px", marginTop:"70px",marginLeft:"0px",position:'absolute' ,left:"750px"}} >
              {order.boneage}
           

              </div>
          
          
              <div style={{ paddingRight: '5px',fontWeight:"bold",
            fontSize:"30px", marginTop:"70px",marginLeft:"0px",position:'absolute' ,left:"1200px"}} >
              {order.age}
           

              </div>
              
          
            {/* <div className="col col-6" data-label="Order Date"
            style={{marginTop:"130px", fontWeight:"bold",
            marginLeft:"170px"
            ,fontSize:"30px"
            }}
            >13/10/2022</div> */}
            <div className="col col-2" data-label="View Items" style={{
              marginTop:"130px" 
            }}>
            <Link to={`/PastOrderItems/${order.PatientID}`}>
  <FontAwesomeIcon url={order.imageUrl} style={{width:'100%', marginLeft:"-70px"}} size="2x" aria-hidden="true" />
</Link>


</div>


          </li>
        ))}

      </ul>
    </div>
    
      </div>
     
    </div>.
    

    



    </div>
    
  </>
  );
}

export default PastOrders;