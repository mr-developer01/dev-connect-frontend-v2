import { TValues } from "../../@types/formikType/updateUser";

export const userProfileInitialValues = {
  name: "",
  bio: "",
  skills: "",
  // Experience 1
  title: "",
  company: "",
  location: "",
  form: "",
  to: "",
  current: "",
  description: "",

  linkedin: "",
  github: "",
  twitter: "",
  // Experience 2
  title2: "",
  company2: "",
  location2: "",
  form2: "",
  to2: "",
  current2: "",
  description2: "",
  // Experience 3
  title3: "",
  company3: "",
  location3: "",
  form3: "",
  to3: "",
  current3: "",
  description3: "",

  profilePicture: "",
};

export const userSubmitedData = (values: TValues) => {
  const formData = {
    name: values.name,
    bio: values.bio,
    skills: values.skills.split(",").map((skill: string) => skill.trim()),
    experience: [
      {
        title: values.title,
        company: values.company,
        location: values.location,
        from: values.form,
        to: values.to,
        current: values.current,
        description: values.description,
      },
      {
        title: values.title2,
        company: values.company2,
        location: values.location2,
        from: values.form2,
        to: values.to2,
        current: values.current2,
        description: values.description2,
      },
      {
        title: values.title3,
        company: values.company3,
        location: values.location3,
        from: values.form3,
        to: values.to3,
        current: values.current3,
        description: values.description3,
      },
    ],
    socialLinks: {
      linkedin: values.linkedin,
      github: values.github,
      twitter: values.twitter,
    },
    profilePicture: values.profilePicture,
  };

  return formData;
};
