import { Form, Row, Col, Button, Dropdown } from "react-bootstrap"

function FormNewProject() {
  return (
    <Form>
        <Form.Group>
            <Form.Label>Job #</Form.Label>
            <Form.Control type="text" placeholder="XXXXXX" />
        </Form.Group>
        <Form.Group className="mt-2">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="AMCE Center" />
        </Form.Group>
        <Form.Group className="mt-2">
            <Form.Label>Project Type</Form.Label>
            <Form.Control type="text" placeholder="data center, hospital, mixed-use, etc." />
        </Form.Group>
        <Button className="mt-3" variant='primary' type='submit'>Submit</Button>
    </Form>
  )
}

export default FormNewProject