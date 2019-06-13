import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Questions
//    Set
//    Start
//      Take answers
//    Finish
//    Calculate winner
//    Show Question winner
//  Next

const shape = {
  question: 1,
  status: 'Set',
  timer: 20, // Remaining time to move to next state
  anwsers: [], // List of parties answers in arrival order
  random: [], // Random answers generated from track list
  track: '', // Curren track from which to take correct answer
};


const Track = () => (
  <div className="container text-center">
    <h1>This is a Track!!!</h1>
    <hr />
    <Link to="/">Back To Home View</Link>
  </div>
);

export default Track;
