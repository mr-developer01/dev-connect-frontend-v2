// import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
// import { useAppDispatch } from "../../store/hooks";
// import { addUser } from "../../store/slices/userSlice";

// Type Definitions
interface Experience {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
}

interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
}

interface FormData {
  name: string;
  bio: string;
  skills: string;
  experience: Experience[];
  socialLinks: SocialLinks;
  profilePicture: File | null;
}

export default function UpdateUserData() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [cookies] = useCookies();
  // const dispatch = useAppDispatch();

  const formik = useFormik<FormData>({
    initialValues: {
      name: "",
      bio: "",
      skills: "",
      experience: [],
      socialLinks: { linkedin: "", github: "", twitter: "" },
      profilePicture: null,
    },
    onSubmit: async (values) => {
      console.log("Form values before sending:", values);

      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("bio", values.bio);

        // Convert skills string into JSON array format
        formData.append(
          "skills",
          JSON.stringify(values.skills.split(",").map((skill) => skill.trim()))
        );

        formData.append("socialLinks", JSON.stringify(values.socialLinks));
        formData.append("experience", JSON.stringify(values.experience));

        // Append file if selected
        if (values.profilePicture instanceof File) {
          formData.append("profilePicture", values.profilePicture);
        }

        console.log(formData, "FormData")

        const response = await fetch(
          "https://dev-connect-service.onrender.com/api/users/profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookies.user}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("Server Response:", jsonData);
        // dispatch(addUser(jsonData));
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  const addExperience = () => {
    formik.setFieldValue("experience", [
      ...formik.values.experience,
      {
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...formik.values.experience];
    updatedExperience.splice(index, 1);
    formik.setFieldValue("experience", updatedExperience);
  };

  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Box sx={{ px: 4, py: 4 }}>
        <Typography variant="h6" textAlign="center">
          Update Profile
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          label="Full Name"
          {...formik.getFieldProps("name")}
          margin="dense"
        />

        {/* Bio */}
        <TextField
          fullWidth
          label="Bio"
          multiline
          rows={2}
          {...formik.getFieldProps("bio")}
          margin="dense"
        />

        {/* Skills */}
        <TextField
          fullWidth
          label="Skills (comma-separated)"
          {...formik.getFieldProps("skills")}
          margin="dense"
        />

        {/* Experience Section */}
        {formik.values.experience.map((exp, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={() =>
              setExpanded(
                expanded === `panel${index}` ? false : `panel${index}`
              )
            }
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Experience {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Title"
                {...formik.getFieldProps(`experience.${index}.title`)}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Company"
                {...formik.getFieldProps(`experience.${index}.company`)}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Location"
                {...formik.getFieldProps(`experience.${index}.location`)}
                margin="dense"
              />
              <TextField
                fullWidth
                label="From"
                type="date"
                {...formik.getFieldProps(`experience.${index}.from`)}
                margin="dense"
              />
              <TextField
                fullWidth
                label="To"
                type="date"
                {...formik.getFieldProps(`experience.${index}.to`)}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                {...formik.getFieldProps(`experience.${index}.description`)}
                margin="dense"
              />
              <IconButton onClick={() => removeExperience(index)}>
                <DeleteIcon />
              </IconButton>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Add Experience Button */}
        <Button onClick={addExperience} startIcon={<AddIcon />}>
          Add Experience
        </Button>

        {/* Social Links */}
        <TextField
          fullWidth
          label="LinkedIn"
          {...formik.getFieldProps("socialLinks.linkedin")}
          margin="dense"
        />
        <TextField
          fullWidth
          label="GitHub"
          {...formik.getFieldProps("socialLinks.github")}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Twitter"
          {...formik.getFieldProps("socialLinks.twitter")}
          margin="dense"
        />

        {/* Profile Picture Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            formik.setFieldValue("profilePicture", e.target.files?.[0] || null)
          }
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" fullWidth>
          Update
        </Button>
      </Box>
    </form>
  );
}
