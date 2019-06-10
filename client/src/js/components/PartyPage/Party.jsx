import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Party = () => (
  <div className="container text-center">
    <h1>This is a Party!!!</h1>
    <hr />
    <Link to="/">Back To Home View</Link>
  </div>
);

export default Party;
