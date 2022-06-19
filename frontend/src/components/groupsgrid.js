import React from "react";
import { Container, Row, Col, Alert, Figure, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

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

export const GroupsGrid = () => {

  const { loading, error, data } = useQuery(GROUPS);
  if (loading) return <p>Probíhá načítání stránky...</p>;
  if (error) return (
    <Container>
      <Alert variant="danger">Došlo k chybě: {JSON.stringify(error)}</Alert>
    </Container>
  );
  if (data.groups.data.length > 0)
  return (
      <Container fluid>
        <Row sm={1} md={2} lg={3}>
          {data.groups.data.map((group, index) => (
            <Col key={group.id}>
              <div className="border p-2 m-2">
                <h3>{group.attributes.name}</h3>
                {group.attributes.image.data && (
                  <Figure>
                    <Figure.Image
                      alt={group.attributes.title}
                      src={`${process.env.REACT_APP_BACKEND_URL}${data.groups.data[index].attributes.image.data.attributes.url}`}
                      rounded
                    />
                  </Figure>
                )}
                <p>{group.attributes.content.substring(0, 100)}...</p>
                <Button
                  variant="outline-light"
                  href={`/groups/${group.id}`}
                >
                  Details
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
    return (
      <Container>
        <Alert variant="warning">Nebyl nalezen žádný článek</Alert>
      </Container>
    );
};