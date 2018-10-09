import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from './Header';
import * as utils from '../utils/utils';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class QuizPlay extends AuthComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      choices: [],
      answer: -1,
      currentQuestion: -1,
      chosen: -1,
    };

    this.next = this.next.bind(this);
    this.stop = this.stop.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
  }

  componentDidMount() {
    // Fetch question list and start
    const quizName = this.props.match.params.quizName;
    const questionList = this.props.quiz.questionList[quizName];
    if (!questionList) {
      this.props.fetchQuiz(quizName)
        .then(() => {
          this.setState({ questionList: this.props.quiz.questionList[quizName] }, () => this.next());
        });
    } else {
      this.setState({ questionList }, () => this.next());
    }
  }

  next() {
    const currentQuestion = Math.round(Math.random() * (this.state.questionList.length - 1));
    const originalChoices = this.state.questionList[currentQuestion].choices.slice();
    const originalAns = this.state.questionList[currentQuestion].answer;

    const choices = utils.shuffle(originalChoices);
    const answer = choices.indexOf(originalChoices[originalAns]);

    this.setState({ 
      currentQuestion,
      choices,
      answer,
      chosen: -1,
    });
  }

  stop() {
    this.props.history.push('/');
  }

  chooseAnswer(chosen) {
    this.setState({ chosen });
  }

  renderChoices() {
    const { choices, answer, chosen } = this.state;
    return (
      <ButtonGroup vertical>
        {
          (choices.map((choice, i) => {
            const variant = (chosen !== -1 && answer === i) ? 'success'
              : (chosen === i && chosen !== answer) ? 'danger' : 'light';
            return (
              <Button key={i}
                variant={variant}
                onClick={() => this.chooseAnswer(i)}
              >
                {choice}
              </Button>
            );
          }))
        }
      </ButtonGroup>
    );
  }

  renderQuestion() {
    const question = this.state.questionList[this.state.currentQuestion];
    return (
      <Card className="mb-4">
        <Card.Header as="h5">Question</Card.Header>
        <Card.Body>
          <Card.Text>{ question.text }</Card.Text>
          { this.renderChoices() }
        </Card.Body>
      </Card>
    );
  }

  renderOperations() {
    const isPlaying = this.state.currentQuestion !== -1;
    return (
      <ButtonToolbar className="justify-content-between mb-2 mt-4">
        <ButtonGroup>
          <Button variant="danger" onClick={this.stop}>◼ Stop</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="info" onClick={this.next} disabled={!isPlaying}>▸ Next</Button>
        </ButtonGroup>
      </ButtonToolbar>
    );
  }

  render() {
    const quizName = this.props.match.params.quizName;
    const currentQuestion = this.state.currentQuestion;
    return (
      <div className="appContainer">
        <Header details={quizName} />

        <h2>{ quizName }</h2>

        { this.renderOperations() }

        { 
          (currentQuestion !== -1) ?
            this.renderQuestion()
          :
            null
        }
      </div>
    );
  }
}

export default QuizPlay;