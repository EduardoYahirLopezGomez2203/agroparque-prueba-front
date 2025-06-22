import { Menu } from "@mui/icons-material";
import { Avatar, Box, Collapse, Divider, IconButton, List, ListItemButton, ListItemText, ListSubheader, Stack, Typography } from "@mui/material";
import DrawerMui from "@mui/material/Drawer";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { ReactComponent as CustomIcon } from "../../../assets/Agroparque.svg"; // Ruta del archivo SVG
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { DrawerWidthContext } from "../../../pages/AdminPage";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuComponent, { ElementMenu } from "../../../components/menus/MenuComponent";
import { useNavigate } from "react-router-dom";
import useUserList from "../../layer1/formuser/useUserList";

const StateDrawer = createContext();

const Drawer = ({ children }) => {

    // Controla si el drawer se retrae o no
    const [collapse, setCollapse] = useState(false);

    const drawerRef = useRef(null);  // Creamos un ref para el Drawer

    const { setDrawerWidth } = useContext(DrawerWidthContext); 

    // Esto se puede refactorizar para obtener los datos del usuario en un hook
    const { handleList, processedData, cargando } = useUserList();

    const [currentData, setCurrentData] = useState({name: sessionStorage.getItem("name"), email: sessionStorage.getItem("email")})

    useEffect(() => {
        handleList('')
    }, [])

    useEffect(() => {
        if (!cargando && processedData) {
            const user = processedData?.body.find(user => {
                if (user.login === sessionStorage.getItem("userName"))
                    return true;
                return false;
            })
            if (user) {
                sessionStorage.setItem("name", user.nombre)
                sessionStorage.setItem("email", user.email)

                setCurrentData({
                    name: sessionStorage.getItem("name"),
                    email: sessionStorage.getItem("email")
                })
            }
        }
    }, [processedData, cargando])

    // Calcula el tamaño del Drawer cuando se abre
    useEffect(() => {
        if (drawerRef.current) {
            const paper = drawerRef.current.querySelector(".MuiDrawer-paper");
            if (paper) {
                const width = paper.offsetWidth;
                setDrawerWidth(width);
            }
        }
    }, [collapse, setDrawerWidth]); // Se ejecuta cada vez que cambia el estado 'collapse'

    return (
        <StateDrawer.Provider value={{ collapse, setCollapse }}>
            <DrawerMui 
                variant="persistent" 
                open={ true }
                ref={ drawerRef }  // Asignamos el ref al Drawer
                sx={{
                    "& .MuiDrawer-paper": {
                        maxWidth: collapse ? "70px" : "21%",
                        backgroundColor: "#1A1A1A",
                        color: "white", // Color del texto
                    },
                }}
            >
                <HeaderDrawer />

                <Box
                    sx={{
                        m: 1,
                        flexGrow: 1,
                        overflow: "auto",
                        // Oculta el scroll visualmente
                        scrollbarWidth: "none", // Firefox
                        "&::-webkit-scrollbar": {
                            display: "none", // Chrome, Safari y Edge
                        },
                    }}
                > 
                    <List> {/* Body */}
                        { children } {/* Aqui debe ir SectionDrawer */}
                    </List>
                </Box>

                <FooterDrawer name={currentData.name} email={currentData.email}/>
            </DrawerMui>
        </StateDrawer.Provider>
    );
};

const HeaderDrawer = () => {

    const { collapse, setCollapse } = useContext(StateDrawer);

    const handleClick = () => {
        setCollapse(!collapse)
    }

    const navigate = useNavigate();

    return (
        <Stack
            direction="row"
            sx={{
                alignItems: "center",
                gap: 1,
                margin: "8px 8px 0px 8px",
                paddingLeft: 0.5,
                justifyContent: "center"
            }}
        >
            <IconButton 
                sx={{ padding: 0 }}
                disabled={ !collapse }
                onClick={ handleClick }
            >
                <CustomIcon width={37} height={57} />
            </IconButton>

            <Typography variant="h5" onClick={() => { navigate("/admin")} } // Navigate momentaneo
                sx={{ 
                    display: collapseElement(collapse), 
                    fontWeight: 700, 
                    flexGrow: 1,
                    paddingX: 1, 
                    "&:hover": {
                        cursor: "pointer"
                    }
                }}
            >
                Agroparque
            </Typography>

            <IconButton onClick={ handleClick } sx={{ display: collapseElement(collapse) }}>
                <Menu sx={{ color: "white" }} fontSize="large"/>
            </IconButton>
        </Stack>
    );
}

const FooterDrawer = ({ name, email }) => {

    const { collapse } = useContext(StateDrawer);

    return (
        <Box sx={{ margin: "0px 8px 8px 8px" }}>
            <ListItemButton 
                sx={{ 
                    gap: 1,
                    justifyContent: collapse ? "center" : "",
                    borderRadius: "15px",
                    "&.Mui-selected": {
                        backgroundColor: "#727272", 
                        "&:hover": {
                            backgroundColor: "#727272",
                        }
                    }
                }}
            >
                <Avatar 
                    sx={{ 
                        backgroundColor: "transparent", 
                        height: "50px", 
                        width: "50px"
                    }} 
                    src=""
                > {/* Imagen del usuario */}
                    <AccountCircleOutlinedIcon sx={{ width: "100%", height: "100%" }}/>
                </Avatar> 

                <Stack direction="column" spacing={-0.1} sx={{ display: collapseElement(collapse) }}>
                    <ListItemText 
                        primary={name} 
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                width: "12rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }
                        }}
                    /> {/* Nombre de usuario */}
                    <ListItemText 
                        primary={email} 
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontWeight: 300,
                                fontSize: "0.9rem",
                                width: "12rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }
                        }}
                    /> {/* Correo electronico */}
                </Stack>
            </ListItemButton>
        </Box>
    );
}

export const SectionDrawer = ({ title, children, divider }) => {

    const { collapse } = useContext(StateDrawer);

    return (
        <>  
            { collapse && 
                <Divider sx={{ bgcolor: "#727272", marginY: 3, marginX: 0.5 }} /> 
            }

            <List
                sx={{
                    paddingY: 1
                }}
                subheader={
                    <ListSubheader 
                        disableSticky
                        sx={{
                            display: collapseElement(collapse),
                            fontWeight: 500, 
                            paddingBottom: 1,
                            paddingLeft: 0.5, 
                            bgcolor: "transparent", 
                            color: "white",
                            fontSize: "1rem" 
                        }}
                    >
                        { title }
                    </ListSubheader>
                }
            >
                { children } {/* ElementDrawer debe ir aqui */}
            </List>

            { (!collapse && divider) && 
                <Divider sx={{ bgcolor: "#727272", marginX: 0.5 }} /> 
            }
        </>
    );
}

export const ElementDrawer = ({ text, icon, children, onClick, fontSize = 15 }) => {

    const { collapse } = useContext(StateDrawer);

    const [openMenu, setOpenMenu] = useState(false);

    const [backgroundColor, setBackgroundColor] = useState("#727272");

    const [anchorEl, setAnchorEl] = useState(null); // Referencia del elemento html

    const handleClick = () => {
        setOpenMenu(!openMenu);
        isParent()
        if (onClick) {
            onClick()
        }
    }

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget)
        if (onClick) {
            onClick()
        }
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const validatorChildren = () => {
        if (children) {
            return openMenu ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowRightOutlinedIcon />;
        }
    }

    const isParent = () => {
        if (children) {
            setBackgroundColor("#727272")
        } else {
            setBackgroundColor("transparent")
        }
    }

    return (
        <>
            <ListItemButton 
                onClick={ collapse ? handleClickMenu : handleClick } 
                selected={ collapse ? null : openMenu } 
                sx={{
                    borderRadius: "15px",
                    pt: 2, pb: 2,
                    justifyContent: "center",
                    "&.Mui-selected": {
                        backgroundColor: `${backgroundColor}`, 
                        "&:hover": {
                            backgroundColor: `${backgroundColor}`,
                        },
                    }
                }}
            >
                { icon }            

                <ListItemText 
                    primary={ text } 
                    sx={{
                        display: collapseElement(collapse),
                        pr: 2, pl: 2,
                        '& .MuiListItemText-primary': {
                            fontWeight: 500,
                            fontSize: `${fontSize}px`,
                        }
                    }}
                />

                { !collapse && validatorChildren() }
            </ListItemButton>
            
            { !collapse &&
                <Collapse in={ openMenu } unmountOnExit sx={{ pl: 2 }}>
                    { children }
                </Collapse>
            }

            { (collapse && children) && 
                <MenuComponent anchorEl={ anchorEl } onClose={ handleCloseMenu }>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            return (
                                <ElementMenu 
                                    onClick={ child.props.onClick }
                                    title={ child.props.text } 
                                    icon={ child.props.icon }
                                />
                            );
                        }
                    })}
                </MenuComponent>
            }
        </>
    );
};

/**
 * Proporciona una manera controlada de gestionar el minimizado
 * del drawer.
 */
const collapseElement = (isCollapse) => {
    return isCollapse ? "none" : ""
}

export default Drawer;