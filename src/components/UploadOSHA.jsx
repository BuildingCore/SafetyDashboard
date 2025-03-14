import { Col, Row } from "react-bootstrap"

function UploadOSHA() {
  return (
    <>
        <Row>
            <Col>
                <Form.Control type="text" placeholder="Year"/>
            </Col>
            <Col>
                <Form.Control type="text" placeholder="Manhours"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <Form.Control type="text" placeholder="G"/>
            </Col>
            <Col>
                <Form.Control type="text" placeholder="H"/>
            </Col>
            <Col>
                <Form.Control type="text" placeholder="I"/>
            </Col>
            <Col>
                <Form.Control type="text" placeholder="J"/>
            </Col>
        </Row>
    </>
  )
}

export default UploadOSHA