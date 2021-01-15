import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import { cookies } from "../../../../utils/cookies";
import { withFirebase } from "../../../../hoc/withFirebase.jsx";
import { RegistrationFormModal } from "./RegistrationFormModal.jsx";

const firebaseDb = firebase.database();
const storageRef = firebase.storage().ref();

const RegistrationForm = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatarDisabled, setAvatarDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

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
      storageRef
        .child(name)
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
    const { authActions } = props;

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        authActions.toggleRegistrationForm(false);
        authActions.updateUser(user);
        firebaseDb
          .ref("users")
          .child(data.user.uid)
          .set({ ...user });
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

export default withFirebase(RegistrationForm);
