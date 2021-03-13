import React, {Component} from "react";

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({counter: this.state.counter +1})
  }
  render() {
    return(
      <div>
        <h1>Counter</h1>
        <span>current State: {this.state.counter}</span>
        <br/>
        <button onClick={this.handleClick}>click me</button>
      </div>
    )
  }
}

class Foo {
  constructor() {
    this.id = 'foo'; // this контекст равен контексту класса Bar
    this.print(); // this.print - вызывает print класса Bar // - 1 "bar foo"
  }
  print(){
    console.log('foo ' + this.id)
  }
}

class Bar extends Foo {
  constructor() {
    super(); // вызывает Foo constructor
    this.id = 'bar';
    this.print();
    super.print(); // явно вызываем метод у класса Foo
  }
  print(){
    console.log('bar ' + this.id)
  }
}
new Bar()
export default BuggyCounter;