import { Form, Row, Col, Button } from "react-bootstrap"

function FormNewTrade() {
  return (
    <>
        <Form>
            <Form.Group>
                <Form.Label className="fw-bolder">Trade FEIN</Form.Label>
                <Form.Control type="text" placeholder="XX-XXXXXXX" />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label className="fw-bolder">Trade Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label className="fw-bolder">Trade Discipline</Form.Label>
                <Form.Control type="text" placeholder="ex. drywall, electrical, glazing, etc." />
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label className="text-warning fw-bolder">OSHA</Form.Label>
                <br />
                <Button>Upload OSHA Log</Button>
            </Form.Group>
            <Form.Group className="mt-2">
                <Form.Label className="text-warning fw-bolder">EMR</Form.Label>
                <br />
                <Button>Upload EMR</Button>
            </Form.Group>
            <Button className="mt-3" variant='primary' type='submit'>Submit</Button>
        </Form>
    
    
    </>
  )
}

export default FormNewTrade





// <Container className='justify-content-center'>
//   <form onSubmit={handleSubmit}>
//     <input type="text"
//     value={inputName}
//     onChange={handleChange}
//      />
//     <Button variant='warning' type='submit' disabled={loading}>
//       {loading ? 'Submitting...' : 'Submit'}
//     </Button>
//   </form>

//   {loading ? (
//     <Spinner animation="border" variant="primary" />
//   ): (
//     <ul>
//       {data.map((item) => (
//         <li key={item.id}>{item.trade_name}</li> // Assuming 'id' and 'text' columns
//       ))}
//     </ul>
//   )}
// </Container>