import { useRef, useContext, useState } from "react";
import logoImage from "/logo.jpg";
import Modal from "./Modal";
import Button from "../UI/Button";
import { AppContext } from "../store/meal-cart-context";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { AccountCircle, ArrowDropDown } from "@mui/icons-material";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { items, user } = useContext(AppContext);
  const modal = useRef();

  console.log("user:", user)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cartQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function showCart() {
    modal.current.openCart();
  }

  function showOrders() {
    modal.current.openOrders();
  }

  function showLogout() {
    modal.current.openLogout();
  }

  return (
    <div id="main-header">
      <Modal ref={modal} />
      <div id="title">
        <img src={logoImage} />
        <h1>Food order</h1>
      </div>
      <div className="modal-actions">
        <Button
          styling="main-header-button"
          clickFn={showOrders}
          btnText="Orders"
        />
        <Button
          styling="main-header-button"
          clickFn={showCart}
          btnText={`Cart (${cartQuantity})`}
        />
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="medium"
          sx={{
            backgroundColor: "#ffc404",
            borderRadius: "50px",
            ":hover": { backgroundColor: "#fdd34aff" },
          }}
        >
          <Stack direction="row" alignItems="center">
            <AccountCircle sx={{ fontSize: 24 }} />
            <ArrowDropDown />
          </Stack>
        </IconButton>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            padding: "1rem",
            backgroundColor: "#e4ddd4",
          },
        }}
      >
        <Typography marginBottom={4} paddingInline={2}>
          {user.firstname} {user.lastname}
        </Typography>
        <MenuItem
          onClick={() => {
            handleClose();
            showLogout();
          }}
          sx={{
            backgroundColor: "#ffc404",
            borderRadius: "50px",
            justifyContent: "center",
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}