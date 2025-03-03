import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Row, Col, Button, ListGroup, Spinner, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

function Home() { 
  //State Management
  const [inputName, setInputName] = useState('')
  const [inputProject, setInputProject] = useState('')
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState()

  //Handles Form Input Change
  const handleChange = e => {
    setInputName(e.target.value)
  }
  const handleProjectChange = e => {
    setInputProject(e.target.value)
  }

  //Fetch Data from the database
  const fetchData = async e => {
    e.preventDefault()

    setLoading(true)
    setSearch(true)
    try {
      const {data, error} = await supabase
      .from('subcontractor')
      .select()
      .textSearch('trade_name', inputName,
        {
          type: 'websearch',
          config: 'english'
        }
      )

      const {data2, error2} = await supabase
      .from('subcontractor')
      .select()
      .textSearch('project_name', inputProject)

      console.log(data)

      if(error) {
        throw error
      }

      setData(data2)
      setData(data)
      setError(null)
    } catch (error) {
      console.log('Error fetching data: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSearch(false)
  }, [])

  return (
    <>
      <h3 className='text-center mb-4'>Search for Trade</h3>
      <Row className='justify-content-center mb-3' md={4}>
        {/* TODO: Conditional Statement to disable other or the other input based on if one has text or not */}
        
        <Form onSubmit={fetchData} >
          <Form.Group className='mb-3'>
            <Form.Label className='text-center'>Trade Name</Form.Label>
            <Form.Control 
              className='rounded border-ternairy'
              type="text"
              value={inputName}
              onChange={handleChange}
              />
          </Form.Group>
          
          {/* <Form.Group className='mb-3'>
            <Form.Label className='text-center'>Project Name</Form.Label>
            <Form.Control 
            className='rounded border-ternairy'
            type="text"
            placeholder='Search Project Name'
            value={inputProject}
            onChange={handleProjectChange}
            />
          </Form.Group> */}
          <Button variant='primary' type='submit' disabled={loading}>
            {loading ? 'Search...' : 'Search'}
          </Button>
        </Form>
      </Row>

      {
        search ? (
            <Row className="text-center justify-content-center">
              { loading ? (
                <Spinner animation="border" variant="primary" />
                ):(
                  <Col className='' md={3}>
                    <ListGroup>
                      {data.map((item) => (
                        <Link to= {`/trade/${item.id}`} style= {{textDecoration: 'none'}} className='text-dark'>
                          <ListGroup.Item className='border-0' key={item.id}>
                            {item.trade_name}
                          </ListGroup.Item> 
                        </Link>
                      ))}
                    </ListGroup>
                  </Col>
              )}
            </Row>
        ) : (
          <>
            {/* Show Nothing when a trade has not been Search and found */}
          </>
        )
      }
    </>
  )
}

export default Home