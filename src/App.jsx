import React from "react";
import firebase from "firebase";
import Header from "./components/Header/Header.jsx";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      name: "Vadim",
      id: "60spXYFaCKZ1zL0nt87QSs9JKSq2",
      user: {},
    };
  }

  componentDidMount() {
    const db = firebase.database();
    db.ref("user")
      .child(this.state.id)
      .on("value", (elem) => this.setState({ user: elem.val() }));
  }

  handleChange = ({ target }) => {
    this.setState((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  createAccount = (e) => {
    e.preventDefault();

    const { email, password, id, name } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.setState({ id: data.user.uid });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(id);
    const db = firebase.database();
    db.ref("user").child(id).set({ password, email, name });
  };

  render() {
    return (
      <Header />
      // <div
      //   className="w-100 d-flex justify-content-center align-items-center"
      //   style={{ height: "100vh" }}
      // >
      //   <form className="col-3" onSubmit={this.createAccount}>
      //     <div className="form-group">
      //       <label htmlFor="exampleInputEmail1">Email address</label>
      //       <input
      //         className="form-control"
      //         name="email"
      //         id="exampleInputEmail1"
      //         value={email}
      //         placeholder="Email address"
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="exampleInputEmail2">Password</label>
      //       <input
      //         className="form-control"
      //         name="password"
      //         id="exampleInputEmail2"
      //         value={password}
      //         placeholder="Password"
      //         onChange={this.handleChange}
      //       />
      //     </div>
      //     <div className="form-group text-center">
      //       <button
      //         type="submit"
      //         className="btn btn-primary"
      //         onSubmit={this.createAccount}
      //       >
      //         Create account
      //       </button>
      //     </div>
      //     <p>Hello {name}</p>
      //   </form>
      // </div>
    );
  }
}
