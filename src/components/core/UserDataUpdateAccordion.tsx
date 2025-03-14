import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { userProfileInitialValues, userSubmitedData } from "../../constants/formik/userFormData";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { addUser } from "../../store/slices/userSlice";


type TSkills = string;

type TExperience = {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: string;
  description: string;
};

type TSocialLinks = {
  linkedin: string;
  github: string;
  twitter: string;
}

type TFormData = {
  name: string;
  bio: string;
  skills: TSkills[];
  experience: TExperience[];
  socialLinks: TSocialLinks;
  profilePicture: string;
};

export default function UserDataUpdateAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [cookies] = useCookies();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const formik = useFormik({
    initialValues: userProfileInitialValues,
    // validationSchema: getValidationSchemaForProfileUpdate(),
    onSubmit: (values) => {
      console.log(values)
      const formData: TFormData = userSubmitedData(values);
      console.log(formData, "Update Clicked")
      async function updateUserDetail() {
        const response = await fetch(
          "https://dev-connect-service.onrender.com/api/users/profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookies.user}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const jsonData = await response.json();
        console.log(jsonData);
        dispatch(addUser(jsonData))
        navigate('/profile')
      }
      updateUserDetail();
    },
  });

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <Box sx={{ px: 4, py: 4 }}>
        <Typography variant="h6" textAlign="center" gutterBottom>
          Update Profile
        </Typography>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Full Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="dense"
        />
        <TextField
          fullWidth
          id="bio"
          name="bio"
          label="Bio"
          multiline
          rows={2}
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
          margin="dense"
        />
        <TextField
          fullWidth
          id="skills"
          name="skills"
          label="Skills (comma-separated)"
          value={formik.values.skills}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.skills && Boolean(formik.errors.skills)}
          helperText="Example: React, Node.js, TypeScript"
          margin="dense"
        />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ mt: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              Experience 1
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              margin="dense"
            />
            <TextField
              fullWidth
              id="company"
              name="company"
              label="Company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
              margin="dense"
            />
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.location)}
              helperText={formik.touched.name && formik.errors.location}
              margin="dense"
            />
            <TextField
              fullWidth
              id="form"
              name="form"
              label="form"
              value={formik.values.form}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.form && Boolean(formik.errors.form)}
              helperText={formik.touched.form && formik.errors.form}
              margin="dense"
            />
            <TextField
              fullWidth
              id="to"
              name="to"
              label="To"
              value={formik.values.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.form && Boolean(formik.errors.to)}
              helperText={formik.touched.form && formik.errors.to}
              margin="dense"
            />

            <TextField
              fullWidth
              id="current"
              name="current"
              label="Current"
              value={formik.values.current}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.current && Boolean(formik.errors.current)}
              helperText={formik.touched.current && formik.errors.current}
              margin="dense"
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              margin="dense"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ mt: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              Experience 2
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              id="title2"
              name="title2"
              label="Title2"
              value={formik.values.title2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title2 && Boolean(formik.errors.title2)}
              helperText={formik.touched.title2 && formik.errors.title2}
              margin="dense"
            />
            <TextField
              fullWidth
              id="company2"
              name="company2"
              label="Company2"
              value={formik.values.company2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company2 && Boolean(formik.errors.company2)}
              helperText={formik.touched.company2 && formik.errors.company2}
              margin="dense"
            />
            <TextField
              fullWidth
              id="location2"
              name="location2"
              label="Location2"
              value={formik.values.location2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.location2 && Boolean(formik.errors.location)
              }
              helperText={formik.touched.location2 && formik.errors.location2}
              margin="dense"
            />
            <TextField
              fullWidth
              id="form2"
              name="form2"
              label="form2"
              value={formik.values.form2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.form2 && Boolean(formik.errors.form2)}
              helperText={formik.touched.form2 && formik.errors.form2}
              margin="dense"
            />
            <TextField
              fullWidth
              id="to2"
              name="to2"
              label="To2"
              value={formik.values.to2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.to2 && Boolean(formik.errors.to2)}
              helperText={formik.touched.to2 && formik.errors.to2}
              margin="dense"
            />

            <TextField
              fullWidth
              id="current2"
              name="current2"
              label="Current2"
              value={formik.values.current2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.current2 && Boolean(formik.errors.current2)}
              helperText={formik.touched.current2 && formik.errors.current2}
              margin="dense"
            />
            <TextField
              fullWidth
              id="description2"
              name="description2"
              label="Description2"
              value={formik.values.description2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description2 &&
                Boolean(formik.errors.description2)
              }
              helperText={
                formik.touched.description2 && formik.errors.description2
              }
              margin="dense"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ mt: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              Experience 3
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              id="title3"
              name="title3"
              label="Title3"
              value={formik.values.title3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title3 && Boolean(formik.errors.title3)}
              helperText={formik.touched.title3 && formik.errors.title3}
              margin="dense"
            />
            <TextField
              fullWidth
              id="company3"
              name="company3"
              label="Company3"
              value={formik.values.company3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company3 && Boolean(formik.errors.company3)}
              helperText={formik.touched.company3 && formik.errors.company3}
              margin="dense"
            />
            <TextField
              fullWidth
              id="location3"
              name="location3"
              label="Location3"
              value={formik.values.location3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.location3 && Boolean(formik.errors.location3)
              }
              helperText={formik.touched.location3 && formik.errors.location3}
              margin="dense"
            />
            <TextField
              fullWidth
              id="form3"
              name="form3"
              label="form3"
              value={formik.values.form3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.form3 && Boolean(formik.errors.form3)}
              helperText={formik.touched.form3 && formik.errors.form3}
              margin="dense"
            />
            <TextField
              fullWidth
              id="to3"
              name="to3"
              label="To3"
              value={formik.values.to3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.to3 && Boolean(formik.errors.to3)}
              helperText={formik.touched.to3 && formik.errors.to3}
              margin="dense"
            />

            <TextField
              fullWidth
              id="current3"
              name="current3"
              label="Current3"
              value={formik.values.current3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.current3 && Boolean(formik.errors.current3)}
              helperText={formik.touched.current3 && formik.errors.current3}
              margin="dense"
            />
            <TextField
              fullWidth
              id="description3"
              name="description3"
              label="Description3"
              value={formik.values.description3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description3 &&
                Boolean(formik.errors.description3)
              }
              helperText={
                formik.touched.description3 && formik.errors.description3
              }
              margin="dense"
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{ mt: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              Social Links
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              id="linkedin"
              name="linkedin"
              label="Linkedin"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.linkedin)}
              helperText={formik.touched.name && formik.errors.linkedin}
              margin="dense"
            />
            <TextField
              fullWidth
              id="github"
              name="github"
              label="Github"
              value={formik.values.github}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.github)}
              helperText={formik.touched.name && formik.errors.github}
              margin="dense"
            />
            <TextField
              fullWidth
              id="twitter"
              name="twitter"
              label="Twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.twitter)}
              helperText={formik.touched.name && formik.errors.twitter}
              margin="dense"
            />
          </AccordionDetails>
        </Accordion>
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                formik.setFieldValue("profilePicture", e.target.files[0]);
              }
            }}
          />
        </Box>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Update
        </Button>
      </Box>
    </form>
  );
}
