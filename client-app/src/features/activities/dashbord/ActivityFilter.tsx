import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilter() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: '2em' }}>
                <Header icon='filter' content='Filters' color="teal" attached />
                <Menu.Item content='All Activities' />
                <Menu.Item content="I'm Going" />
                <Menu.Item content="I'm Hosting" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}