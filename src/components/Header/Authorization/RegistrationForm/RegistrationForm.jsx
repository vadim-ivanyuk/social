import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cookies } from "../../../../utils/cookies";
import { RegistrationFormModal } from "./RegistrationFormModal.jsx";
import {
  FIREBASE_DB,
  FIREBASE_STORAGE_REF,
  FIREBASE,
} from "../../../../utils/apies";
import {
  toggleRegistrationForm,
  updateUser,
} from "../../../../redux/auth/auth.actions";

export const RegistrationForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatarDisabled, setAvatarDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null, base: null }));
  };

  const updateAvatar = (e) => {
    const reader = new FileReader();
    const name = e.target.files[0].name;

    setUser((prevUser) => ({
      ...prevUser,
      avatar: name,
    }));

    setAvatarDisabled(true);

    reader.onload = (e) => {
      FIREBASE_STORAGE_REF.child(name)
        .putString(e.target.result, "data_url", { contentType: "image/jpg" })
        .catch((error) => {
          setErrors((prevErrors) => ({ ...prevErrors, avatar: error }));
        });
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const errors = validateFields();
    const error = errors[name];

    if (Object.keys(errors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const validateFields = () => {
    const errors = {};

    if (user.name.length <= 2) {
      errors.name = "Укажите имя, минимум 3 значения";
    }
    if (user.email.length < 5) {
      errors.email = "Укажите логин, в формате primer@gmail.com";
    }
    if (user.password.length < 6) {
      errors.password = "Укажите пароль, минимум 6 зачений";
    }
    if (user.avatar === null) {
      errors.avatar = "Выберите аватар";
    }

    return errors;
  };

  const createAccount = () => {
    FIREBASE.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        dispatch(toggleRegistrationForm(false));
        dispatch(updateUser(user));
        FIREBASE_DB.ref("users")
          .child(data.user.uid)
          .set(JSON.stringify({ ...user }));
        cookies.set("user_id", data.user.uid, {
          path: "/",
          maxAge: 2592000,
        });
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors });
    } else {
      createAccount();
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <RegistrationFormModal
        user={user}
        avatarDisabled={avatarDisabled}
        errors={errors}
        firebaseError={firebaseError}
        handleChange={handleChange}
        updateAvatar={updateAvatar}
        handleBlur={handleBlur}
        onSubmit={onSubmit}
      />
    </div>
  );
};
