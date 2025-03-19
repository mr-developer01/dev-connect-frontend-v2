import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [images, setImages] = useState<File[]>([]);
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      content: "",
      tags: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Content is required"),
      tags: Yup.string().required("At least one tag is required"),
    }),
    onSubmit: (values) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookies.user}`);
      const formdata = new FormData();

      images.forEach((image) => {
        formdata.append("images", image);
      });

      formdata.append("content", values.content);
      formdata.append("tags", values.tags);

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      async function createPost() {
        const response = await fetch(
          "https://dev-connect-service.onrender.com/api/posts",
          requestOptions
        );
        await response.json();
        if (response.ok) {
          navigate("/posts");
        }
      }
      createPost();
    },
  });

  // Handle Image Upload (Max 5 Images)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
      const newImages = [...images, ...selectedFiles].slice(0, 5); // Max 5 images
      setImages(newImages);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Create Post
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* Content Field */}
        <TextField
          fullWidth
          id="content"
          name="content"
          label="Content"
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          margin="dense"
        />

        {/* Tags Field */}
        <TextField
          fullWidth
          id="tags"
          name="tags"
          label="Tags (comma-separated)"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tags && Boolean(formik.errors.tags)}
          helperText="Example: React, JavaScript, WebDev"
          margin="dense"
        />

        {/* Image Upload (Multiple Files, Max 5) */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <Typography variant="body2" color="textSecondary">
          {images.length}/5 images uploaded
        </Typography>

        {/* Preview Uploaded Images */}
        <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`upload-preview-${index}`}
              width={80}
              height={80}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          ))}
        </Box>

        {/* Submit Button */}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
        >
          Post
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
