import { Row, Col, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { supabase } from "../client"
import { useEffect, useState } from "react"
import EMR from "../components/EMR"
import OSHA from "../components/OSHA"

function Trade() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    const fetchSubcontractor = async (id) => {
      //Query Subcontractor Table
      const {data, error} = await supabase
      .from('subcontractor')
      .select('*')
      .eq('id', id)

      if(error) {
        setFetchError('Could Not Fetch the Data')
        setData(null)
        // console.log(error)
      }

      setData(data)
    
    }
    
    fetchSubcontractor(id)
 
  }, [])

  return (
    <>
      <h1 className="text-center text-dark" style={{paddingBottom: '12px'}}>
        {fetchError && (<p>{fetchError}</p>)}  
        {data && (<>
          {data.map(data => (
            <p key={id}>{data.trade_name}</p>
          ))}
        </>)}
      </h1> 
      <Row className="justify-content-center gx-5">
        {/* Display Trade Safety Document List */}
        <Col sm={4}>
          <h4 className="text-body-tertiary">Documents</h4>
          <hr />
          <ul style={{textDecoration: 'none', listStyleType: 'none', padding: '0', border: '1px solid #ccc', borderRadius: '4px'}}>
            <li style={{borderBottom: '1px solid #ddd', padding: '4px 8px'}}>File Name 01</li>
            <li style={{borderBottom: '1px solid #ddd', padding: '4px 8px'}}>File Name 02</li>
            <li style={{borderBottom: '1px solid #ddd', padding: '4px 8px'}}>File Name 03</li>
            <li style={{borderBottom: '1px solid #ddd', padding: '4px 8px'}}>File Name 04</li>
          </ul>
        </Col>

        {/* Display Trade Safety Metrics */}
        {/* Think about making this into a Component */}
        <Col sm={4}>
        <h4 className="text-body-tertiary">Safety Metrics</h4>
        <hr />
          <Container style={{border: '1px solid #ccc', borderRadius: '4px', padding: '0'}}>
            {/* EMR Insurance Data */}
            <Row style={{margin: '4px 0', padding: '0'}}>
              <Col>
                <h5 className="m-0 text-danger">EMR</h5>
                <hr className="mt-1"/>
              </Col>
            </Row>
            <EMR />
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default Trade
