import { Row, Col, Navbar, Container, Button } from 'react-bootstrap'
import { Link, useResolvedPath } from 'react-router-dom'

function Navigation() {

  return (
    <>
      <Row className='justify-content-center bg-body-tertiary mb-4'>
        <Col style={{marginLeft: '3rem'}}>
          <Row>
            <Col className='text-end' style={{alignSelf: 'center'}}>
              <a href="/" style={{textDecoration: 'none'}}>
                <h1 style={{color: 'navy'}}>
                  <strong>Turner</strong>
                </h1>
              </a>
            </Col>
            <Col style={{alignSelf: 'center'}}>
              <h5 className='text-dark m-0'>
                Project Management Dashboard
              </h5>
            </Col>
          </Row>
        </Col>
        <Col className='text-end' style={{marginRight: '3rem', alignSelf: 'center'}}>
          <Link to="/admin" style={{textDecoration: 'none'}}>
            <Button variant='outline-secondary'>
              Admininstrator
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default Navigation