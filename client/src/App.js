import React from 'react';
import Editor from './Editor/Editor'
import Navbar from 'responsive-sticky-nav'
import pot from './POT.png'

function App() {
  return (
    <div>
      <Navbar
        logo={pot}
        color="black"
        drawerColor="rgba(0,0,0,0.6)"
        burgerColor="#fff"
        drawerHeight="100vh"
      >
        <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/home">Home</a></h4>
        <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/about">About</a></h4>
        <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/work">Work</a></h4>
        <h4 style={{ margin: '2rem 0' }}><a style={{ color: 'white' }} href="/contact">Contact</a></h4>
      </Navbar>
      <div className="App">
        <Editor />
      </div>
    </div>
  );
}

export default App;
