import React from "react";
import { Container, Row, Col, Alert, Figure, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const SOLOISTS = gql`
  query Solosits { 
	  soloists{
      data{
        id
        attributes{
          name
          content
          image{
            data{
          	  attributes{
                url
              }
            }
          }
          link
        }
      }
    }
  }
`;

export const SoloistsGrid = () => {

  const { loading, error, data } = useQuery(SOLOISTS);
  if (loading) return <p>Probíhá načítání stránky...</p>;
  if (error) return (
    <Container>
      <Alert variant="danger">Došlo k chybě: {JSON.stringify(error)}</Alert>
    </Container>
  );
  if (data.soloists.data.length > 0)
  return (
      <Container fluid>
        <Row sm={1} md={2} lg={3}>
          {data.soloists.data.map((soloist, index) => (
            <Col key={soloist.id}>
              <div className="border p-2 m-2">
                <h3>{soloist.attributes.name}</h3>
                {soloist.attributes.image.data && (
                  <Figure>
                    <Figure.Image
                      alt={soloist.attributes.title}
                      src={`${process.env.REACT_APP_BACKEND_URL}${data.soloists.data[index].attributes.image.data.attributes.url}`}
                      rounded
                    />
                  </Figure>
                )}
                <p>{soloist.attributes.content.substring(0, 100)}...</p>
                <Button
                  variant="outline-light"
                  href={`/soloists/${soloist.id}`}
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