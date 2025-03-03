import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { supabase } from "../client"
import { useParams } from "react-router-dom"

function OSHA(osha) {
    const {id} = useParams()

    const [data, setData] = useState(null)
    const [fetchError, setFetchError] = useState(null)

    useEffect(() => {
        const fetchOSHAData = async (id) => {
            const {data, error} = await supabase
            .from('oshaLog')
            .select('*')
            .eq('trade_id', id)

            console.log(data)

            if(error) {
                setFetchError('Could Not Fetch Data')
                setData(null)
                console.log(error)
            }

            setData(data)
        }

        fetchOSHAData(id)

    }, [])

  return (
    <>
    {/*  */}
      {
          data && data.map((item) => (
              <Row style={{margin: '4px 0', padding: '0'}} key={item.year}>
                  <Col className="text-center">{item.year}</Col>
                  <Col className="text-center">{item.g}</Col>
                  <Col className="text-center">{item.h}</Col>
                  <Col className="text-center">{item.i}</Col>
                  <Col className="text-center">{item.j}</Col>
                  <Col sm={3} className="p-0 text-end">{item.hours}</Col>
                  <Col sm={2} className="text-center"><mark style={{padding: '0 8px', borderRadius: '4px'}}>{item.rir}</mark></Col>
              </Row>
          ))
      }
    </>
  )
}

export default OSHA