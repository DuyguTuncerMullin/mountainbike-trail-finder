import { Component } from "react";
import axios from "axios";
import Logo from "./logo";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first: "",
            last: "",
            imageUrl: "",
            imageUploaderIsVisible: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                if (data.success) {
                    console.log("data.userInfo", data.userInfo);
                    let { firstname, lastname, imageurl } = data.userInfo;
                    this.setState({
                        first: firstname,
                        last: lastname,
                        imageUrl: imageurl,
                    });
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log("error in axios get request for /user ", err);
                this.setState({ error: true });
            });
    }

    toggleModal() {
        this.setState({
            imageUploaderIsVisible: !this.state.imageUploaderIsVisible,
        });
    }

    methodInApp(arg) {
        console.log("methodInApp is running! Argument passed is:", arg);
        this.state.imageUrl = arg;
        // this.toggleModal();
        // make sure you set the imageUrl you received from uploader in state!
    }

    render() {
        return (
            <div>
                <div className="errorMessage">
                    {this.state.error && (
                        <h1 style={{ color: "red" }}>
                            Something went wrong with the provided information
                        </h1>
                    )}
                    <Logo />
                    <div onClick={this.toggleModal}>
                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                        />
                    </div>
                </div>
                <div className="up">
                    {this.state.imageUploaderIsVisible && (
                        <Uploader
                            className="uploader"
                            methodInApp={this.methodInApp}
                            toggleModal={this.toggleModal}
                        />
                    )}
                </div>
            </div>
        );
    }
}
