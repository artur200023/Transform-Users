import { Accordion, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./showUsers.css";
import { useDispatch } from "react-redux";
import {
  deleteBadUsers,
  deleteGoodUsers,
  deleteUsers,
  postUsers,
  recievUsers,
  updateBadUsers,
  updateGoodUsers,
  upditeRating,
  recievGoodUsers,
  recievBadUsers,
} from "../../redux/thunks/usersThunk";
import Popup from "../popup/popup";

const ShowUsers = ({ user, type }) => {
  if (!user) {
    return false;
  }

  const dispatch = useDispatch();
  const addRating = async () => {
    console.log(user, "user_rating");
    if (user.rating < 5) {
      const payload = {
        ...user,
        rating: user.rating + 1,
      };
      if (!type) {
        dispatch(upditeRating(payload));
      } else if (type === "good") {
        await dispatch(updateGoodUsers(payload));
      } else {
        await dispatch(updateBadUsers(payload));
      }
    }
  };

  const minRating = async () => {
    if (user.rating == 5 || user.rating > -5) {
      const payload = {
        ...user,
        rating: user.rating - 1,
      };
      if (!type) {
        await dispatch(upditeRating(payload));
      } else if (type === "bad") {
        await dispatch(updateBadUsers(payload));
      } else {
        await dispatch(updateGoodUsers(payload));
      }
    }
  };

  const deleteUser = () => {
    dispatch(deleteUsers(user));
    dispatch(recievUsers());
  };

  const addUsersList = async () => {
    const payload = {
      ...user,
    };
    if (type === "bad") {
      await dispatch(postUsers(payload));
      await dispatch(deleteBadUsers(payload));
    } else {
      await dispatch(postUsers(payload));
      await dispatch(deleteGoodUsers(payload));
    }
    await dispatch(recievUsers());
    await dispatch(recievGoodUsers());
    await dispatch(recievBadUsers());
  };

  return (
    <>
      <Typography mt={0}></Typography>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className="users">
            {user.name} {user.rating}
          </Typography>
        </AccordionSummary>
        <Button onClick={addRating}>+</Button>
        <Button onClick={minRating}>-</Button>
        {user.rating == 0 ? <Button onClick={deleteUser}>Delete</Button> : null}
        {user.rating == 5 || user.rating === -5 ? (
          <Popup type={type} user={user} addUser={() => addUsersList()} />
        ) : (
          ""
        )}
      </Accordion>
    </>
  );
};

export default ShowUsers;


