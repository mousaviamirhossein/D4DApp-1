import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Select from 'react-select';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SocialProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: null,
      last_name: null,
      year_of_birth: null,
      gender: null,
      sport : [null],
      location : [null],
      Available_sports : [],
      Available_sportss : [],
      Available_locations : [],
      formErrors : {
        first_name: "",
        last_name: "",
        year_of_birth: "",
        location: "",
        gender: "",
        sport: ""
      }
    };
  }

  componentDidMount(){
        axios.get('http://localhost:3001/api/Instructors_registration/sports', { 'headers': { 'key': 'd4dapplicationregistrationapigetmethod1234567890' } })
      .then(response => {
        var sport = response.data.sports;
        this.setState({Available_sports : sport});
      })
    axios.get('http://localhost:3001/api/Instructors_registration/locations', { 'headers': { 'key': 'd4dapplicationregistrationapigetmethod1234567890' } })
      .then(response => {
        var locations = response.data.locations;
        this.setState({Available_locations : locations});
      })
  }

  Continue = e => {
    e.preventDefault();
        if (formValid(this.state)) {
          const { values: { first_name, last_name, gender, location, year_of_birth, sport } } = this.props;
          this.state.first_name = { first_name };
          this.state.last_name = { last_name };
          this.state.gender = { gender };
          this.state.location = { location };
          this.state.year_of_birth = { year_of_birth };
          this.state.sport = { sport };
          this.props.nextStep();
        }
        else {
          let formErrors = { ...this.state.formErrors };
          alert('Please fill out filds cearfully !!')
        }   
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "first_name":
        formErrors.first_name =
        value.length == 0 ? "First Name can not be empty !!" : ""
      break;

      case "last_name":
        formErrors.last_name = 
        value.length == 0 ? "Last Name can not be empty !!" : ""
      break;
      
      case "gender":
        formErrors.gender = 
        value.length == 0 ? "Gender can not be empty !!" : ""
      break;

      case "year_of_birth":

        formErrors.year_of_birth = 
        value.length == 0 ? "Year of birth can not be empty !!" : new Date().getFullYear() - value < 3 ? "Enter your real birth year !!" : new Date().getFullYear() - value > 150 ? "Enter your real birth year !!"  : ""
      break;

      case "sport":
        formErrors.sport =
        value.length == 0 ? "Sport can not be empty !!" : value == null ? "Sport can not be empty !!" : ""
      break;

      case "location":
        formErrors.location =
      value.length == 0 ? "Sport can not be empty !!" : value == null ? "Sport can not be empty !!" : ""
      break;

      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    const { inputChange , values} = this.props;
    let Available_sport = []
    this.state.Available_sports.map(item => {
      Available_sport = [...Available_sport, { name: item.name, value: parseInt(item.id), label: item.name }]
    })
    let Available_locations = []
    this.state.Available_locations.map(item => {
      Available_locations = [...Available_locations, { name: item.name, value: parseInt(item.id), label: item.name }]
    })

    return (
      <form onSubmit={(e) => { e.preventDefault() }}>
        <div className="form-container">
           <h1 className="mb-5">Personal Information</h1>
      
           <div className="form-group">
              <label htmlFor="facebook">First Name</label>
               <input type="text" className="form-control" name="first_name" 
                noValidate required
                onInput={this.handleChange} onChange={inputChange('first_name')} value={values.first_name}  />
                 {formErrors.first_name.length > 0 && (
                  <span className="errorMessage">{formErrors.first_name}</span>
                )} </div>
      
              <div className="form-group">
                <label htmlFor="twitter">Last Name</label>
                <input type="text" className="form-control" name="last_name" 
                noValidate required
                onInput={this.handleChange} onChange={inputChange('last_name')} value={values.last_name}  />
                {formErrors.last_name.length > 0 && (
                  <span className="errorMessage">{formErrors.last_name}</span>
                )}</div>
      
              <div className="form-group">
                <label htmlFor="github">Gender</label>
                <select
                  defaultValue='Not Set'
                  name="gender"
                  noValidate required
                  onInput={this.handleChange} onChange={inputChange('gender')}
                  className="form-control-select">
                  <option selected value={null} >Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {formErrors.gender.length > 0 && (
                  <span className="errorMessage">{formErrors.gender}</span>
                )}</div>
      
              <div className="form-group">
                <label htmlFor="github">Year Of Birth</label>
                <input type="number" min='1900' max='2020' className="form-control" name="year_of_birth" 
                noValidate required
                onInput={this.handleChange} onChange={inputChange('year_of_birth')} value={values.year_of_birth}  />
              {formErrors.year_of_birth.length > 0 && (
                  <span className="errorMessage">{formErrors.year_of_birth}</span>
                )}</div>

              <div className="form-group">
                <label htmlFor="github">Sport</label>
                <Select
                  isMulti
                  name="sport"
                  className='basic-multi-select form-control-multiple-select'
                  options={Available_sport}
                  classNamePrefix="select"
                  defaultValue={null}
                  noValidate required
                  onInput={this.handleChange}
                  onChange={inputChange('sport')}
                /> {formErrors.sport.length > 0 && (
                  <span className="errorMessage">{formErrors.sport}</span>
                )}
              </div>
      
              <div className="form-group">
                <label htmlFor="github">Location</label>
                <Select
                  isMulti
                  name="location"
                  className='basic-multi-select form-control-multiple-select'
                  options={Available_locations}
                  classNamePrefix="select"
                  defaultValue={null}
                  noValidate required
                  onInput={this.handleChange}
                  onChange={inputChange('location')}
                />
                {formErrors.location.length > 0 && (
                  <span className="errorMessage">{formErrors.location}</span>
                )} </div>
      
              <br  />
              <div class="row">
              <button type="button" onClick={this.Continue} class="btn btn-primary btn-lg btn-block">Continue</button>
              </div>
            </div>
          </form>
    );
  }
}

export default SocialProfiles;