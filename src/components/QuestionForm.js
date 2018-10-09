import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { Form, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';

const styles = StyleSheet.create({
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    const numChoices = props.prefillData ? props.prefillData.choices.length : 2;
    const choiceIds = [];
    for (let i = 0; i < numChoices; i++)
      choiceIds.push(`${props.id}c${i}`);

    this.state = {
      choiceIds,
      text: props.prefillData ? props.prefillData.text : '',
      choices: props.prefillData ? props.prefillData.choices.slice() : ['', ''],
      answer: props.prefillData ? props.prefillData.answer : 0,
    };

    this.createChoice = this.createChoice.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onChoiceChange = this.onChoiceChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  onChoiceChange(e, i) {
    const newChoices = this.state.choices.slice();
    newChoices[i] = e.target.value;
    this.setState({ choices: newChoices });
  }

  onAnswerChange(e, i) {
    this.setState({ answer: i });
  }

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
                  <input
                    type="radio"
                    name={this.props.id}
                    id={`${choiceId}_ans`}
                    onChange={(e) => this.onAnswerChange(e, i)}
                    checked={this.state.answer === i}
                  />
                </span>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={`Choice ${i+1}`}
                id={choiceId}
                onChange={(e) => this.onChoiceChange(e, i)}
                value={this.state.choices[i]}
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
                onChange={this.onTextChange}
                value={this.state.text}
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