import { observer } from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useStore } from '../stores/StoreProvider';
import classes from '../styles/NavigationMenublock.module.css'

const NavigationMenu = ({ props }: any) => {
    return (
        <Navbar className={classes.menuContainer} variant="dark" sticky="top" >
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    {
                        props.Pages.map((item: any) => (<Nav.Link key={item.id} href={item.url}>{item.title}</Nav.Link>))
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default observer(NavigationMenu);