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
      questionsData: [],
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
    // Questions
    this.onQuestionCreateChoice = this.onQuestionCreateChoice.bind(this);
    this.onQuestionTextChange = this.onQuestionTextChange.bind(this);
    this.onQuestionChoiceChange = this.onQuestionChoiceChange.bind(this);
    this.onQuestionAnswerChange = this.onQuestionAnswerChange.bind(this);
    this.getQuestionsDataCopyAndIdx = this.getQuestionsDataCopyAndIdx.bind(this);
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

  getQuestionsDataCopyAndIdx(questionId) {
    const questionIds = this.state.questionIds;
    const idx = questionIds.indexOf(questionId); // array index of this question in the array

    const newQuestionsData = this.state.questionsData.slice();
    return { newQuestionsData, idx };
  }

  onQuestionCreateChoice(questionId) {
    const { newQuestionsData, idx } = this.getQuestionsDataCopyAndIdx(questionId);
    newQuestionsData[idx].choices.push('');
    this.setState({
      questionsData: newQuestionsData,
    });
  }

  onQuestionTextChange(e, questionId) {
    const { newQuestionsData, idx } = this.getQuestionsDataCopyAndIdx(questionId);
    newQuestionsData[idx].text = e.target.value;
    this.setState({ 
      questionsData: newQuestionsData,
    });
  }

  onQuestionChoiceChange(e, questionId, i) {
    const { newQuestionsData, idx } = this.getQuestionsDataCopyAndIdx(questionId);
    newQuestionsData[idx].choices[i] = e.target.value;
    this.setState({ 
      questionsData: newQuestionsData,
    });
  }

  onQuestionAnswerChange(e, questionId, i) {
    const { newQuestionsData, idx } = this.getQuestionsDataCopyAndIdx(questionId);
    newQuestionsData[idx].answer = i;
    this.setState({ 
      questionsData: newQuestionsData,
    });  
  }

  createQuiz() {
    let { name } = this.state;
    const errors = [];

    // Validate values
    name = name.trim();
    if (name === '')
      errors.push('Quiz name cannot be empty.');

    const questions = this.state.questionsData.slice().map((questionData, i) => {
      // Question description
      const text = questionData.text.trim();
      if (text === '')
        errors.push(`Question ${i+1}: Question description cannot be empty.`);

      // Choices & answer
      const choices = [];
      questionData.choices.forEach((choice, j) => {
        choice = choice.trim();

        if (choice.length > 0) {
          choices.push(choice);
        } else if (j === questionData.answer) {
          errors.push(`Question ${i+1}: Selected choice must has some text.`);
        }
      });

      if (choices.length < 2 || choices.length > 10)
        errors.push(`Question ${i+1}: Only 2 to 10 choices are allowed for each question.`);

      return { text, choices, answer: questionData.answer };
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
    const newQuestionsData = this.state.questionsData.slice();

    // Create a new question for each data if already has data, else create an empty one
    questionsData.forEach(questionData => {
      newQuestionIds.push(newQuestionId);

      const newQuestionData = {
        text: questionData ? questionData.text : '',
        choices: questionData ? questionData.choices.slice() : ['', ''],
        answer: questionData ? questionData.answer : 0,
      };
      newQuestionsData.push(newQuestionData);

      newQuestionId++;
    });

    this.setState({
      questionIds: newQuestionIds,
      questionsData: newQuestionsData,
    });
  }

  deleteQuestion(questionId) {
    const idx = this.state.questionIds.indexOf(questionId);

    // Remove item at `idx`
    const newQuestionIds = this.state.questionIds.slice();
    newQuestionIds.splice(idx, 1);
    const newQuestionsData = this.state.questionsData.slice();
    newQuestionsData.splice(idx, 1);

    this.setState({
      questionIds: newQuestionIds,
      questionsData: newQuestionsData,
    });
  }

  renderOperations() {
    const path = this.props.location.pathname;
    const createOrDone = this.props.edit ? '✓ Done' : '✓ Create';
    return (
      <Row className="justify-content-md-center">
        <ButtonGroup vertical className="mt-3">
          <Button variant="outline-success" onClick={(e) => this.createQuestion()}>✚ New Question</Button>
          <ButtonGroup className="mt-2">
            <Button variant="primary" onClick={this.createQuiz}>{ createOrDone }</Button>
            <Button className="ml-2" variant="light" onClick={this.cancel}>✖︎ Cancel</Button>
          </ButtonGroup>
        </ButtonGroup>
      </Row>
    );
  }

  render() {
    const { questionsData, questionIds, errors } = this.state;
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
              ref="quizName"
              size="lg"
              type="text"
              placeholder="Quiz Name"
              onChange={this.onChangeName}
              value={this.state.name}
            />
          </Form.Group>
          {
            (questionsData.map((questionData, i) => {
              return (
                <QuestionForm
                  data={questionData}
                  key={i}
                  questionNum={i+1}
                  id={questionIds[i]}
                  ref={`q${questionIds[i]}`}
                  delete={this.deleteQuestion}
                  onQuestionCreateChoice={this.onQuestionCreateChoice}
                  onQuestionTextChange={this.onQuestionTextChange}
                  onQuestionChoiceChange={this.onQuestionChoiceChange}
                  onQuestionAnswerChange={this.onQuestionAnswerChange}
                />);
            }))
          }
        </Form>

        {/* Other operations */}
        { this.renderOperations() }
      </div>
    );
  }
}

export default QuizForm;