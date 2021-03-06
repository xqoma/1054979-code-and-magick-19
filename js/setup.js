'use strict';

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
var SIMILAR_WIZARD_COUNT = 4;

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
document.querySelector('.setup').classList.remove('hidden');
