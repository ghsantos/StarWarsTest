import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Button,
  CardBody,
  CardHeader,
  Card,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  Row,
  Spinner,
} from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';

const Home = ({
  peoples,
  peoplesLoading,
  done,
  getPeoples,
  people,
  peopleLoading,
  getPeople,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleGetPeoples = () => {
    if (!peoplesLoading && !done) {
      getPeoples();
    }
  };

  const handleGetPeople = id => {
    getPeople(id);
    toggleModal();
  };

  return (
    <Container>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Star Wars</NavbarBrand>
      </Navbar>

      <Modal isOpen={modalVisible} toggle={toggleModal}>
        {peopleLoading && (
          <ModalBody>
            <Spinner color="dark" />
          </ModalBody>
        )}

        {!peopleLoading && (
          <>
            <ModalHeader toggle={toggleModal}>{people.name}</ModalHeader>
            <ModalBody>
              Birth year: {people.birth_year}
              <br />
              Mass: {people.mass}
              <br />
              Height: {people.height}
              <br />
              Homeworld: {people.homeworld}
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggleModal}>OK</Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      <InfiniteScroll pageStart={0} loadMore={handleGetPeoples} hasMore={!done}>
        <Row className="content">
          {peoples.map(people => (
            <Col key={people.id} xs="12" sm="6">
              <Card style={{ margin: '15px 0' }}>
                <CardHeader tag="h4">{people.name}</CardHeader>
                <CardBody>
                  <Button onClick={() => handleGetPeople(people.id)}>
                    Details
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      {peoplesLoading && <Spinner color="dark" />}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    peoples: state.peoplesReducer.peoples,
    peoplesLoading: state.peoplesReducer.loading,
    done: state.peoplesReducer.done,
    people: state.peopleReducer.people,
    peopleLoading: state.peopleReducer.loading,
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
