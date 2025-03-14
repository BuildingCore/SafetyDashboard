import React from 'react'

function UploadEMR() {
  return (
    <>
        <Row>
            <Col>
                <Form.Control type="text" placeholder="EMR Rate"/>
            </Col>
            <Col>
                <Form.Control type="text" placeholder="Eff. Date"/>
            </Col>
        </Row>
    </>
  )
}

export default UploadEMR