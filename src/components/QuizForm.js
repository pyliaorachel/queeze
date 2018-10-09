import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Form, Row, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import QuestionForm from './QuestionForm';
import Alert from './Alert';
import Header from './Header';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class QuizForm extends AuthComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      questionIds: [],
      errors: [],
    };

    this.cancel = this.cancel.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
  }

  componentDidMount() {
    // Initially one question form
    this.createQuestion();
  }

  cancel() {
    this.props.history.goBack();
  }

  createQuiz() {
    const questionIds = this.state.questionIds.map(questionId => `q${questionId}`);
    const errors = [];

    // Extract values from form & validate
    const name = document.getElementById('quizName').value.trim();
    if (name === '')
      errors.push('Quiz name cannot be empty.');
    const questions = questionIds.map((questionId, i) => {
      // Question description
      const text = document.getElementById(`${questionId}_text`).value.trim();
      if (text === '')
        errors.push(`Question ${questionId}: Question description cannot be empty.`);

      // Choices & answer
      const numChoices = document.getElementById(`${questionId}_choices`).childElementCount;
      const choices = []; let answer = 0;
      for (let j = 0; j < numChoices; j++) {
        const choiceId = `${questionId}c${j}`;
        const choiceText = document.getElementById(choiceId).value.trim();
        if (choiceText.length > 0) {
          choices.push(choiceText);
          if (document.getElementById(`${choiceId}_ans`).checked)
            answer = choices.length - 1;
        } else if (document.getElementById(`${choiceId}_ans`).checked) {
          errors.push(`Question ${questionId}: Selected choice must has some text.`);
        }
      };
      if (choices.length < 2 || choices.length > 10)
        errors.push(`Question ${questionId}: Only 2 to 10 choices are allowed for each question.`);

      return { text, choices, answer };
    });

    // Display error message, or create valid quiz
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      const data = { name, questions };
      this.props.createQuiz(data)
        .then(result => {
          if (result !== 1)
            this.setState({ errors: [result] });
          else
            this.props.history.goBack();
        });
    }
  }

  createQuestion() {
    // Find the current largest question id and create a new one after it
    const newQuestionId = this.state.questionIds.length === 0 ? 0 : Math.max(...this.state.questionIds) + 1;
    const newQuestionIds = this.state.questionIds.slice();
    newQuestionIds.push(newQuestionId);

    const l = this.state.questionIds.lengsth;
    const newQuestion = (
      <QuestionForm
        key={newQuestionId}
        id={`q${newQuestionId}`}
        delete={this.deleteQuestion}
      />);
    const newQuestionList = this.state.questionList.slice();
    newQuestionList.push(newQuestion);

    this.setState({
      questionIds: newQuestionIds,
      questionList: newQuestionList,
    });
  }

  deleteQuestion(questionId) {
    questionId = parseInt(questionId.slice(1));
    const idx = this.state.questionIds.indexOf(questionId);

    // Remove item at `idx`
    const newQuestionIds = this.state.questionIds.slice();
    newQuestionIds.splice(idx, 1);
    const newQuestionList = this.state.questionList.slice();
    newQuestionList.splice(idx, 1);

    this.setState({
      questionIds: newQuestionIds,
      questionList: newQuestionList,
    });
  }

  renderOperations() {
    const path = this.props.location.pathname;
    return (
      <Row className="justify-content-md-center">
        <ButtonGroup vertical className="mt-3">
          <Button variant="outline-success" onClick={this.createQuestion}>✚ New Question</Button>
          <ButtonGroup className="mt-2">
            <Button variant="primary" onClick={this.createQuiz}>✓ Create</Button>
            <Button className="ml-2" variant="light" onClick={this.cancel}>✖︎ Cancel</Button>
          </ButtonGroup>
        </ButtonGroup>
      </Row>
    );
  }

  render() {
    const { questionList, errors } = this.state;
    return (
      <div className="appContainer">
        <Header details='New Quiz' />

        {/* Error messages */}
        {
          (errors).map((error, i) => {
            return (
              <Alert key={i} variant='danger' message={error} />
            );
          })
        }

        {/* Quiz creation form */}
        <Form>
          <Form.Group controlId="quizName">
            <Form.Control size="lg" type="text" placeholder="Quiz Name" />
          </Form.Group>
          { questionList }
        </Form>

        {/* Other operations */}
        { this.renderOperations() }
      </div>
    );
  }
}

export default QuizForm;