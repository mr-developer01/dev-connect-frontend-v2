import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAnchor } from "../../store/slices/toggleSlice";
import { useToggleDrawer } from "./utils/useToggleDrawer";
import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { addUser } from "../../store/slices/userSlice";

type Anchor = "right";

export default function AnchorTemporaryDrawer() {
  const state = useAppSelector(selectAnchor);
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dispatchAction } = useToggleDrawer();

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => dispatchAction(anchor, false)}
      onKeyDown={() => dispatchAction(anchor, false)}
    >
      <List>
        {["Profile", "Connects", "Requests", "Update"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={`/${
                text.toLowerCase() === "update"
                  ? "user/profile"
                  : text.toLowerCase()
              }`}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                removeCookie("user");
                dispatch(addUser(null));
                navigate("/");
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => dispatchAction(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
