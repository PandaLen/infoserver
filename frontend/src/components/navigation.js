import React from 'react';
import { Nav, Container, Navbar } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import './navigation.css';

const GROUPS = gql`
  query Groups {
    groups {
      data {
        id
        attributes {
          name
          content
          image {
            data {
              attributes {
                url
              }
            }
          }
          link
          category {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const Navigation = () => {
    const { loading, error } = useQuery(GROUPS);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
    return (
        <Navbar expand="lg"  variant="dark">
            <Container>
            <Navbar.Brand href="/">Kpop</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/groups">Groups</Nav.Link>
                <Nav.Link href="/soloists">Soloists</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}