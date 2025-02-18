import { Row, Col, Navbar, Container } from 'react-bootstrap'
import { Link, useResolvedPath } from 'react-router-dom'

function Navigation() {

  return (
    <>
      <Row className='justify-content-center bg-body-tertiary mb-4'>
        <Col style={{marginLeft: '3rem'}}>
          <Row>
            <Col className='text-end' style={{alignSelf: 'center'}}>
              <a href="/" style={{textDecoration: 'none'}}>
                <h1 className='text-warning'>
                  Turner
                </h1>
              </a>
            </Col>
            <Col style={{alignSelf: 'center'}}>
              <h5 className='text-dark m-0'>
                Safety Dashboard
              </h5>
            </Col>
          </Row>
        </Col>
        <Col className='text-end' style={{marginRight: '3rem', alignSelf: 'center'}}>
          <Link to="/admin" style={{textDecoration: 'none'}}>
            <h5>
              Admin
            </h5>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default Navigation