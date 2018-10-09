import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from './Header';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Quiz extends AuthComponent {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.play = this.play.bind(this);
    this.back = this.back.bind(this);
    this.renderQuestionList = this.renderQuestionList.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.quizName);
  }

  edit() {
    const path = this.props.location.pathname;
    this.props.history.push(`${path}/edit`);
  }

  delete() {
    this.props.deleteQuiz(this.props.match.params.quizName);
    this.props.history.push('/');
  }

  play() {
    const path = this.props.location.pathname;
    this.props.history.push(`${path}/play`);
  }

  back() {
    this.props.history.push('/');
  }

  renderChoices(choices, answer) {
    return (
      <ButtonGroup vertical>
        {
          (choices.map((choice, i) => {
            return (
              <Button key={i}
                variant={(i == answer ? 'success' : 'light')}
                disabled
              >
                {choice}
              </Button>
            );
          }))
        }
      </ButtonGroup>
    );
  }

  renderQuestion(question, i) {
    return (
      <Card key={i} className="mb-4">
        <Card.Header as="h5">Question {i+1}</Card.Header>
        <Card.Body>
          <Card.Text>{ question.text }</Card.Text>
          { this.renderChoices(question.choices, question.answer) }
        </Card.Body>
      </Card>
    );
  }

  renderQuestionList() {
    const quizName = this.props.match.params.quizName;
    const questionList = this.props.quiz.questionList[quizName];
    return (
      <div>{ questionList.map(this.renderQuestion) }</div>
    );
  }

  renderOperations() {
    return (
      <ButtonToolbar className="justify-content-between mb-2 mt-4">
        <ButtonGroup>
          <Button variant="light" onClick={this.back}>⟲ Back</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="primary" onClick={this.play}>▸ Play</Button>
          <Button className="ml-2" variant="warning" onClick={this.edit}>✎ Edit</Button>
          <Button className="ml-2" variant="danger" onClick={this.delete}>✖︎ Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  render() {
    const quizName = this.props.match.params.quizName;
    const questionList = this.props.quiz.questionList[quizName];
    return (
      <div className="appContainer">
        <Header details={quizName} />

        <h2>{ quizName }</h2>
        { 
          (questionList) ?
            this.renderOperations()
          :
            null
        }
        { 
          (questionList) ?
            this.renderQuestionList()
          :
            null
        }
      </div>
    );
  }
}

export default Quiz;