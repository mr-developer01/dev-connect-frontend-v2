import * as Yup from "yup";

export const getValidationSchemaForProfileUpdate = () => {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Full Name is required"),

    bio: Yup.string()
      .max(200, "Bio cannot exceed 200 characters")
      .required("Bio is required"),

    skills: Yup.string()
      .matches(/^[a-zA-Z0-9,\s]+$/, "Skills should be comma-separated words")
      .required("Skills are required"),

    experience: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s,-]+$/,
        "Experience should be in a readable format, e.g., 'ABC Company - Developer - 2 years'"
      )
      .required("Experience is required"),

    socialLinks: Yup.string()
      .matches(
        /^https?:\/\/[^\s,]+(,\s*https?:\/\/[^\s,]+)*$/,
        "Provide valid URLs, comma-separated"
      )
      .required("At least one social link is required"),

    profilePicture: Yup.mixed().test(
      "fileType",
      "Only image files are allowed",
      (value) => {
        if (!value) return true; // Not required
        return (
          value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        );
      }
    ),
  });
};
