import { Menu, MenuItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";
import IconTextComponent from "../icontexts/IconTextComponent";

const MenuComponent = ({ children, anchorEl, onClose }) => {

    const openMenu = Boolean(anchorEl);

    return (
        <>
            <Menu open={ openMenu } 
                anchorEl={ anchorEl }
                onClose={ onClose }
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                }}
                MenuListProps={{
                    sx: {
                        padding: 0, // Elimina el padding interno
                        backgroundColor: "#1A1A1A",
                        color: "white"
                    }
                }}
            >
                <MenuList dense disablePadding
                >
                    { children } {/* Aqui debe ir ElementMenu */}
                </MenuList>
            </Menu>
        </>
    );
}

export const ElementMenu = ({ title, icon, onClick }) => (
    <MenuItem sx={{ paddingLeft: 1 }} onClick={ onClick }> 
        <IconTextComponent 
            text={ title }
            variant="body2"
            color="ligth"
            icon={ icon } 
            fontWeight={500}
        />            
    </MenuItem>
);

export default MenuComponent;