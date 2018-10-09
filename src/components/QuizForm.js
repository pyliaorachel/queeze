import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Form, Row, Button, ButtonGroup, ButtonToolbar, Card, InputGroup } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import QuestionForm from './QuestionForm';
import Alert from './Alert';
import Header from '../containers/Header';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class QuizForm extends AuthComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      questionList: [],
      questionIds: [],
      errors: [],
    };

    this.prefillQuestions = this.prefillQuestions.bind(this);    
    this.cancel = this.cancel.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.renderOperations = this.renderOperations.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  componentDidMount() {
    // If in edit mode, prefill quiz data; else, init one question form
    if (this.props.edit) {
      const quizName = this.props.match.params.quizName;
      const questionsData = this.props.quiz.questionList[quizName];
      if (questionsData)
        this.prefillQuestions(questionsData);
      else {
        this.props.fetchQuiz(quizName)
          .then(res => {
            if (!res)
              this.createQuestion();
            else
              this.prefillQuestions(res);
          });
      }
    } else
      this.createQuestion();
  }

  prefillQuestions(questionsData) {
    this.setState({ name: this.props.match.params.quizName }, () => {
      this.createQuestion(questionsData);
    });
  }

  cancel() {
    this.props.history.goBack();
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
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
      let oper = this.props.edit ? this.props.editQuiz : this.props.createQuiz;
      let originalQuizName = this.props.edit ? this.props.match.params.quizName : '';
      oper(data, originalQuizName)
        .then(result => {
          if (result !== 1)
            this.setState({ errors: [result] });
          else
            this.props.history.push(`/quiz/${name}`);
        });
    }
  }

  createQuestion(questionsData) { // questionData only avaialble if prefilling
    if (!questionsData) questionsData = [null]; // default to creating one question

    // Find the current largest question id and create a new one after it
    let newQuestionId = this.state.questionIds.length === 0 ? 0 : Math.max(...this.state.questionIds) + 1;
    const newQuestionIds = this.state.questionIds.slice();
    const newQuestionList = this.state.questionList.slice();

    // Create a new question for each data if already has data, else create an empty one
    questionsData.forEach(questionData => {
      newQuestionIds.push(newQuestionId);

      const newQuestion = (
        <QuestionForm
          prefillData={questionData}
          key={newQuestionId}
          id={`q${newQuestionId}`}
          delete={this.deleteQuestion}
        />);
      newQuestionList.push(newQuestion);

      newQuestionId++;
    });

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
          <Button variant="outline-success" onClick={(e) => this.createQuestion()}>✚ New Question</Button>
          <ButtonGroup className="mt-2">
            <Button variant="primary" onClick={this.createQuiz}>✓ Done</Button>
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

        {/* Quiz edit form */}
        <Form>
          <Form.Group controlId="quizName">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Quiz Name"
              onChange={this.onChangeName}
              value={this.state.name}
            />
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