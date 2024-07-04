
import React from 'react';
import '../index.css'
interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = (props) => {
  return <h1 className="text-7xl text-blue-400 text-center underline ">Hello, {props.name}!</h1>;
};

export default Hello;
