import React ,{Component} from 'react' ;
//import {Form} from "react-validation/build/form";
import { Button, Col,InputGroup,Form, Card, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave,faEye,faUndo,faUsers,faLaptopHouse,faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import CenterList from './centerList';
import history from './../history';
import axios from 'axios';
import MyToast from '../components/MyToast';

class Center extends Component
{ 
  constructor(props)
     {
         super(props);
         this.state=this.initalState;
         this.changeCenterName=this.changeCenterName.bind(this);
         this.submitCenter=this.submitCenter.bind(this); 
         this.state.show=false; 
     }
      initalState={id:'',centerName:'',centerDesc:'',centerAddress:'',
      centerCity:'',centerState:'',centerZipcode:'',centerEmail:''
      ,centerContact:'',officerName:''};
      
    componentDidMount ()
    {
     // this.setState(()=>this.initalState);
      const centerId = +this.props.match.params.id;
      if(centerId)
      {
        this.updateCenterbyId(centerId);
      }
  };


  updateCenterbyId = (centerId) =>
  {
    axios.get("http://localhost:10010/api/centers/"+centerId)
    .then(response=>
     {
       if(response.data != null)
       {
        this.setState({
          centerId:response.data.id,
          centerName:response.data.centerName,
          centerDesc:response.data.centerDesc,
          centerAddress:response.data.centerAddress,
          centerCity:response.data.centerCity,
          centerState:response.data.centerState,
          centerZipcode:response.data.centerZipcode,
          centerEmail:response.data.centerEmail,
          centerContact:response.data.centerContact,
          nodalOfficerName:response.data.nodalOfficerName
        });
       }
     }).catch((error) => {
     console.error("Error"+error);
     });
  }
  
    submitCenter=event =>
    {
      event.preventDefault();
      // alert('CenterName:'+ this.state.CenterName+'CenterDes:'+ this.state.CenterDes+
      //  'CenterAdd:'+this.state.CenterAdd+'City:'+ this.state.City+
      //  'State:' +this.state.State+'Zip:'+this.state.Zip +'email:'+this.state.email+
      //  'contact:'+this.state.Contact+'officerName:'+this.state.officerName)
      //  event.preventDefault("CenterName","CenterDes","CenterAdd",
      //  "City","State","Zip","email","contact","officerName");

      const center = {
        centerName:this.state.centerName,
        centerDesc:this.state.centerDesc,
        centerAddress:this.state.centerAddress,
        centerCity:this.state.centerCity,
        centerState:this.state.centerState,
        centerZipcode:this.state.centerZipcode,
        centerEmail:this.state.centerEmail,
        centerContact:this.state.centerContact,
        nodalOfficerName:this.state.nodalOfficerName
      };   
      axios.post("http://localhost:10010/api/Postcenter",center)
      .then(response=>
        {
          if(response.data!=null)
          {
          this.setState({"show":true});
          console.log(center); 
          setTimeout(()=> this.setState({"show":false}),3000);
          }
          else{
            this.setState({"show":false});
          }
        });
        this.setState(this.initalState);
    };
   
    resetCenter =()=>
    {
      this.setState(() => this.initalState);
    }
    changeCenterName(event){
      this.setState({
        [event.target.name]:event.target.value
      });
    }
   
    render () {
      const{centerName,centerDesc,centerAddress,centerCity,centerState,centerZipcode,centerEmail,centerContact,nodalOfficerName}=this.state;
    return (
      <div>
        <div style={{"display":this.state.show?"block":"none"}}>

          <MyToast show={this.state.show} message={"Center saved Successfully."} type={"success"}/>
          </div>
      <Card className={"border text-white border-dark bg-dark "}>
         <Card.Header><h4><FontAwesomeIcon icon={faLaptopHouse} />Add new Center</h4>
         <Button type="submit" onClick={() => history.push('/Centerdata')} style={{float: 'right'}}><FontAwesomeIcon icon={faEye} />View Center</Button>
         </Card.Header>
         <Form onReset={this.resetCenter} onSubmit={this.submitCenter} id="centerID" >
        <Card.Body>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Center name</Form.Label>
            <Form.Control
              required autocomplete="off"
              type="text"
              name="centerName"
              value={centerName}
              onChange={this.changeCenterName}
              className={"bg-dark text-white"}
              placeholder="First name"
              
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Center description</Form.Label>
            <Form.Control
              required autocomplete="off"
              type="text"
              name="centerDesc"
              value={centerDesc}
              onChange={this.changeCenterName}
              placeholder="Last name"
              //defaultValue="Otto"
              className={"bg-dark text-white"}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Center Address</Form.Label>
              <Form.Control
                type="text"
                name="centerAddress"
                value={centerAddress}
                onChange={this.changeCenterName}
                placeholder="Address"
                aria-describedby="inputGroupPrepend"
                required autocomplete="off"
                className={"bg-dark text-white"}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text"
            name="centerCity"
            placeholder="City" required
            className={"bg-dark text-white"}
            value={centerCity}
            onChange={this.changeCenterName}
            autocomplete="off"                />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required
            name="centerState"
            className={"bg-dark text-white"}
            value={centerState}
            onChange={this.changeCenterName}
            autocomplete="off"   />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" name="centerZipcode" required
                          className={"bg-dark text-white"}
                          value={centerZipcode}
                          onChange={this.changeCenterName}
                          autocomplete="off"
                          />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
  <Form.Group as={Col} md="4" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <InputGroup className="mb-2 mr-sm-2">
     <InputGroup.Prepend>
      <InputGroup.Text>@</InputGroup.Text>
    </InputGroup.Prepend>
    <Form.Control type="email" placeholder="Center email"required
                 name="centerEmail" className={"bg-dark text-white"}
                 value={centerEmail}
                onChange={this.changeCenterName}
                autocomplete="off"/>
    </InputGroup>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
           <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text" placeholder="Number" required autocomplete="off"
                          name="centerContact" className={"bg-dark text-white"}
                          value={centerContact}
                          onChange={this.changeCenterName}
                          />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Nodal Officer Name</Form.Label>
            <Form.Control type="text" placeholder="State" name="nodalOfficerName" required autocomplete="off"
                          className={"bg-dark text-white"}
                          value={nodalOfficerName}
                          onChange={this.changeCenterName}
                          />
            <Form.Control.Feedback type="invalid">
              Please provide officer name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required autocomplete="off"
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
      </Card.Body>
      <Card.Footer style={{"textAlign":"Center"}}>
      <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />Submit form</Button>{'      '}
      <Button size="sm" variant="info" type="reset"><FontAwesomeIcon icon={faUndo} />Reset</Button>

      </Card.Footer>
      </Form> 
      </Card>  
      </div>
    );
    }
}
export default Center;