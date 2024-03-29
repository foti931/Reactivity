import { observer } from "mobx-react-lite";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";

export default observer(function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={Link} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    <Button as={NavLink} to='/createactivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu >
    )
})