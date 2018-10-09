import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { Form, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';

const styles = StyleSheet.create({
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choiceIds: [`${props.id}c0`, `${props.id}c1`],
      // text: '',
      // choices: ['', ''],
      // answer: 0,
    };

    this.createChoice = this.createChoice.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    // this.onTextChange = this.onTextChange.bind(this);
    // this.onChoiceChange = this.onChoiceChange.bind(this);
    // this.onAnswerChange = this.onAnswerChange.bind(this);
  }

  // onTextChange(e) {
  //   this.setState({ text: e.target.value });
  // }

  // onChoiceChange(e, i) {
  //   const newChoices = this.state.choices.slice();
  //   newChoices[i] = e.target.value;
  //   this.setState({ choices: newChoices });
  // }

  // onAnswerChange(e, i) {
  //   this.setState({ answer: i });
  // }

  createChoice() {
    if (this.state.choiceIds.length >= 10) return;

    const newChoiceIds = this.state.choiceIds.slice();
    const lastChoiceNum = parseInt(newChoiceIds[newChoiceIds.length-1].slice(this.props.id.length+1));
    newChoiceIds.push(`${this.props.id}c${lastChoiceNum+1}`);

    this.setState({
      choiceIds: newChoiceIds,
    });
  }

  renderChoices() {
    const choiceIds = this.state.choiceIds;
    return (
      <Form.Group id={`${this.props.id}_choices`}>
      {
        (choiceIds.map((choiceId, i) => {
          return (
            <InputGroup key={i} className="mb-1">
              <InputGroup.Prepend>
                <span className="input-group-text">
                  <input type="radio" name={this.props.id} id={`${choiceId}_ans`} defaultChecked={i == 0} />
                </span>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={`Choice ${i+1}`}
                id={choiceId}
              />
            </InputGroup>
          );
        }))
      }
      </Form.Group>
    );
  }

  render() {
    const { id } = this.props;
    return (
      <Card id={id} className="mb-4">
        <Form.Group className="mb-0">
          <Card.Header>Question { id }</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="What is your question?"
                id={`${id}_text`}
              />
            </Card.Text>

            { this.renderChoices() }
            
            <ButtonToolbar className="justify-content-between">
              <Button variant="outline-success" onClick={() => this.createChoice()}>✚ New Choice</Button>
              <Button variant="danger" onClick={() => this.props.delete(this.props.id)}>✖︎ Delete Question</Button>
            </ButtonToolbar>
          </Card.Body>
        </Form.Group>
      </Card>
    );
  }
}

export default QuestionForm;