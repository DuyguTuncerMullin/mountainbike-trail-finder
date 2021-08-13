import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({ target }) {
        console.log("which input is running handleChange?", target.name);
        console.log("value the suer typed:", target.value);
        // updating state!
        this.setState(
            {
                [target.name]: target.value,
            },
            console.log("this.state in Registration:", this.state)
        );
    }
    handleSubmit(e) {
        e.preventDefault(); // prevents button from triggering a refresh
        console.log("user clicked register");
        // when the btn gets clicked we want to make an axios request sending
        // over our value of state
        console.log("this.state in Register", this.state);
        axios
            .post("/register", this.state)
            .then((resp) => {
                if (resp.data.success) {
                    // stuff worked well with registering we want to do sth
                    // that sth is trigger a reload, so that our start.js runs
                    // one more time and asks the server agin whether or not
                    // the user has the correct cookie :)
                    location.reload();
                } else {
                    // we should render an error!
                    // we need to update our component's state to conditionally
                    // make an error appear
                    this.setState({
                        error: "Please make sure to complete all input filelds!",
                    });
                }
            })
            .catch((err) => {
                console.log("something went wrong in POST /register", err);
                // we need to update our component's state to conditionally
                // make an error appear
                this.setState({
                    error: "Please make sure to complete all input filelds!",
                });
            });
    }
    componentDidMount() {
        console.log("Register just mounted");
    }

    render() {
        return (
            <section>
                {this.state.error && (
                    <h2 style={{ color: "red" }}>
                        {this.state.error} Error!!!!!!!
                    </h2>
                )}
                <form>
                    <input
                        name="first"
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />
                    <input
                        name="emailAddress"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Register
                    </button>
                    <div>
                        Have you already registered?
                        <p>
                            Click <Link to="/login">here</Link> to log in!
                        </p>
                    </div>
                </form>

                {this.state.error && <h2>{this.state.error}</h2>}
            </section>
        );
    }
}