import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { Form, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';

const styles = StyleSheet.create({
});

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    // const numChoices = props.data ? props.data.choices.length : 2;
    // const choiceIds = [];
    // for (let i = 0; i < numChoices; i++)
    //   choiceIds.push(`${props.id}c${i}`);
    // const numChoices = props.data ? props.data.choices.length : 2;
    // const choiceIds = [];
    // for (let i = 0; i < numChoices; i++)
    //   choiceIds.push(i);

    this.state = {
      // choiceIds,
      // text: props.prefillData ? props.prefillData.text : '',
      // choices: props.prefillData ? props.prefillData.choices.slice() : ['', ''],
      // answer: props.prefillData ? props.prefillData.answer : 0,
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
    if (this.props.data.choices.length >= 10) return;
    this.props.onQuestionCreateChoice(this.props.id);
  }

  renderChoices() {
    const { id } = this.props;
    const qid = `q${id}`;
    const { choices, answer } = this.props.data;
    return (
      <Form.Group ref="choices">
      {
        (choices.map((choice, i) => {
          return (
            <InputGroup key={i} className="mb-1">
              <InputGroup.Prepend>
                <span className="input-group-text">
                  <input
                    type="radio"
                    name={qid}
                    ref={`c${i}_ans`}
                    onChange={(e) => this.props.onQuestionAnswerChange(e, id, i)}
                    checked={answer === i}
                  />
                </span>
              </InputGroup.Prepend>
              <Form.Control
                placeholder={`Choice ${i+1}`}
                ref={`c${i}`}
                onChange={(e) => this.props.onQuestionChoiceChange(e, id, i)}
                value={choices[i]}
              />
            </InputGroup>
          );
        }))
      }
      </Form.Group>
    );
  }

  render() {
    const { id, questionNum } = this.props;
    const qid = `q${id}`;
    const { text } = this.props.data;
    return (
      <Card className="mb-4">
        <Form.Group className="mb-0">
          <Card.Header>Question {questionNum}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="What is your question?"
                ref="text"
                onChange={(e) => this.props.onQuestionTextChange(e, id)}
                value={text}
              />
            </Card.Text>

            { this.renderChoices() }
            
            <ButtonToolbar className="justify-content-between">
              <Button variant="outline-success" onClick={() => this.createChoice()}>✚ New Choice</Button>
              <Button variant="danger" onClick={() => this.props.delete(id)}>✖︎ Delete Question</Button>
            </ButtonToolbar>
          </Card.Body>
        </Form.Group>
      </Card>
    );
  }
}

export default QuestionForm;