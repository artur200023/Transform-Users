import { Box, Modal, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addBadUsers,
  addGoodUsers,
  recievUsers,
  recievGoodUsers,
  deleteGoodUsers,
  deleteUsers,
  deleteBadUsers,
  recievBadUsers,
} from "../../redux/thunks/usersThunk";

const Popup = ({ user, addUser, type }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const openPopup = () => {
    setOpen(true);
  };

  const closeOpen = () => {
    setOpen(false);
  };

  const transformUser = async () => {
    console.log("userik", user);
    const payload = {
      ...user,
    };
    if (user.rating > 0) {
      await dispatch(addGoodUsers(payload));
      await dispatch(recievGoodUsers());

      if (!type) {
        await dispatch(deleteUsers(payload));
      } else if (type === "bad") {
        await dispatch(deleteBadUsers(payload));
      } else {
        await dispatch(deleteGoodUsers(payload));
      }
    } else {
      await dispatch(addBadUsers(payload));

      if (!type) {
        await dispatch(deleteUsers(payload));
      } else if (type === "good") {
        await dispatch(deleteGoodUsers(payload));
      }
    }
    await dispatch(recievUsers());
    await dispatch(recievGoodUsers());
    await dispatch(recievBadUsers());
  };

  const btnStyle = {
    fontSize: "18px",
    marginLeft: "10px",
  };

  const popupStyle = {
    width: 500,
    marginLeft: "50%",
    marginTop: "30%",
    height: "auto",
    background: "white",
    textAlign: "center",
    padding: "20px",
    marginLeft: "35%",
    marginTop: "20%",
  };

  return (
    <>
      {open && (
        <Modal
          open={openPopup}
          onClose={closeOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={popupStyle}>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                style={btnStyle}
                onClick={transformUser}
              >
                Yas
              </Button>
              <Button variant="outlined" style={btnStyle} onClick={closeOpen}>
                No
              </Button>
              {type ? (
                <Button variant="outlined" style={btnStyle} onClick={addUser}>
                  Add list
                </Button>
              ) : null}
            </Typography>
            <Button>Delete</Button>
          </Box>
        </Modal>
      )}
      <Button onClick={openPopup}>Open modal</Button>
    </>
  );
};
export default Popup;
