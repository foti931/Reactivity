import { Link } from "react-router-dom";
import { Button, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment textAlign="center">
            <Icon name="search" size="huge"></Icon>
            <h3>Oops! We've looked everywhere but we could not find what your are looking for!</h3>
            <Button content="Back to Activities" as={Link} to={'/activities'} />
        </Segment >
    );
}