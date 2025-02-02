import { Component, ReactNode } from 'react';

class ThrowErrorButton extends Component {
  private handleClick() {
    this.setState(() => {
      throw new Error('This is a test error!');
    });
  }

  render(): ReactNode {
    return (
      <button onClick={this.handleClick.bind(this)} className="error-button">
        Click to Throw Error
      </button>
    );
  }
}

export default ThrowErrorButton;
