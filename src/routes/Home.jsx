import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

function Home() {
  
  //State Management
  const [inputName, setInputName] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState()

  //Handles Form Input Change
  const handleChange = e => {
    setInputName(e.target.value)
  }

  //Fetch Data from the database
  const fetchData = async () => {
    setLoading(true)
    setSearch(true)
    try {
      const {data, error} = await supabase
      .from('subcontractor')
      .select()
      .eq('trade_name', inputName)

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

  useEffect(() => {
    setSearch(false)
  }, [])

  return (
    <>
      <Row className='justify-content-center mb-3' lg={2}>
        <input type="text" 
        placeholder='Search Trade Name'
        value={inputName}
        onChange={handleChange} />
      </Row>
      <Row className='justify-content-center mb-4' lg={2}>
        <Button type='submit' onClick={fetchData}>Search Trade</Button>
      </Row>

      {
        search ? (
            <Row className="text-center justify-content-center">
              { loading ? (
                <Spinner animation="border" variant="primary" />
                ):(
                  <Col className='' sm={4}>
                    <ListGroup>
                      {data.map((item) => (
                        <ListGroup.Item key={item.id}>
                            <Link to= {`/trade/${item.id}`} style= {{textDecoration: 'none'}} className='text-dark'>
                                {item.trade_name}
                            </Link>
                        </ListGroup.Item> // Assuming 'id' and 'text' columns
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