import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { User } from "./User.js";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
  Alert,
} from "reactstrap";
import { useParams, Redirect } from "react-router-dom";
import { render } from "@testing-library/react";

class CatalaogUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      data: [],
    };
  }
  //lifecycle
  componentWillMount() {
    const name1 = this.props.match.params.name;
    this.setState({ name: name1 });
    axios
      .get(`https://api.github.com/users/${name1}`)
      .then((Response) => {
        const data1 = Response.data;
        this.setState({ data: data1 });
        console.log(data1);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  // console.log(user.data);

  render() {
    console.log(this.state.name);
    const isUser = this.state.data.name;
    console.log("isuser:", isUser);
    console.log("data:", this.state.data);
    const location = this.state.data.location;
    const company = this.state.data.company;
    const created = this.state.data.created_at;
    const followers = this.state.data.followers;
    const following = this.state.data.following;
    return (
      <div sm={12} md={8} lg={6}>
        {isUser ? (
          <div sm={6} md={4} lg={4} className="" role="">
            <Card>
              <CardImg
                top
                width="100%"
                src={this.state.data.avatar_url}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle tag="h5">{this.state.data.login}</CardTitle>
                {location ? (
                  <CardText>
                    <i className="fa fa-id-card"></i> location:
                    {location}
                  </CardText>
                ) : (
                  ""
                )}
                {created ? (
                  <CardText>
                    <i className="fa fa-id-card"></i> created: {created}
                  </CardText>
                ) : (
                  ""
                )}

                {company ? (
                  <CardText>
                    <i className="fa fa-id-card"></i> company:
                    {company}
                  </CardText>
                ) : (
                  ""
                )}
                {followers ? (
                  <CardText>
                    <i className="fa fa-id-card"></i> followers:
                    {followers}
                  </CardText>
                ) : (
                  ""
                )}
                {following ? (
                  <CardText>
                    <i className="fa fa-id-card"></i> following:
                    {following}
                  </CardText>
                ) : (
                  ""
                )}
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="" role="">
            <Alert color="danger">
              not found .
              <a href="#" className="alert-link">
                {" "}
                go home
              </a>
            </Alert>
          </div>
        )}
      </div>
    );
  } //rendering end
}

export default CatalaogUser;
