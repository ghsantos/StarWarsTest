import React from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Button,
  CardBody,
  CardHeader,
  Card,
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Spinner,
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';

const Home = ({ peoples, loading, done, getPeoples, getPeople }) => {
  const handleGetPeoples = () => {
    if (!loading && !done) {
      getPeoples();
    }
  };

  return (
    <Container>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Star Wars</NavbarBrand>
      </Navbar>

      <InfiniteScroll pageStart={0} loadMore={handleGetPeoples} hasMore={!done}>
        <Row className="content">
          {peoples.map(people => (
            <Col key={people.id} xs="12" sm="6">
              <Card style={{ margin: '15px 0' }}>
                <CardHeader tag="h4">{people.name}</CardHeader>
                <CardBody>
                  <Button>Details</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      {loading && <Spinner color="dark" />}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    peoples: state.peoplesReducer.peoples,
    loading: state.peoplesReducer.loading,
    done: state.peoplesReducer.done,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeoples: () => dispatch({ type: 'GET_PEOPLES' }),
    getPeople: id => dispatch({ type: 'GET_PEOPLE', id }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
