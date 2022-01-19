import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';

const Navigation = ({user, logUserOut}) => {
    const logout = () => {
        logUserOut()
    }

    return (
        <Navbar className='navBar' bg='dark' variant='dark' fixed='top'>
            <Container>
                <Navbar.Brand to='/'> Stranger Things </Navbar.Brand>
                <Nav className='me'>
                    {user && <Nav.Link href='/'>Home</Nav.Link>}
                    {user && <Nav.Link href='/post'>Post</Nav.Link>}
                    {user && <Nav.Link href='/profile'>Profile</Nav.Link>}
                    {!user && <Nav.Link href='/login'>Login</Nav.Link>}
                    {!user && <Nav.Link href='/signup'>Sign-up</Nav.Link>}
                    {user && <Nav.Link href='/' onClick={logout}>Logout</Nav.Link>}
                </Nav>
           </Container>
        </Navbar>
    )
}

export default Navigation;