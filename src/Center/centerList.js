import React from 'react';
import {Component} from 'react';
import {Card,Table,ButtonGroup,Button} from 'react-bootstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faList,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from 'react-router-dom';
import MyToast from '../components/MyToast';

export  default  class CenterList extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      centers :[]
    };
  }
  componentDidMount(){
    this.findAllCenters();
  }

      deleteCenter= (centerId)=>
    {
      alert(centerId);
      axios.delete("http://localhost:10010/api/centers/"+centerId)
      .then(response =>
      {
        if (response.data != null)
        {
          this.setState({"show":true});
          //console.log(center); 
          setTimeout(()=> this.setState({"show":false}),3000);
          //alert("Center deleted successfully");
          this.setState({
            centers: this.state.centers.filter(center=>center.centerId !== centerId)
          });
        }
        else {
          this.setState({"show":false});
        }
      });
    };

  findAllCenters()
  {
    axios.get("http://localhost:10010/api/centers/")
    .then(response => response.data)
    .then((data) => {
      this.setState({centers:data})
    });
  }

    render()
    {
            return(
              <div>
          <div style={{"display":this.state.show?"block":"none"}}>
          <MyToast show={this.state.show} message={"Center Deleted Successfully."} type={"danger"}/>
          </div>
          <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header><h4><FontAwesomeIcon icon={faList} />Center List</h4></Card.Header>
          <Card.Body>
          <Table bordered hover striped variant="dark">
          <thead>
<tr>
                <th>#</th>
<th>Center Id </th>
<th>Center Name</th>
<th>Center Address </th>
<th>Center City</th>
<th>Center Contact</th>
<th>Center Discription </th>
<th>Email</th>
<th>State</th>
<th>Zip</th>
<th>Nodal officer name</th>
<th>Actions</th>
</tr>
   
  </thead>
  
  <tbody>
  
                 {
                  this.state.centers.length===0 ?
      <tr><td></td>
                  </tr>:
  
    this.state.centers.map((center) => (

      <tr key={center.id}>
        <td></td>
      <td> {center.centerId}</td>
      <td> {center.centerName}</td>   
      <td>{center.centerAddress}</td>
      <td>{center.centerCity}</td>
      <td> {center.centerContact}</td>
      <td>{center.centerDesc}</td>
      <td>{center.centerEmail}</td>
      <td>{center.centerState}</td>
      <td>{center.centerZipcode}</td>
      <td>{center.nodalOfficerName}</td>
      <td>
         <ButtonGroup>
        <Link to={"/edit/"+center.centerId } className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} /></Link>           
       {' '}
        <Button size="sm" variant="outline-danger" onClick={this.deleteCenter.bind(this, center.centerId)}><FontAwesomeIcon icon={faTrash} /></Button>
        </ButtonGroup>
         </td>                                                                          
      </tr>
    ))
    }
  </tbody>
                </Table>
                </Card.Body>

                </Card>
              



          </div>
               
            );
}
}

