import { EditNoteSharp } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../store/hooks";
import { useEffect, useState } from "react";
import securedFetch from "../../utils/securedFetch";
import { API_KEYS } from "../../api/keys";
import { Link } from "react-router";

const UserProfile = () => {
  const [bio, setBio] = useState(true)
  const [userData, setUserData] = useState({});
  const [cookies] = useCookies(["user"]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cookies?.user) {
      securedFetch(`${import.meta.env.VITE_HOST_URL}${API_KEYS.USER}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.user}`,
        },
      }).then(async (data) => {
        const jsonData = await data.json();
        setTimeout(() => {
          setUserData(jsonData);
        }, 5000);
      });
    }
  }, [cookies.user, dispatch]);

  if (Object.keys(userData).length === 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: '100%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "black",
          position: 'absolute',
          top: '0%',
          left: '0%'
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            backgroundImage: "url(loader2.gif)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>
    );
  }

  return (
    <Stack direction={"row"} sx={{ height: "90.6vh" }}>
      <Stack
        sx={{
          height: "100%",
          bgcolor: "#4B21FF",
          flex: 1.5,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "45%",
            flex: 1,
            border: "4px solid #B06249",
            borderTop: "10px solid #B06249",
            borderBottom: "10px solid #B06249",
            borderRight: "2px solid #B06249",
          }}
        ></Box>
        <Box
          sx={{
            width: "700px",
            height: "90%",
            position: "absolute",
            top: "50%",
            left: "100%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
            zIndex: 999,
          }}
        >
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "20px",
            }}
            alt="The house from the offer."
            //
            src={
              userData?.profilePicture
                ? userData?.profilePicture
                : "https://img.freepik.com/premium-photo/3d-animation-boy-character-illustration_1026528-3.jpg"
            }
          />
        </Box>
      </Stack>
      <Box sx={{ height: "100%", flex: 1.5 }}></Box>
      <Stack
        sx={{
          height: "100%",
          flex: 2,
          position: "relative",
          justifyContent: "center",
        }}
      >
        <EditNoteSharp
          sx={{
            position: "absolute",
            top: "5%",
            right: "0%",
            cursor: "pointer",
          }}
        />
        <Stack>
          <Typography variant="h5">{userData?.name}</Typography>
          <Typography variant="h5" color="#4B21FF">
            DEB
          </Typography>
          <Typography variant="body2">{userData?.skills.join(", ")}</Typography>
          <Typography variant="body2" mt={4} sx={{cursor: 'pointer'}} onClick={() => setBio(!bio)}>
            {!bio ? `${userData?.bio.split(/\s+/).slice(0, 15).join(' ')}...` : userData?.bio}
          </Typography>
          <Stack direction={"row"} sx={{ mt: 4, gap: 6 }}>
            <Button
              disableRipple
              sx={{ bgcolor: "#4B21FF", color: "white", px: 4 }}
            >
              Blogs
            </Button>
            <Button
              disableRipple
              sx={{ border: "1px solid #4b21ff", color: "black", px: 4 }}
              component={Link}
              to="/user/profile"
            >
              Update Profile
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
