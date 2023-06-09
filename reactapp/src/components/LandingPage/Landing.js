import React from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Button } from '@mui/material';
import photo1 from './bonnne.png'
import photo3 from './bonnne.png'
import photo2 from './bonnne.png'
// import "animate.css";
import imag2 from './bonnne.png'
import image1 from './bonnne.png'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./Landing.css"
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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




const LandingPageGuest = () => {
  const [Categorys, setCategoryPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [trending, setTrending] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categories2, setCategories2] = useState([]);
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
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

  useEffect(() => {
    axios.get('http://localhost:8000/Products/categories/')
      .then((response) => {
        setCategories2(response.data);
      })
      .catch((error) => {
        console.error(error);
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

  const handleCategoryClick = (id) => {
    setCategoryId(id);
    navigate(`/categories/${id}/products`);

  }
  

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
    
    const [userRole, setUserRole] = useState('');

    const [productRecommendation, setProductRecommendation] = useState(null);

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);
    const [SimilarProducts,setSimilarProducts] = useState([]);

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
    
        navigate(`/SearchResult/${searchValue}`); // navigate to search result page with product IDs as query parameters
    }
    function ImageSlider() {
      const [sliderValue, setSliderValue] = useState(50);
    
      const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };
    
      return (
        <div className="image-slider">
          <img
            className="image-slider__left"
            src={imag2}
            alt="Left Image"
          />
          <div className="image-slider__slider-container">
            <input
              className="image-slider__slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
          <img
            className="image-slider__right"
            src={imag2}
            alt="Right Image"
          />
        </div>
      );
    }
    const handleSearchSubmit = () => {
      const searchValue = inputValue.toLowerCase();
      const url = `http://localhost:8000/Products/search_products/${searchValue}/`;
    
      
    
      axios.get(url)
        .then(response => {
          const matchedProductIds = response.data;
          console.log(`Matching product IDs: ${matchedProductIds}`);
    
          if (matchedProductIds.length === 0) {
            navigate(`/NoMatchesFound`); // navigate to "No Matches Found" page
          } else {
            navigate(`/SearchResult/${searchValue}`); // navigate to search result page with product IDs as query parameters
          }
        })
        .catch(error => console.log(error));
    };
    
    
    setTimeout(() => {
      // code that runs after a certain amount of time has elapsed
      // Get references to the input and suggestion list elements
            const input = document.getElementById('search-field');
      const suggestionList = document.getElementById('suggestions');

      // Attach a click event listener to the document object
      document.addEventListener('click', (event) => {
        const isClickInsideInput = event.target === input;
        const isClickInsideSuggestionList = suggestionList.contains(event.target);

        if (!isClickInsideInput && !isClickInsideSuggestionList) {
          // Clicked outside of the input and suggestion list, close the suggestion list
          suggestionList.style.display = 'none';
        }
      });

      // Show the suggestion list when the input is focused
      // input.addEventListener('focus', () => {
      //   suggestionList.style.display = 'block';
      // });
    }, 1000); 

    useEffect(() => {
      async function fetchPhotos() {
        const response = await axios.get('http://localhost:8000/ShoppingCart/get_all_photos_Categories/',
        { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCategoryPhotos(response.data.categories)
        console.log(response.data.categories)
      }
      fetchPhotos();
    }, []);

    useEffect(() => {
      async function fetchPhotos() {
        const response = await axios.get('http://localhost:8000/Products/get-all-photos/',
        { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPhotos(response.data.photos);
        console.log(response.data.photos)
      }
      fetchPhotos();
    }, []);

    useEffect(() => {
      axios.get('http://localhost:8000/ShoppingCart/trendingproducts/')
        .then(response => {
          setTrending(response.data.top_products);
          console.log("here")

          console.log(response.data.top_products)
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    const [formState, setFormState] = useState({
      patientName: "",
      patientId: "",
      image: null,
    });
  
const handleImageChange = (event) => {
      setFormState({ ...formState, image: event.target.files[0] });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
    };

    useEffect(() => {
      axios.get('http://localhost:8000/Products/products/')
        .then(response => {
          const data = response.data;
          if (typeof data === 'object' && Array.isArray(data.products)) {
            setProducts(data.products);
            console.log(data.products)
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
            })
            .catch(error => {
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
        <div style={{backgroundColor:'#f5f5f5'}}> 
       <Box className={classes.box}>
             <AppBar position="fixed" className={classes.upperNav} elevation={0}>
                <Toolbar>
                <Typography variant="h6" className={classes.title} style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
  <img src={image1} alt="Your Company Logo" style={{ height: '50px', position: 'relative', left: '-10px', marginTop: '-5px' }} />     
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
        to="/register"
        onClick={handleButtonClick}
        className="signin-button"
      >
        <InfoIcon />
        {window.innerWidth > 568 && <span>  &nbsp; About Us &nbsp; &nbsp;</span>}
      </IconButton>
  <IconButton
        color="inherit"
        component={Link}
        to="/register"
        onClick={handleButtonClick}
        className="signin-button"
      >
        <PhoneIcon />
        {window.innerWidth > 568 && <span>  &nbsp;  Contact us &nbsp; &nbsp;</span>}
      </IconButton>
      <IconButton
        color="inherit"
        component={Link}
        to="/register"
        onClick={handleButtonClick}
        className="signin-button"
      >
        <AccountCircleIcon className="icon" />
        {window.innerWidth > 568 && <span>Sign In / Sign Out</span>}
      </IconButton>
      
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
                {  categories2.map(category => (
                <Button color="inherit"  style={{ color: 'white' ,marginRight:'45px' }} onClick={() => handleCategoryClick(category.id)}>{category.name}</Button>

        // <option key={category.id} value={category.id}>{category.name}</option>
      ))}

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
                <ListItem button onClick={handleDrawerClose} component={Link} to="/">
                        <ListItemIcon style={{  marginLeft:'90px'}}>
                            <Home />
                        </ListItemIcon>
                        {/* <ListItemText style={{ textAlign: 'center' }} primary="Home" className={classes.listItem} /> */}
                    </ListItem>
                    <Box height={20} /> {/* Add some space */}

                    <Typography className={classes.bold}>Shop By Category</Typography>
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
  {filteredSubcategories.map(subcategory => (
    <ListItem button key={subcategory.SubCategoryID} onClick={() => {handleCategoryClick(subcategory.SubCategoryID); handleSubcategoriesDrawerClose();handleDrawerClose();}}>
      <ListItemText primary={subcategory.SubCategoryName} />
    </ListItem>
  ))}
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
          <ListItem button component={Link} to="/help">
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Help" className={classes.listItem} />
          </ListItem>
        </List>
      </Drawer>
      
      {/* <div style={{marginTop:'70px'}} className={classes.content}>
      <CategoryPhoto Categorys={Categorys} title={"Categories"}/>
      </div> */}
      {/* carousel */}
      <div className="carousel-container">
     
  <div className="carousel-buttons">
  <h5 className='h5'>good Health For You</h5><br/><br/><br/>
      <h1 className='h'>Automated Bone Age Detection</h1><br/>
    <button className="login-button">Login</button>
    <button className="signup-button">Signup</button>
  </div>
  <Slider {...settings}>
    <div className="carousel-item">
      <img className="carousel-image" src={photo1} alt="Image 1" />
    </div>
    <div className="carousel-item">
      <img className="carousel-image" src={photo2} alt="Image 2" />
    </div>
  </Slider>
</div>
      {/* end of catousel */}
      {/* banner */}
    <div className="container-fluid banner mb-5">
      <div className="container">
        <div className="row gx-0">
          <div className="col-lg-4 wow animate_animated animate_zoomIn" data-wow-delay="0.1s">
            <div className="bg-primary d-flex flex-column p-5" style={{ height: "300px" }}>
              <h3 className="text-white mb-3">Doctors</h3>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Patient1</h6>
                <p className="mb-0">000112</p>
              </div>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Patient2</h6>
                <p className="mb-0">000245</p>
              </div>
              <div className="d-flex justify-content-between text-white mb-3">
                <h6 className="text-white mb-0">Patient3</h6>
                <p className="mb-0">00125</p>
              </div>
              <a className="btn btn-light" href="">Add Patient</a>
            </div>
          </div>
          <div className="col-lg-4 wow animate_animated animate_zoomIn" data-wow-delay="0.3s">
            <div className="bg-dark d-flex flex-column p-5" style={{ height: "300px" }}>
              <h3 className="text-white mb-3">Search For A Patient</h3>
              <div className="date mb-3" id="date">
                <input
                  type="text"
                  className="form-control bg-light border-0 datetimepicker-input"
                  placeholder="Patient Name"
                  style={{ height: "40px" }}
                />
              </div>
              <div className="date mb-3" id="date">
                <input
                  type="text"
                  className="form-control bg-light border-0 datetimepicker-input"
                  placeholder="Patient ID"
                  style={{ height: "40px" }}
                />
              </div>
              <a className="btn btn-light" href="">
                Search Patient
              </a>
            </div>
          </div>
          <div className="col-lg-4 wow animate_animated animate_zoomIn" data-wow-delay="0.6s">
            <div className="bg-secondary d-flex flex-column p-5" style={{ height: "300px" }}>
              <h3 className="text-white mb-3">Enter Your Patients</h3>
              <p className="text-white">
                The BoneAge software can automatically detect bone age from a child'shand X-ray. BoneAge provides accurate and consistent readings, solving the issue of significant reader variability in manual ratings.
              </p>
              <h2 className="text-white mb-0">+012 345 6789</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
{/* banner ended */}
{/* about start */}
<div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <h1>About Us</h1>
            <h4>
              The BoneAge software can automatically Detect bone age from a
              child's hand X-ray. BoneAge provides accurate and consistent
              readings, solving the issue of significant reader variability in
              manual ratings.
              Leading paediatric radiology departments have seamlessly
              incorporated BoneXpert into their operations. This offers a more
              accurate adult height prediction, a better input for the doctor's
              diagnosis, and more effective treatment. Bone age is now provided
              by BoneXpert as soon as the X-ray is recorded, which has improved
              clinic workflow and sped up patient treatment.
              BoneXpert is economical from day one because it runs on existing
              hardware and is charged per analysis              . By freeing up doctors from laborious manual ratings, patients
              will receive better care.
            </h4>
            <Link to="/appointment" className="btn btn-primary py-3 px-5 mt-4 wow zoomIn" data-wow-delay="0.6s">JOIN US</Link>
          </div>
          <div className="col-lg-5" style={{ minHeight: "500px" }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded wow zoomIn"
                src={photo3}
                data-wow-delay="0.9s"
                style={{ objectFit: "cover", width: "80px" }}
                alt="Hand X-ray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* about ended */}
    <div className="container-fluid bg-black bg-appointment-overlay my-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6 py-5">
            <div className="py-5">
              <h1 className="display-5 text-white mb-4">Bone Age Detection And Monitoring For Your Patients</h1>
              <p className="text-white mb-0">The BoneAge software can automatically Detectbone age from a child's hand X-ray. BoneAge provides accurate and consistent readings, solving the issue of significant reader variability in manual ratings.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
              <h1 className="text-white mb-4">Add Your Patients</h1>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <input type="text" className="form-control bg-light border-0" placeholder="Patient Name" style={{ height: "55px" }} name="patientName" value={formState.patientName} onChange={handleInputChange} />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input type="email" className="form-control bg-light border-0" placeholder="Patient ID" style={{ height: "55px" }} name="patientId" value={formState.patientId} onChange={handleInputChange} />
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="date" id="date1" data-target-input="nearest">
                      <input type="file" className="form-control bg-light border-0 datetimepicker-input" placeholder="Choose image" style={{ height: "55px", width: "530px" }} name="image" onChange={handleImageChange} />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-dark w-100 py-3" type="submit">Add Patient</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
{/* spiner */}
<div class="container-fluid bg-offer my-5 pl-6 wow fadeInUp" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 wow zoomIn" data-wow-delay="0.6s">
                <div class="offer-text text-center rounded p-5">
                    <h1 class="display-5 text-white">Register Now </h1>
                    <p class="text-white mb-4">Bone Age Detection And Monitor For Your Patients</p>
                    <a href="appointment.html" class="btn btn-dark py-3 px-5 me-3">Add Pateint</a>
                    <a href="" class="btn btn-light py-3 px-5">Read More</a>
                </div>
            </div>
        </div>
    </div>
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

      <footer>
      <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
       </head>
       <div class="row5">
  <a href="#">Back to the top <FontAwesomeIcon icon={faArrowUp} /></a>  
</div>
       <div class="row4">  
</div>


        <div class="row1">
          <div>
          <h1>We are always here to help</h1>
          <h1>Reach out to us through any of these support channels</h1>
          </div>
          <div class="support-block">
          <i class="fa fa-phone" aria-hidden="true">
            <h3>Phone Support</h3>
            <h3 style={{marginRight:'18px'}}>19000</h3>
            </i>
          </div>
          <div class="support-block">
          <i class="fa fa-envelope" aria-hidden="true"></i>
            <h3>Email Support</h3>
            <h3 style={{marginRight:'9px'}}>ECS@gmail.com</h3>
          </div>
          <div class="support-block">
          <i class="fa fa-question-circle" aria-hidden="true"></i>
            <h3>Help Center</h3>
            <h3 style={{marginRight:'10px'}}>help.ecs.net</h3>
          </div>
        </div>

        <div class="row2">
        <img src={image1}/>

        <a href="#" class="align-right">Careers</a>   
        <a href="#" class="align-left">Warranty Policy</a>
        <a href="#" class="align-left">Sell with us</a>
        <a href="#" class="align-left">Terms of use</a>
        <a href="#" class="align-left">Terms of sale</a>
        <a href="#" class="align-left">Privacy Policy</a>

        </div>
        <div class="row3">

        </div>


<div class="row ">
  <div class="col-md-3">
    <h4>Get to know us</h4>
    <ul>
      <li><a href="#">About ECS</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">ECS Consultancy</a></li>
    </ul>
  </div>
  <div class="col-md-3">
    <h4>Shop with us</h4>
    <ul>
      <li><a href="#">Your Account</a></li>
      <li><a href="#">Your Pateints</a></li>
      <li><a href="#">Your Address</a></li>
      <li><a href="#">Your Lists</a></li>
    </ul>
  </div>
  <div class="col-md-3">
    <h4>Let us help you</h4>
    <ul>
      <li><a href="#">Help</a></li>
      <li><a href="#">Shipping & Delivery</a></li>
      <li><a href="#">Return & Replacements</a></li>
    </ul>
  </div>
  <div class="col-md-3">
    <h4>Our Social media platform</h4>
    <ul>
      <li><a href="#">Instagram</a></li>
      <li><a href="#">Facebook</a></li>
      <li><a href="#">LinkedIn</a></li>
    </ul>
  </div>
</div>
<div class="row4
">

  <h0>Conditions of Use & SalePrivacy NoticeInterest-Based Address</h0>
  <h0>2022 - 2023, BAA</h0>



</div>
</footer>
<ImageSlider/>

    </div>
  );
};

export default LandingPageGuest;