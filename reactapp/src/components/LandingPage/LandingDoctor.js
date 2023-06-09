
// import ProfileIconUser from '../landingPage/profileIconUser';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Box from '@material-ui/core/Box';
import { Button } from '@mui/material';
// import photo1 from './handxray.jpg'
// import photo2 from './handxray3.jpg'
import "./LandingDoctor.css"
import image1 from './logob.jpg'
import Carousel from "react-multi-carousel";
import photop from './patient.png'
import blogp from './blog.png'
import conf from './conf.jpg'
import bee from './bee.jpg'

// import requireAuth from './requireAuth';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./landingPage.css"
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Offerscontainer from '../Subcategory/Offerscontainer';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "react-multi-carousel/lib/styles.css";
// import CategoryPhoto from '../Subcategory/CategoryPhoto';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    TextField,
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
    AccountBox,
    Badge
} from '@material-ui/icons';
import Logout from '@mui/icons-material/Logout';
// import ProductsContainer from '../Subcategory/productscontainer';
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
  // photos:{
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover'
  
  // },
  // searchButton: {
  //     marginRight: theme.spacing(100),
  //     backgroundColor: 'transparent',
  //   },
    // searchInput: {
    //   width: '100%',
    //   marginLeft:'40px',
    //   '& .MuiOutlinedInput-notchedOutline': {
    //     borderColor: 'white'
    //   },
    //   '& .MuiInputLabel-root': {
    //     color: 'white'
    //   },
    //   '& .MuiInputBase-root': {
    //     color: 'white'
    //   }
    // },
    
    
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




const LandingDoctor = () => {
  const [Categorys, setCategoryPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categories2, setCategories2] = useState([]);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  const patients = [
    {
      id: 1,
      name: "Jungkook Jeon",
      age: 9
    },
    {
      id: 2,
      name: "Namjoon  Kim",
      age: 8
    },
    {
      id: 3,
      name: "Yoongi Min",
      age: 5
    },
    {
        id: 6,
        name: "Seokjin Kim",
        age: 11
      },
      {
        id: 4,
        name: "Taehyung Kim",
        age: 15
      },
      {
        id: 5,
        name: "Jimin Park",
        age: 15
      },
      {
        id: 7,
        name: "Hoseok Jung",
        age: 16
      }
  ];

  const blogs = [
    {
      id: 1,
      name: "Evaluation of Bone Age in Children",
      age: "Dr. Eman Ouda"
    },
    {
      id: 2,
      name: "Bone Age Assessment Methods",
      age: "Dr. Kim Rm"
    },
    {
      id: 3,
      name: "Short stature",
      age: "Dr. Kim Jisoo"
    },
    {
        id: 6,
        name: "Osteoporosis",
        age: "Dr. Lee Do Hyun "
      },
      {
        id: 4,
        name: "Early recognition of growth abnormalities",
        age: "Dr. Ra Mi Ran"
      },
      {
        id: 5,
        name: "Osteoporosis: part 2",
        age: "Dr. Lee Do Hyun"
      },
      {
        id: 7,
        name: "Normal growth",
        age: "Dr. Ra Mi Ran"
      }
  ];


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

  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    adaptiveHeight: true
  };

  useEffect(() => {
    axios.get('http://localhost:8000/Products/cat/')
      .then((response) => {
        console.log(response.data)
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
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
        <div style={{backgroundColor:'white'}}> 
       <Box className={classes.box}>
             <AppBar position="fixed" className={classes.upperNav} elevation={0}>
                <Toolbar>
                <Typography variant="h6" className={classes.title} style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
  <img src={image1} alt="Your Company Logo" style={{ height: '50px', position: 'relative', left: '10px', marginTop: '-5px', borderRadius:"10px" }} />     
  <div  style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ position: 'relative', margin: '0 auto' }}>
    </div>
   
  </div>
</Typography>


                    


                    

{/* <script>
  const button = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownContent.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      button.textContent = "Deliver to: " + event.target.textContent;
    }
  });
</script> */}



<div className="icons-container">
  {/* <IconButton
    color="inherit"
    component={Link}
    to="/Cart"
    onClick={window.location.reload}
    className="signin-button"
  >
  </IconButton> */}
  

  <div style={{ display: 'flex', alignItems: 'center' }}>
  <IconButton
        color="inherit"

        className="signin-button"
      >
        <InfoIcon />
        {window.innerWidth > 568 && <span>  &nbsp; About Us &nbsp; &nbsp;</span>}
      </IconButton>
  <IconButton
        color="inherit"
    
        className="signin-button"
      >
        <PhoneIcon />
        {window.innerWidth > 568 && <span>  &nbsp;  Contact us &nbsp; &nbsp;</span>}
      </IconButton>
      {!token ?(<IconButton
       color="inherit"
       component={Link}
       to="/register"
       className="signin-button"
     >
       <AccountCircleIcon className="icon" />
       {window.innerWidth > 568 && <span>Sign In </span>}
     </IconButton>):
     
     
     <IconButton
       color="inherit"
       component={Link}
       to="/profile"
      //  onClick={handleButtonClick}
       className="signin-button"
     >
       <AccountCircleIcon className="icon" />
     
     </IconButton>
     
     } 
      
    </div>
  
</div>




</Toolbar>
            </AppBar>
            <Box className={classes.box}> {/* Set the padding-top value based on your needs */} 
            <AppBar position="fixed" className={classes.lowerNav}>
            <Toolbar className="custom-toolbar22">



                <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="white"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            </Box>
            </Box>
            <Drawer
            className={classes.drawer}
            variant="temporary"
            open={draweropen}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
      >
                <div className={classes.toolbar} style={{  minHeight:'0'}}  />
                
                <List>
                <List>
                <ListItem button onClick={handleDrawerClose} component={Link} to="/home">
                        <ListItemIcon style={{  marginLeft:'90px'}}>
                            <Home />
                        </ListItemIcon>
                        {/* <ListItemText style={{ textAlign: 'center' }} primary="Home" className={classes.listItem} /> */}
                    </ListItem>
                    <Box height={20} /> {/* Add some space */}

                    <Typography className={classes.bold}></Typography>
              {categories.length > 0 && categories.map((category) => (
  <ListItem key={category.id} button onClick={() => handleSubcategoriesDrawerOpen(category.CategoryID)}>
    <ListItemText primary={category.CategoryName} className={classes.listItem} />
    {subcategoriesDrawerOpen ? <ArrowBackIosRounded style={{ fontSize: '1rem' }} /> : <ArrowForwardIosRounded style={{ fontSize: '1rem' }} />}
  </ListItem>
))}


            </List>


            <Drawer
  className={classes.drawer}
  variant="temporary"
  open={subcategoriesDrawerOpen}
  onClose={handleSubcategoriesDrawerClose}
  classes={{
    paper: `${classes.drawerPaper} ${classes.subcategoriesDrawerPaper}`,
  }}
>
  <div className={classes.toolbar} />
  <List>
  <ListItem button onClick={handleSubcategoriesDrawerClose}>
    <ListItemIcon>
      <ArrowBack />
    </ListItemIcon>
    <ListItemText primary="MAIN MENU" />
  </ListItem>
</List>
</Drawer>

           <Drawer
            className={classes.drawer}
            variant="temporary"
            open={subcategoriesDrawerOpen1}
            onClose={handleSubcategoriesDrawerClose1}
            classes={{
              paper: `${classes.drawerPaper} ${classes.subcategoriesDrawerPaper}`,
            }}
          >
            <div className={classes.toolbar} />
            <List>
            <ListItem button onClick={handleSubcategoriesDrawerClose1}>
            <ListItemIcon>
                <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="MAIN MENU" />
            </ListItem>
              <ListItem button>
                <ListItemText primary="Adidas" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Nike" />
              </ListItem>

              {/* Add more subcategories here */}
            </List>
            
          </Drawer>
          <Drawer
            className={classes.drawer}
            variant="temporary"
            open={subcategoriesDrawerOpen2}
            onClose={handleSubcategoriesDrawerClose2}
            classes={{
              paper: `${classes.drawerPaper} ${classes.subcategoriesDrawerPaper}`,
            }}
          >
            <div className={classes.toolbar} />
            <List>
            <ListItem button onClick={handleSubcategoriesDrawerClose2}>
            <ListItemIcon>
                <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="MAIN MENU" />
            </ListItem>
              <ListItem button>
                <ListItemText primary="Harry Potter" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Game of Thrones" />
              </ListItem>
              {/* Add more subcategories here */}
            </List>
            
          </Drawer>
          <Drawer
            className={classes.drawer}
            variant="temporary"
            open={subcategoriesDrawerOpen3}
            onClose={handleSubcategoriesDrawerClose3}
            classes={{
              paper: `${classes.drawerPaper} ${classes.subcategoriesDrawerPaper}`,
            }}
          >
            <div className={classes.toolbar} />
            <List>
            <ListItem button onClick={handleSubcategoriesDrawerClose3}>
            <ListItemIcon>
                <ArrowBack />
            </ListItemIcon>
            <ListItemText primary="MAIN MENU" />
            </ListItem>
              {/* Add more subcategories here */}
            </List>
            
          </Drawer>
                </List>
                <List className={classes.bottomList}>
                <ListItem button component={Link} to="/profile">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
            <ListItemText primary="profile" className={classes.listItem} />
          </ListItem>
          <ListItem button component={Link} to="/yourpatients">
            <ListItemIcon>
              <MedicalInformationIcon />
            </ListItemIcon>
            <ListItemText primary="your patients" className={classes.listItem} />
          </ListItem>
          <ListItem button component={Link} to="/help">
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" className={classes.listItem} />
          </ListItem>
        </List>
      </Drawer>
      <div className={classes.content}>
      {/* <Offerscontainer photos={photos} title={"photos"}/> */}
      </div>
      {/* <div style={{marginTop:'70px'}} className={classes.content}>
      <CategoryPhoto Categorys={Categorys} title={"Categories"}/>
      </div> */}

      <div style={{
        height:"70px"
      }}>
      </div>
      <div className='fadeInDisplayName'>
      <div  >
      <div className='ya-welcome' style={{backgroundColor:"", marginLeft:"60px" ,height: "300px", width:"700px" }}>
      <h1 style={{ marginLeft:"20px", textAlign: "start", fontWeight:"bold", color:"#003F5D" }}>Welcome Back DR. Ouda!</h1>
      <h2 style={{marginLeft:"20px", textAlign: "start", fontSize:"25px" }}>Welcome to your dedicated website, Dr. Ouda! 
      This digital space is designed exclusively for you, where you can navigate through the realms of medical knowledge, connect with colleagues, and embark on new horizons of innovation. Feel empowered as you leave your footprints in the sands of medical advancements and inspire others with your expertise. May this platform be the gateway to endless opportunities and a catalyst for your professional growth. 
      Enjoy your journey and make the most of this extraordinary virtual realm!</h2>
      <div className='skeletal-hand'></div> 
    </div></div>

</div>  
<div  >
<div style={{
    textAlign: "center",
}}>
    <a href="/AddApp/baa">
        <button type="submit" class="order-btn" style={{
            marginLeft: "10px",
            marginTop: "140px",
        }}>
            Use BAA now!
        </button>
    </a>
</div>

</div>
    <div
    style={{
        alignItems:"center",

    }}
    
    >
 
    <hr
    style={{
        padding:"30px",
         marginLeft:"10px"
        ,marginBottom:"30px",
        marginTop:"70px",
        marginRight:"10px"

    }}
    ></hr>


<div className='test111'>
    <div className='test111-title'>Your Patients

    </div> 
    
    <div style={{
        fontWeight:"bolder",
    }}>

    <Link style={{
        color:"#7bacb8",
        fontSize:"20px",
        textDecoration: 'none'
    }} to="/yourpatients"> View all patients </Link>

                              &nbsp; &nbsp;   
    </div>
    <div style={{
        marginBottom:"17px",
        fontWeight:"bolder",
    }}>

    <Link style={{
        color:"#7bacb8",
        fontSize:"20px",
        textDecoration: 'none'
    }} to="/newpatient"> + Add a new patient </Link>
    &nbsp; &nbsp;   
    </div>
    <Carousel responsive={responsive}>
         {Array.isArray(patients) && patients.map(patient => (
          <div className="product-card" key={patient.id}>
            <div className="product-card-image">
              <img src={photop} alt={patient.name} style={{ borderRadius: '0',objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} />
            </div>
            <div className="product-card-details">
              <h3 style={{ marginBottom: '8px', fontWeight:"bold", fontSize:"25px" }}>{patient.name}</h3>
              <p className="product-price" style={{fontSize:"17px" }}>{patient.age} years old</p>

      
            </div>
          </div>
        ))}

    </Carousel>
    </div>
    
    <hr
    style={{
        padding:"30px",
     marginLeft:"10px"
        ,marginBottom:"30px",
        marginTop:"80px",
        marginRight:"10px"

    }}
    ></hr>
      </div>
      


      <div >
      <div className="dfull-screen-carousel">

        
      <Slider {...settings}>
        

        <div className="dcarousel-item">

          <img
            className="dcarousel-image"
            src={conf}
            alt="Image 1"
          />
        </div>
        
        <div className="dcarousel-item">
          <img
            className="dcarousel-image"
            src={bee}
            alt="Image 2"
          />
        </div>
      </Slider>

    </div>
      </div>
      

      
<div className='test111'>
    <div className='test111-title'>Blogs

    </div> 
    
    <div style={{
        fontWeight:"bolder",
    }}>

    <Link style={{
        color:"#7bacb8",
        fontSize:"20px",
        textDecoration: 'none'
    }} to="/view"> View your blogs </Link>

                              &nbsp; &nbsp;   
    </div>
    <div style={{
        marginBottom:"17px",
        fontWeight:"bolder",
    }}>

    <Link style={{
        color:"#7bacb8",
        fontSize:"20px",
        textDecoration: 'none'
    }} to="/new"> + Add a new blog </Link>
    &nbsp; &nbsp;   
    </div>
    <Carousel responsive={responsive}>
         {Array.isArray(blogs) && blogs.map(blog => (
          <div className="product-card" key={blog.id}>
            <div className="product-card-image">
              <img src={blogp} alt={blog.name} style={{ borderRadius: '0',objectFit: 'cover', maxHeight: '200px', maxWidth: '200px' }} />
            </div>
            <div className="product-card-details">
              <h3 style={{ marginBottom: '8px', fontWeight:"bold", fontSize:"25px" }}>{blog.name}</h3>
              <p className="product-price" style={{fontSize:"17px" }}>by {blog.age} </p>

      
            </div>
          </div>
        ))}
    </Carousel>
    </div>




      {/* return (
  <div className="parent">
    <Carousel
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
    >
      <div className="slider">
        <img src="Ecommerce/media/images/pic3_TqIVGYc.png" />
      </div>
      <div className="slider">
        <img src="Ecommerce/media/images/pic3_TqIVGYc.png" />
      </div>
      <div className="slider">
        <img src="Ecommerce/media/images/pic3_TqIVGYc.png" />
      </div>
    </Carousel>
  </div>
); */}

  
 
  {/* <button onclick="scrollToTop()" style="width:70%;">Back to top</button> */}
  <div class="row5">
  <a href="#">Back to the top <FontAwesomeIcon icon={faArrowUp} /></a>  
</div>
      {/* <footer>
      <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
       </head>

       <div class="row4">  
</div>


        
</footer> */}


    </div>
  );
};

export default LandingDoctor;