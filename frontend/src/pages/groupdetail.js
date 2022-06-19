import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Figure } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
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

export default function Groups() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GROUP, { variables: { id: id } });
  if (loading) return <p>Probíhá načítání stránky...</p>;
  if (error) return <p>Došlo k chybě: {JSON.stringify(error)}</p>;
  const group = data.group.data;
  return (
    <Row>
      <h1 className="text-white p-3 text-center">
        {group.attributes.name}
      </h1>
        <p className="small text-center text-secondary mb-4">{" "}
        { group.attributes.category.data.attributes.name }
      </p>
      <Col>
          {group.attributes.content}
          <p></p>
          <p><b>Newest MV:</b> <a href={group.attributes.link} target="_blank">{group.attributes.link}</a></p>
      </Col>
      <Col>
        {group.attributes.image.data && (
          <Figure>
            <Figure.Image
              alt={group.attributes.title}
              src={`${process.env.REACT_APP_BACKEND_URL}${group.attributes.image.data.attributes.url}`}
              rounded
            />
          </Figure>
        )}
      </Col>
    </Row>
  );
}
