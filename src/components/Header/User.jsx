import React from "react";
import { Popover, PopoverBody } from "reactstrap";
import { withAuth } from "../../hoc/withAuth.jsx";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({ popoverOpen: !prevState.popoverOpen }));
  };

  onLogOut = () => {
    const { authActions } = this.props;
    authActions.onLogOut();
  };

  render() {
    const { auth } = this.props;
    const { popoverOpen } = this.state;

    return (
      <>
        <div id="Popover1" className="cursor-pointer">
          Здраствуйте {auth.user.name}
        </div>
        {/* <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverBody className="user-modal d-flex align-items-center">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={this.onLogOut}
            >
              Выйти
            </button>
          </PopoverBody>
        </Popover> */}
      </>
    );
  }
}

export default withAuth(User);
