
import React from 'react';
import ProfileIconUser from '../landingPage/profileIconUser';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Button } from '@mui/material';
import image1 from './white_logo.png'
import requireAuth from './requireAuth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useMediaQuery } from '@material-ui/core';
import { isMobile } from 'react-device-detect';



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
    LocationSearching,
    LocationOn,
    ShoppingCartRounded
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
    searchButton: {
      marginRight:'600px',
      backgroundColor: 'transparent',
      },
      searchInput: {
        width: '100%',
        // marginRight:'400px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white'
        },
        '& .MuiInputLabel-root': {
          color: 'white'
        },
        '& .MuiInputBase-root': {
          color: 'white'
        }
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
    },
    toolbar: theme.mixins.toolbar,
    listItem: {
        color: theme.palette.text.primary,
    },
    bottomList: {
        position: 'absolute',
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
            padding: '0px 0px', // replace with your desired padding
          },
        // borderBottom: `1px solid ${theme.palette.divider}`,
    },
    lowerNav:{
        background: '#fff', 
        color:'#152540'
    },
    box: {
        paddingTop: '70px',
      },

}));



const Layout = ({ children }) => {
  // const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mobile, setMobile] = useState([]);
  const screenWidth = window.innerWidth;


    // const isMobile = useMediaQuery('(max-width:600px)');


  useEffect(() => {
    axios.get('http://localhost:8000/Products/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    console.log("Is mobile?", isMobile);
    setMobile(isMobile);
  }, []);


  const handleCategoryClick = (id) => {
    setCategoryId(id);
    if (screenWidth < 800) {
      navigate(`/mobile/categories/${id}/products`);
    } else {
      navigate(`/categories/${id}/products`);
    }
  };

  
  

    let userDetails = JSON.parse(localStorage.getItem('user'));
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
    // const navigate = useNavigate();
  
  function handleNavigation() {
    const width = window.innerWidth;

    if (width < 995) {
      navigate('/PastOrdersM');
    } else {
      navigate('/PastOrders');
    }
  }

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

    const handleSearchSubmit = () => {
      const searchValue = inputValue.toLowerCase();
    
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
      console.log(token);
    
      if (matchedProductIds.length === 0) {
        navigate(`/NoMatchesFound`); // navigate to "No Matches Found" page
      } else {
        axios.post('http://localhost:8000/Products/search/save/', { query: inputValue }, {
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
      input.addEventListener('focus', () => {
        suggestionList.style.display = 'block';
      });
    }, 1000);
    


    

    const handleCartClick =()=>{

      navigate(`/Cart`);

    }

    const token = localStorage.getItem('token');

    useEffect(() => {

      const fetchData = async () => {
        const response = await axios.get('http://localhost:8000/Authentication/get_profile/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const role = response.data.Role;
        setUserRole(role);
      };
      fetchData();
    }, []);
  
 
    
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

</>
    );
};

export default requireAuth(Layout);