import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Figure } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const SOLOISTS = gql`
  query Soloist($id: ID!) {
    soloist(id: $id) {
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
            }
          }
        }
      }
`;

export default function Soloists() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(SOLOISTS, { variables: { id: id } });
  if (loading) return <p>Probíhá načítání stránky...</p>;
  if (error) return <p>Došlo k chybě: {JSON.stringify(error)}</p>;
  const soloist = data.soloist.data;
  return (
    <Row>
      <h1 className="text-white p-3 text-center">
        {soloist.attributes.name}
      </h1>
      <Col>
        {soloist.attributes.content}
      </Col>
      <Col>
        {soloist.attributes.image.data && (
          <Figure>
            <Figure.Image
              alt={soloist.attributes.title}
              src={`${process.env.REACT_APP_BACKEND_URL}${soloist.attributes.image.data.attributes.url}`}
              rounded
            />
          </Figure>
        )}
      </Col>
    </Row>
  );
}
