import { useState, useEffect, use } from 'react'
import { supabase } from '../client'
import { Container, Row, Col, Button, Spinner, Offcanvas } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'

//Form Components
import FormNewTrade from '../components/formNewTrade'
import FormNewProject from '../components/formNewProject'

function Admin() {
  //State Management
  const [inputName, setInputName] = useState('')                                                                                                                               
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  //New Trade Drawer State Management
  const [showTrade, setShowTrade] = useState(false);
  const handleClose = () => setShowTrade(false);
  const handleShow = () => setShowTrade(true);

  //New Project Drawer State Management
  const [showProject, setShowProject] = useState(false);
  const handleClosePjt = () => setShowProject(false);
  const handleShowPjt = () => setShowProject(true);

  //Handles Form Input Change
  const handleChange = e => {
    setInputName(e.target.value)
  }

  //Insert Data into the database
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true) //Set Loading to true while fetching

    try {
      const {data, error} = await supabase
      .from('subcontractor')
      .insert([{trade_name: inputName}])

      if (error) {
        throw error;
      }

      setInputName('')
      fetchData() //Refresh the data display

    } catch (error) {
      console.log('Error inserting data: ', error)
      setError(error.message) //Set the error message to display
    } finally {
      setLoading(false) // Set loading to false after fetch completes
    }
  }

  //Fetch Data from the database
  const fetchData = async () => {
    setLoading(true)
    try {
      const {data, error} = await supabase
      .from('subcontractor')
      .select()

      if(error) {
        throw error
      }
      setData(data)
      setError(null)
    } catch (error) {
      console.log('Error fetching data: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Container>
        <Row className='border p-3 rounded'>
          <Col className='p-0'>
          {/* Add onClick logic */}
            <Button className='me-3' style={{width: '118px'}} variant="outline-primary" onClick={handleShow}>Add Trade</Button>
            <Button className='me-3' style={{width: '118px'}} variant="outline-primary" onClick={handleShowPjt}>Add Project</Button>
            <Link to={'/'} style={{textDecoration: 'none'}}>
              <Button style={{width: '118px'}} variant="outline-secondary">Search</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col className='border p-3 mt-3 me-3 rounded'>
            <h5>Active Projects</h5>
            <hr />
            {/* Table: Job # | Job Name */}
          </Col>

          <Col className='border p-3 mt-3 rounded'>
            <h5>Procurement Information</h5>
            <hr />
          </Col>
        </Row>

      </Container>
    
      {/* Add New Trade Drawer */}
      <Offcanvas show={showTrade} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Trade</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
          <FormNewTrade />
          {/* <h2>This is a Component</h2>
          <Button onClick={handleClose}>Submit</Button> */}
          {/* When the submit button is pushed the function needs to setShowTrade to false to close the modal and reset the inputs to empty strings */}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Add New Project Drawer */}
      <Offcanvas show={showProject} onHide={handleClosePjt} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Project</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <FormNewProject />
          {/* <h2>This is a Component</h2>
          <Button onClick={handleClosePjt}>Submit</Button> */}
          {/* When the submit button is pushed the function needs to setShowTrade to false to close the modal and reset the inputs to empty strings */}
        </Offcanvas.Body>
      </Offcanvas>
    </>

  );
}

export default Admin





