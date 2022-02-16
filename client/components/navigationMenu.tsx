import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import classes from '../styles/NavigationMenublock.module.css'
const NavigationMenu = () => {
    return (
        <Navbar className={classes.menuContainer} variant="dark" sticky="top" >
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;