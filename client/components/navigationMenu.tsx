import { observer } from 'mobx-react';
import Link from 'next/link';
import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import classes from '../styles/NavigationMenublock.module.css'

const NavigationMenu = ({ props }: any) => {
    return (
        <Navbar className={classes.menuContainer} variant="dark" sticky="top" >
            <Container className={classes.rootLink}>
                <Nav className="me-auto">
                    <Nav.Link href="/">Главная</Nav.Link>
                    {
                        props.Pages && props.Pages.getAllRootProductsCategories.map((item: any) => (
                            <NavDropdown key={item.id} title={item.name} id={item.id}>
                                {
                                    item.children.map((item2: any) => (
                                        <NavDropdown.Item key={item2.id} href={"/magazine/" + String(item2.id)}>{item2.name}</NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        ))
                    }
                    {
                        props.Pages && props.Pages.getAllPages.map((item: any) => (
                            <Nav.Link key={item.id} href={item.url}>{item.title}</Nav.Link>))
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default observer(NavigationMenu);