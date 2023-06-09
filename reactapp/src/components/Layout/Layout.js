
import React from 'react';
// import ProfileIconUser from './profileIconUser.png';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Button } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

// import image1 from './white_logo.png'
import image1 from './hand.jpg'
import requireAuth from './requireAuth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
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
    AccountBox
} from '@material-ui/icons';
import Logout from '@mui/icons-material/Logout';

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





const Layout = ({ children }) => {
  // const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/Products/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const handleCategoryClick = (id) => {
    setCategoryId(id);
    navigate(`/categories/${id}/products`);

  }
  
  const token = localStorage.getItem('token');

    const classes = useStyles();
    const [draweropen, setdrawerOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [open, setOpen] = useState(false);
    const [subcategoriesDrawerOpen, setSubcategoriesDrawerOpen] = useState(false);
    const [subcategoriesDrawerOpen1, setSubcategoriesDrawerOpen1] = useState(false);
    const [subcategoriesDrawerOpen2, setSubcategoriesDrawerOpen2] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoriesDrawerOpen3, setSubcategoriesDrawerOpen3] = useState(false);
    
    const [userRole, setUserRole] = useState('');

    const [productRecommendation, setProductRecommendation] = useState(null);

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);

    const handleInputChange = (e) => {
      const inputVal = e.target.value;
      setInputValue(inputVal);
  
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().startsWith(inputVal.toLowerCase())
      );
      setFilteredSuggestions(filteredProducts.map((product) => product.name));
  
      // clear filtered suggestions if input is empty
      if (!inputVal) {
        setFilteredSuggestions([]);
      }
    };

    const handleSuggestionClick = (suggestion) => {
      const selectedProduct = products.find((product) => product.name === suggestion);
      setInputValue(selectedProduct.name);
      setFilteredSuggestions([]);
      console.log("handlesuggestionclick")
    
      // Call handleSearchSubmit with the selected product name
      handleSearchSubmit2(selectedProduct.name);
      console.log("searched: ", selectedProduct.name)
    }
    const handleSearchSubmit2 = (searchValue) => {
      const toBeSaved= searchValue;
      searchValue = searchValue.toLowerCase();
    
      const matchedProducts = products.filter(product => {
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        return name.includes(searchValue) || description.includes(searchValue);
      });
    
      // get words from search value to compare against product descriptions
      const searchWords = searchValue.split(' ');
    
      // filter matched products by those with similar descriptions
      const SearchProducts = matchedProducts.filter(product => {
        const productWords = product.description.toLowerCase().split(' ');
        return searchWords.some(word => productWords.includes(word));
      });
    
      const matchedProductIds = SearchProducts.map(product => product.id);
      console.log(`Matching product IDs: ${matchedProductIds}`);
    
      const token = localStorage.getItem('token');
      console.log(token)
      axios.post('http://localhost:8000/Products/search/save/', { query: toBeSaved }, {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => {
        console.log(response.data);
        navigate(`/SearchResult/${matchedProductIds}`); // navigate to search result page with product IDs as query parameters
      })
      .catch(error => console.log(error));
    }

    
    

  
 
    
    // useEffect(() => {
    //     axios.get('http://localhost:8000/Authentication/get_profile/'
    //     , {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }})
    //     .then((response) => {
    //        setRole(response.data.Role);
    //        setUser(response.data.username);
    //        setEmail(response.data.email);
    //        setName(response.data.first_name)
    //        setNaame(response.data.last_name)
    //        setPhoneNumber(response.data.PhoneNumber)
    //        setDisplayname(response.data.DisplayName)
    //        setAddress(response.data.Address)
    //        setImg(response.data.Img)
    //       console.log(response.data.user)})
    //       .catch((error) => {
    //         console.error(error);
    //       }); 
      
    //   }, []);
    
    //   const [role, setRole] = useState(userDetails.Role);
    //   const [first_name, setName] = useState(userDetails.first_name);
    //   const [email, setEmail] = useState(userDetails.email);
    //   const [last_name, setNaame] = useState(userDetails.last_name);
    //   const [PhoneNumber, setPhoneNumber] = useState(userDetails.PhoneNumber);
    //   const [Address, setAddress] = useState(userDetails.Address);
    //   const [username , setUser] = useState(userDetails.username);
    //   const [DisplayName , setDisplayname] = useState(userDetails.DisplayName);
    //   const [Img, setImg] = useState(userDetails.Img);

    useEffect(() => {
      axios.get('http://localhost:8000/Products/products/')
        .then(response => {
          const data = response.data;
          if (typeof data === 'object' && Array.isArray(data.products)) {
            setProducts(data.products);
            console.log("products: ", data.products)
          } else {
            console.log('Invalid response data format');
          }
        })
        .catch(error => {
          console.log('Error fetching products:', error);
        });
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8000/Products/subcat/')
            .then(response => {
                setSubcategories(response.data);
                console.log("subcategory:",response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleButtonClick = () => {
      const width = window.innerWidth;
      if (width < 995) {
        navigate('/mobilereg');
      } else {
        navigate('/register');
      }
      window.location.reload();
    };
    
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

    const handleSubcategoriesDrawerOpen = () => {
        setSubcategoriesDrawerOpen(true);
      };

      const handleSubcategoriesDrawerClose = () => {
        setSubcategoriesDrawerOpen(false);
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
       component={Link}
      //  to="/register"
      //  onClick={handleButtonClick}
       className="signin-button"
     >
       <InfoIcon />
       {window.innerWidth > 568 && <span>  &nbsp; About Us &nbsp; &nbsp;</span>}
     </IconButton>
 <IconButton
       color="inherit"
       component={Link}
      //  to="/register"
      //  onClick={handleButtonClick}
       className="signin-button"
     >
       <PhoneIcon />
       {window.innerWidth > 568 && <span>  &nbsp;  Contact us &nbsp; &nbsp;</span>}
     </IconButton>
    {!token ?(<IconButton
       color="inherit"
       component={Link}
       to="/register"
       onClick={handleButtonClick}
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
          
             {/* Add more subcategories here */}
           </List>
           
         </Drawer>
               </List>
               <List className={classes.bottomList}>

               <ListItem button onClick={handleDrawerClose}component={Link} to="/profile">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
            <ListItemText primary="profile" className={classes.listItem} />
          </ListItem>
          <ListItem button onClick={handleDrawerClose} component={Link} to="/yourpatients">
            <ListItemIcon>
              <MedicalInformationIcon />
            </ListItemIcon>
            <ListItemText primary="your patients" className={classes.listItem} />
          </ListItem>
         

         <ListItem button onClick={handleDrawerClose}  component={Link} to="/help">
           <ListItemIcon>
             <Help />
           </ListItemIcon>
           <ListItemText primary="Help" className={classes.listItem} />
         </ListItem>
       </List>
     </Drawer>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;