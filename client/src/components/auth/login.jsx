import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  Button,
  Row,
  Col
} from "reactstrap";
import Header from "../../components/header/header.jsx";
import Footer from "../../components/footer/footer.jsx";

class Login extends React.Component {
  render() {
    return (
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-sidebartype=""
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <Header />
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <CardColumns>
              <Card>
                <CardBody>
                  <CardTitle>Login</CardTitle>
                  <CardSubtitle>
                    Please enter your username and password
                  </CardSubtitle>
                  <form className="m-t-30">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </form>
                  <Button color="primary" size="md">
                    Login
                  </Button>
                </CardBody>
              </Card>
            </CardColumns>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
