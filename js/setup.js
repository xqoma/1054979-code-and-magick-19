'use strict';

var HIDING_CLASS_NAME = 'hidden';
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var SIMILAR_WIZARD_COUNT = 4;

var setupOpenElement = document.querySelector('.setup-open');
var setupElement = document.querySelector('.setup');
var setupCloseElement = document.querySelector('.setup-close');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupUserNameElement = document.querySelector('.setup-user-name');
var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var wizardCoatInputElement = document.querySelector('.setup-wizard-form input[name="coat-color"]');
var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInputElement = document.querySelector('.setup-wizard-form input[name="eyes-color"]');
var setupFireballWrapElement = document.querySelector('.setup-fireball-wrap');
var fireballInputElement = document.querySelector('.setup-wizard-form input[name="fireball-color"]');
var similarWizardList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/**
 * Выбирает случайный элемент массива
 *
 * @param {array} array
 * @return {any} Элемент массива
 */
var getRandomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Генерирует случайное описание мага
 *
 * @return {Object} Объект описывающий мага
 */
var getRandomWizard = function () {
  var firstAndLastNames = [
    getRandomArrayItem(FIRST_NAMES),
    getRandomArrayItem(LAST_NAMES)
  ];

  // Перемешиваю имя и фамилию
  var randIndex = Math.floor(Math.random() * firstAndLastNames.length);
  var savedString = firstAndLastNames[randIndex];
  firstAndLastNames.splice(randIndex, 1);
  firstAndLastNames.push(savedString);

  return {
    name: firstAndLastNames[0] + ' ' + firstAndLastNames[1],
    coatColor: getRandomArrayItem(COAT_COLORS),
    eyesColor: getRandomArrayItem(EYES_COLORS)
  };
};

/**
 * Создает DOM элемент мага
 *
 * @param {Object} wizard Объект описывающий мага
 * @return {HTMLElement} DOM элемент мага
 */
var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Вставляет элемены в DOM
 *
 * @param {Object[]} elements Элементы, которые будут вставлены
 * @param {HTMLElement} parentElement Элемент, в который будут вставлены элементы
 */
var insertElements = function (elements, parentElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  parentElement.appendChild(fragment);
};

var showSetupModal = function () {
  setupElement.classList.remove(HIDING_CLASS_NAME);
  setupCloseElement.addEventListener('click', setupCloseClickHandler);
  setupCloseElement.addEventListener('keydown', setupCloseEnterPressHandler);
  document.addEventListener('keydown', setupModalEscPressHandler);
  wizardCoatElement.addEventListener('click', wizardCoatClickHandler);
  wizardEyesElement.addEventListener('click', wizardEyesClickHandler);
  setupFireballWrapElement.addEventListener('click', setupFireballClickHandler);
};

var closeSetupModal = function () {
  setupElement.classList.add(HIDING_CLASS_NAME);
  setupCloseElement.removeEventListener('click', setupCloseClickHandler);
  setupCloseElement.removeEventListener('keydown', setupCloseEnterPressHandler);
  document.removeEventListener('keydown', setupModalEscPressHandler);
  wizardCoatElement.removeEventListener('click', wizardCoatClickHandler);
  wizardEyesElement.removeEventListener('click', wizardEyesClickHandler);
  setupFireballWrapElement.removeEventListener('click', setupFireballClickHandler);
};

var setRandomWizardCoatColor = function () {
  var newColor = getRandomArrayItem(COAT_COLORS);
  wizardCoatElement.style.fill = newColor;
  wizardCoatInputElement.value = newColor;
};

var setRandomWizardEyesColor = function () {
  var newColor = getRandomArrayItem(EYES_COLORS);
  wizardEyesElement.style.fill = newColor;
  wizardEyesInputElement.value = newColor;
};

var setRandomSetupFireballColor = function () {
  var newColor = getRandomArrayItem(FIREBALL_COLORS);
  setupFireballWrapElement.style.background = newColor;
  fireballInputElement.value = newColor;
};

var setupCloseClickHandler = function () {
  closeSetupModal();
};

var setupModalEscPressHandler = function (evt) {
  if (evt.target !== setupUserNameElement && evt.key === ESC_KEY) {
    closeSetupModal();
  }
};

var setupCloseEnterPressHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupModal();
  }
};

var wizardCoatClickHandler = function () {
  setRandomWizardCoatColor();
};

var wizardEyesClickHandler = function () {
  setRandomWizardEyesColor();
};

var setupFireballClickHandler = function () {
  setRandomSetupFireballColor();
};

setupOpenElement.addEventListener('click', function () {
  showSetupModal();
});

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    showSetupModal();
  }
});

var wizards = [];
for (var j = 0; j < SIMILAR_WIZARD_COUNT; j++) {
  wizards.push(getRandomWizard());
}

var wizardElemets = [];
for (var k = 0; k < wizards.length; k++) {
  wizardElemets.push(getWizardElement(wizards[k]));
}

insertElements(wizardElemets, similarWizardList);

document.querySelector('.setup-similar').classList.remove('hidden');
