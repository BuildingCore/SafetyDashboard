import { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { supabase } from "../client"
import OSHA from "./OSHA"
import { useParams } from "react-router-dom"

function EMR() {
  const {id} = useParams()
  const [data, setData] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  //Function that calculates the 3 yr RIR


  useEffect(() => {
    const fetchEMR = async (id) => {

        //Query Subcontractor Table
        const {data, error} = await supabase
        .from('emrLog')
        .select('*')
        .eq('trade_id', id)

        if(error) {
        setFetchError('Could Not Fetch the Data')
        setData(null)
        console.log(error)
        }

        setData(data)     
    }

    fetchEMR(id)

  }, [])

  return (
    <>
      <Row style={{margin: '6px 0', padding: '0'}}>
          <Col>
          <h6 className='text-body-tertiary'>
              Rate:
              {fetchError && (<p>{fetchError}</p>)}
              {data && (<> 
                {data.map(data => (
                  <mark style={{padding: '0 8px', borderRadius: '4px'}} key={id}>{data.emr_rate}</mark>
                ))}
                </>
              )}
              
          </h6>
          </Col>
          <Col className="text-end">
          <h6 className='text-body-tertiary'>
              Eff: 
                  {fetchError && (<p>{fetchError}</p>)}
                  {data && (<> 
                  {data.map(data => (
                      <mark style={{padding: '0 8px', borderRadius: '4px'}} key={id}>{data.eff_date}</mark>
                  ))}
                  </>
                  )}
          </h6>
          </Col>
      </Row>

      {/* OSHA Log Data */}
      <Row style={{margin: '4px 0', padding: '0'}}>
        <Col>
          <h5 className="m-0 text-warning">OSHA</h5>
          {/* <hr className="mt-1"/> */}
        </Col>
        <Col className="text-end" sm={4}>
          <h5>3yr RIR: <mark>2.01</mark></h5>
        </Col>
      </Row>
      <Row style={{margin: '4px 0', padding: '0'}}>
        <Col className="text-center">Year</Col>
        <Col className="text-center">G</Col>
        <Col className="text-center">H</Col>
        <Col className="text-center">I</Col>
        <Col className="text-center">J</Col>
        <Col sm={3} className="text-end p-0">Manhours</Col>
        <Col sm={2} className="text-center">RIR</Col> 
        <hr className="mb-2" />
      </Row>
      <OSHA />
    </>
  )
}

export default EMR