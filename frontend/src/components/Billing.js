import React from "react";
import PropTypes from "prop-types";
import CreditCardInput from "react-credit-card-input";

import {
  Segment,
  Form,
  Button,
  Divider,
  Header,
  Input
} from "semantic-ui-react";

import "./Billing.css";

// let star = "";

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethod: "",
      star: "",
      cardNumber: null,
      date: null,
      cvv: null
    };

    this.nextStep = this.nextStep.bind(this);
    this.handleRadioOnChange = this.handleRadioOnChange.bind(this);
    this.handleCardNumber = this.handleCardNumber.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleCVC = this.handleCVC.bind(this);
    // this.handleCVC = this.handleCVC.bind(this);
  }

  componentWillMount() {
    if ("data" in this.props.billing) {
      this.setState({ paymentMethod: this.props.billing.data.paymentMethod });
    }
  }

  handleCardNumber(e) {
    console.log(e.target.value.length, "card number");
    this.setState({ cardNumber: e.target.value.length });
  }

  handleDate(e) {
    console.log(e.target.value.length, "date");
    this.setState({ date: e.target.value.length });
  }

  handleCVC(e) {
    console.log(e.target.value.length, "cvc");
    this.setState({ cvv: e.target.value.length });
  }

  nextStep() {
    this.props.setBillingOptions(this.state);
    this.props.nextStep();
  }

  handleRadioOnChange(e, obj) {
    this.setState({ paymentMethod: obj.value });
    console.log(obj.value);
  }

  render() {
    console.log(this.props);
    return (
      <div className="hello-wrapper">
        <Segment attached>
          <Form>
            <Header as="h3" attched="top">
              Payment options
            </Header>
            <Segment attached>
              {/* <Form.Radio
                name="paymentMethod"
                value="debit card"
                label="Debit card"
                checked={this.state.paymentMethod === "debit card"}
                onChange={this.handleRadioOnChange}
              /> */}

              <Form.Radio
                name="paymentMethod"
                value="credit card"
                label="Credit card/ Debit Card"
                checked={this.state.paymentMethod === "credit card"}
                onChange={this.handleRadioOnChange}
              />

              <Form.Radio
                name="paymentMethod"
                value="cash on delivery"
                label="Cash on delivery"
                checked={this.state.paymentMethod === "cash on delivery"}
                onChange={this.handleRadioOnChange}
              />
            </Segment>
            {this.state.paymentMethod === "credit card" && (
              <Segment attached>
                <CreditCardInput
                  cardNumberInputProps={{
                    onChange: e => this.handleCardNumber(e)
                  }}
                  cardExpiryInputProps={{
                    onChange: e => this.handleDate(e)
                  }}
                  cardCVCInputProps={{
                    onChange: e => this.handleCVC(e)
                  }}
                  fieldClassName="input"
                />
              </Segment>
            )}
          </Form>
        </Segment>

        <Divider />

        <Button.Group floated="right">
          <Button primary onClick={e => this.props.previousStep()}>
            Previous step
          </Button>
          <Button.Or />
          <Button
            color="red"
            onClick={this.nextStep}
            disabled={
              (this.state.paymentMethod.length === 0) ||
              (this.state.paymentMethod === "credit card" &&
                (this.state.cardNumber !== 19 ||
                  this.state.date !== 7 ||
                  this.state.cvv !== 3))
            }
          >
            Next step
          </Button>
        </Button.Group>
      </div>
    );
  }
}

Billing.propTypes = {
  previousStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
};

export default Billing;
