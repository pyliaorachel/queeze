import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from './Header';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Quiz extends AuthComponent {
  constructor(props) {
    super(props);
    this.renderQuestionList = this.renderQuestionList.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.match.params.quizName);
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
    const path = this.props.location.pathname;
    return (
      <ButtonGroup className="mb-2 mt-4">
        <Button variant="primary" href={`${path}/play`}>▸ Play</Button>
        <Button className="ml-2" variant="warning" href={`${path}/edit`}>✎ Edit</Button>
        <Button className="ml-2" variant="danger" href={`${path}/delete`}>✖︎ Delete</Button>
      </ButtonGroup>
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