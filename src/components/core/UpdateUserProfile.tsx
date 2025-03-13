import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { getValidationSchemaForProfileUpdate } from "../../validations/userProfileUpdate";

const UpdateUserProfile = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      skills: "",
      experience: "",
      socialLinks: "",
      profilePicture: "",
    },
    validationSchema: getValidationSchemaForProfileUpdate(),
    onSubmit: (values) => {
      const formattedData = {
        name: values.name,
        bio: values.bio,
        skills: values.skills.split(",").map((skill) => skill.trim()), // Convert to array
        experience: values.experience.split(",").map((exp) => exp.trim()), // Convert to array
        socialLinks: values.socialLinks.split(",").map((link) => link.trim()), // Convert to array
        profilePicture: values.profilePicture,
      };

      console.log(formattedData);
    },
  });

  return (
    <>
      <Paper sx={{ px: 4, py: 4 }}>
        <Typography variant="h6" textAlign="center" gutterBottom>
          Update Profile
        </Typography>
        <form className="auth-form" onSubmit={formik.handleSubmit}>
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
          <TextField
            fullWidth
            id="experience"
            name="experience"
            label="Experience (comma-separated)"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.experience && Boolean(formik.errors.experience)
            }
            helperText="Example: ABC Company - Developer - 2 years, XYZ Company - Intern - 1 year"
            margin="dense"
          />
          <TextField
            fullWidth
            id="socialLinks"
            name="socialLinks"
            label="Social Links (comma-separated)"
            value={formik.values.socialLinks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.socialLinks && Boolean(formik.errors.socialLinks)
            }
            helperText="Example: https://linkedin.com/in/yourprofile, https://github.com/yourusername"
            margin="dense"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                formik.setFieldValue("profilePicture", e.target.files[0]);
              }
            }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default UpdateUserProfile;
