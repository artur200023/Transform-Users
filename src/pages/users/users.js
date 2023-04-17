import { useDispatch, useSelector } from "react-redux";
import {
  selectBadUsers,
  selectGoodUsers,
  selectUsers,
  selectnewUsers,
} from "../../redux/slices/usersSlice/usersSlice";
import { useEffect } from "react";
import {
  postUsers,
  recievBadUsers,
  recievGoodUsers,
  recievNewsUsers,
  recievUsers,
} from "../../redux/thunks/usersThunk";
import ShowUsers from "../../components/showUsers/showUsers";
import { Box, Button } from "@mui/material";
import "./users.css";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const newUsers = useSelector(selectnewUsers);
  const badUsers = useSelector(selectBadUsers);
  const goodUsers = useSelector(selectGoodUsers);

  const addNewUsers = async () => {
    dispatch(recievNewsUsers());
  };

  const refreshUsers = () => {
    dispatch(recievUsers());
  };

  useEffect(() => {
    dispatch(recievUsers());
    dispatch(recievBadUsers());
    dispatch(recievGoodUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("123");
    setTimeout(() => {
      for (let i = 0; i < newUsers.length; i++) {
        const newUser = newUsers[i];
        dispatch(postUsers(newUser));
      }
      // refreshUsers();
    }, 1000);
  }, [newUsers]);

  return (
    <div className="container">
      <Button onClick={refreshUsers}>Refresh</Button>
      <Button onClick={addNewUsers}>Add user</Button>
      <div className="page_users">
        <div className="list_section">
          <Box
            sx={{
              width: 600,
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 0 2px gray",
            }}
          >
            {users.map((user) => {
              return <ShowUsers key={user.id} user={user}></ShowUsers>;
            })}
          </Box>
        </div>
        <div className="rating_section">
          <div className="bad_rating">
            <div className="rating_title">Good rating</div>
            {goodUsers.map((user) => {
              return (
                <ShowUsers key={user.id} type="good" user={user}></ShowUsers>
              );
            })}
          </div>
          <div className="good_rating">
            <div className="rating_title">Bad rating</div>
            {badUsers.map((user) => {
              return (
                <ShowUsers key={user.id} type="bad" user={user}></ShowUsers>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
