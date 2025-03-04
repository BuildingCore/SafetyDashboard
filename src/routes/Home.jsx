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
  const [projectData, setProjectData] = useState([])
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

  //Fetch Subcontractor Data 
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

  //Fetch Project Data
  const fetchProjectData = async e => {
    e.preventDefault()
    setLoading(true)
    setSearch(true)

    try {
      const {data, error} = await supabase
      .from('projects')
      .select()
      .textSearch('project_name', inputProject,
        {
          type: 'websearch',
          config: 'english'
        }
      )

      if(error) {
        throw error
      }

      setProjectData(data)
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
        <Form onSubmit={
          inputName ? (fetchData) : (fetchProjectData)
        }>
          {/* Trade Name Input */}
          <Form.Group className='mb-3'>
            <Form.Label className='text-center'>Trade Name</Form.Label>
            <Form.Control 
              className='rounded border-ternairy'
              type="text"
              value={inputName}
              onChange={handleChange}
              disabled={inputProject !== ''}
              />
          </Form.Group>
          
          {/* Project Input */}
          <Form.Group className='mb-3'>
            <Form.Label className='text-center'>Project Name</Form.Label>
            <Form.Control 
            className='rounded border-ternairy'
            type="text"
            value={inputProject}
            onChange={handleProjectChange}
            disabled={inputName !== ''}
            />
          </Form.Group>
          <Button variant='primary' type='submit' disabled={loading}>
            {loading ? 'Search...' : 'Search'}
          </Button>
        </Form>
      </Row>
      {
        search ? (
          <>
            {
              inputName ? (
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
                <Row className="text-center justify-content-center">
                  { loading ? (
                    <Spinner animation="border" variant="primary" />
                    ):(
                      <Col className='' md={3}>
                        <ListGroup>
                          {projectData.map((item) => (
                            <Link to= {`/project/${item.id}`} style= {{textDecoration: 'none'}} className='text-dark'>
                              <ListGroup.Item className='border-0' key={item.id}>
                                {item.project_name}
                              </ListGroup.Item> 
                            </Link>
                          ))}
                        </ListGroup>
                      </Col>
                  )}
                </Row>
              )
            }
          </>            
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