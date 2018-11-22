import React from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import {
  Card, CardImg, CardBody,
  CardTitle, Button, Container, Row, Col
} from 'reactstrap';

export default class DashboardPage extends React.Component {

  render() {
    return (
      <div className="layout">
        <Container>
          <Row>
            <Col>
              <Card>
                <CardImg top width="100%" src="https://static.turbosquid.com/Preview/2014/05/24__20_18_23/Back-1.jpg10e99a01-69cf-42bc-9f8e-287ba6ba1896Larger.jpg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>My saved Home</CardTitle>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardImg top width="100%" src="https://static.turbosquid.com/Preview/2014/05/24__20_18_23/Back-1.jpg10e99a01-69cf-42bc-9f8e-287ba6ba1896Larger.jpg" alt="Card image cap" />
                <CardBody>
                  <Link to="/samples">
                    <CardTitle>Sample designs</CardTitle>
                    <Button>Button</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardImg top width="100%" src="https://static.turbosquid.com/Preview/2014/05/24__20_18_23/Back-1.jpg10e99a01-69cf-42bc-9f8e-287ba6ba1896Larger.jpg" alt="Card image cap" />
                <CardBody>
                  <Link to="/editor">
                    <CardTitle>Create New</CardTitle>
                    <Button>Button</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    )
  }
}
