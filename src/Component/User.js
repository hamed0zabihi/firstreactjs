import React, { Component } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Badge,
} from "reactstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      creatUser: "",
      creatUserName: "",
      error: "",
      isLoading: false,
    };
  }
  //lifecycle

  componentWillMount() {
    axios
      .get("https://api.github.com/users")
      .then((response) => {
        const data1 = response.data;
        this.setState({ userData: [...data1.splice(0, 30)], isLoading: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  handleCreateUser = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };
  submitUser = (event) => {
    event.preventDefault();
    const value = this.state.creatUser;
    const objectNew = Object.assign({
      id: Math.ceil(Math.random() * 100 + 50),
      login: value,
      type: "user",
      avatar_url: "https://picsum.photos/200/200",
    });

    const userDataold = [...this.state.userData, objectNew];
    this.setState({
      userData: userDataold,
      isLoading: false,
    });

    const post = {
      title: "title",
      body: "body",
      author: "author",
    };
    axios
      .post("https://jsonplaceholder.typicode.com/posts/", post)
      .then((response) => {
        this.setState({
          isLoading: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  //submit

  handleDeleteUser = (ids) => {
    const items = this.state.userData;
    const userFiltered = items.filter((element) => element.id !== ids);
    console.log("userFiltered:", userFiltered, "ids:", ids);
    this.setState({ userData: userFiltered, isLoading: false });
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${ids}`)
      .then((response) => {
        this.setState({ isLoading: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  sortArray = (av) => {
    const bands = this.state.userData;
    if (av === "a-z") {
      bands.sort((a, b) => a["login"].toLowerCase() > b["login"].toLowerCase());
      this.setState({ userData: bands });
    } else {
      bands.sort((a, b) => a["login"].toLowerCase() < b["login"].toLowerCase());
      this.setState({ userData: bands });
    }

    console.log("first:", this.state.userData);
    console.log("second:", bands);
    console.log("av:", av);
  };

  render() {
    const loading = this.state.isLoading;

    return (
      <div>
        <Form row>
          <FormGroup row>
            <Label for="exampleSearch" sm={2}>
              name
            </Label>
            <Col sm={10}>
              <Input
                type="search"
                name="creatUser"
                id="exampleSearch"
                placeholder="with a placeholder"
                onChange={this.handleCreateUser}
              />
            </Col>
          </FormGroup>
          <Button type="submit" onClick={this.submitUser}>
            add
          </Button>
        </Form>
        <div>
          {loading ? (
            <div>
              <div>
                <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => this.sortArray(e.target.value)}
                  >
                    <option>a-z</option>
                    <option>z-a</option>
                  </Input>
                </FormGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  "flex-wrap": "wrap",
                  "align-items": "flex-start",
                  "align-self": " center",
                }}
              >
                <ListUser
                  sm={12}
                  md={8}
                  lg={3}
                  users={this.state.userData}
                  handleDeleteUser={this.handleDeleteUser}
                />
              </div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    );
  }
}

const ListUser = ({ users, handleDeleteUser }) => {
  console.log("users", users);

  {
    return users.map((user, index) => {
      return (
        <Col key={index} sm={12} md={8} lg={3}>
          <Card>
            <CardBody>
              <CardTitle>{user.login}</CardTitle>
            </CardBody>
            <Link to={"/user/" + user.login}>
              <CardImg top src={user.avatar_url} alt="Card image cap" />
            </Link>
            <CardBody>
              <CardText>
                <i className="fa fa-id-card"></i>
                <br />
                <Badge color="info">{user.id}</Badge>
                <br />
                <i className="fa fa-user"></i>
                <br />
                {user.type}
              </CardText>
              <Button onClick={() => handleDeleteUser(user.id)} color="danger">
                <i className="fa fa-trash"></i>
              </Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  }
};

export default User;
