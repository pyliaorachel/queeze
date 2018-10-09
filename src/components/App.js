import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Button, Row } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from '../containers/Header';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
  title: {
    color: '#000',
    maxWidth: 300,
    fontSize: 56,
  },
});

class App extends AuthComponent {
  constructor(props) {
    super(props);
    this.renderQuizList = this.renderQuizList.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.play = this.play.bind(this);
    this.gotoDetailPage = this.gotoDetailPage.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuizList();
  }

  createQuiz() {
    this.props.history.push('/quiz/create');
  }

  play(quizName) {
    this.props.history.push(`/quiz/${quizName}/play`);
  }

  gotoDetailPage(quizName) {
    this.props.history.push(`/quiz/${quizName}`);
  }

  renderQuiz(quiz, i) {
    return (
      <Card key={i} className="mb-4">
        <Card.Header as="h5">{ quiz.name }</Card.Header>
        <Card.Body>
          <Card.Text>{ quiz.questions.length } { quiz.questions.length <= 1 ? 'question' : 'questions' }</Card.Text>
          <Button variant="primary" onClick={() => this.play(quiz.name)}>▸ Play</Button>
          <Button className="ml-2" variant="light" onClick={() => this.gotoDetailPage(quiz.name)}>☞ Detail</Button>
        </Card.Body>
      </Card>
    );
  }

  renderQuizList() {
    const quizList = this.props.quiz.quizList;
    return (
      <div>{ quizList.map(this.renderQuiz) }</div>
    );
  }

  render() {
    return (
      <div>
        <Header details='Homepage' />

        { (this.props.quiz.quizList.length > 0) ?
            this.renderQuizList()
          :
            null
        }

        <Row className="justify-content-md-center">
          <Button className="mt-3" variant="outline-success" onClick={this.createQuiz}>✚ New Quiz</Button>
        </Row>
      </div>
    );
  }
}

export default App;
