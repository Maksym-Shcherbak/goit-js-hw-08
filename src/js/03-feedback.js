import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
let feedbackDataToLs = {};
const {
  elements: { email, message },
} = feedbackForm;

restoreUserInputs();

feedbackForm.addEventListener('input', throttle(saveFeedbackData, 500));
feedbackForm.addEventListener('submit', onSubmitForm);

function saveFeedbackData(e) {
  feedbackDataToLs[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackDataToLs));
}

function onSubmitForm(e) {
  e.preventDefault();
  e.currentTarget.reset();
  //const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log(feedbackDataToLs);
  feedbackDataToLs = {};
  localStorage.removeItem('feedback-form-state');
}

function restoreUserInputs() {
  const savedFeedback = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedFeedback) {
    message.value = savedFeedback.message || '';
    email.value = savedFeedback.email || '';
    feedbackDataToLs[email.name] = savedFeedback.email;
    feedbackDataToLs[message.name] = savedFeedback.message;
  }
}
