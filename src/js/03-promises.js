import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', formNumber);

function formNumber(evt) {

  evt.preventDefault();

  const formData = evt.currentTarget.elements;
  
  let time = Number(formData.delay.value)

  for (let i = 0; i < formData.amount.value; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, time + i * Number(formData.step.value))
        .then(massege => Notiflix.Notify.success(massege))
        .catch(error => Notiflix.Notify.failure(error));
    }, time + i * Number(formData.step.value));
  }
}

function createPromise(position, delay) {
  return new Promise(
    (resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }
  )
};