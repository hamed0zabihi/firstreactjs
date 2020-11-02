import React, { Component } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

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
    console.log("iddddd:", process.env.REACT_APP_CLIENT_ID);
    axios.get("https://api.github.com/users").then((response) => {
      const data1 = response.data;
      this.setState({ userData: [...data1.splice(0, 30)], isLoading: true });
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
      userId: value,
      id: Math.ceil(Math.random() * 100 + 50),
      login: value,
      avatar_url: "https://picsum.photos/200/200",
      body:
        "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
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
        console.log("delete", response);
        this.setState({ isLoading: true });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    console.log(this.state.userData);
    const loading = this.state.isLoading;

    return (
      <div>
        <Form row>
          <FormGroup row>
            <Label for="exampleSearch" sm={2}>
              Email
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
                md={6}
                lg={3}
                users={this.state.userData}
                handleDeleteUser={this.handleDeleteUser}
              />
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
        <Col key={index} sm={12} md={6} lg={3}>
          <Card>
            <CardBody>
              <CardTitle>{user.login}</CardTitle>
            </CardBody>
            <CardImg top src={user.avatar_url} alt="Card image cap" />
            <CardBody>
              <CardText>
                user id:{user.id}
                <br />
                user type:{user.type}
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
