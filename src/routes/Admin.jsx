import { useState, useEffect, use } from 'react'
import { supabase } from '../client'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'

function Admin() {
  //State Management
  const [inputName, setInputName] = useState('')                                                                                                                               
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
      <Container className='justify-content-center'>
        <form onSubmit={handleSubmit}>
          <input type="text"
          value={inputName}
          onChange={handleChange}
           />
          <Button variant='warning' type='submit' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>

        {loading ? (
          <Spinner animation="border" variant="primary" />
        ): (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.trade_name}</li> // Assuming 'id' and 'text' columns
            ))}
          </ul>
        )}
      </Container>
  );
}

export default Admin





