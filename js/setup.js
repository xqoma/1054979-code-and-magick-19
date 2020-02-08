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

var getRndWizard = function () {
  var getRndArrItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var firstAndLastNames = [
    getRndArrItem(FIRST_NAMES),
    getRndArrItem(LAST_NAMES)
  ];

  // Перемешиваю имя и фамилию
  var randIndex = Math.floor(Math.random() * firstAndLastNames.length);
  var savedString = firstAndLastNames[randIndex];
  firstAndLastNames.splice(randIndex, 1);
  firstAndLastNames.push(savedString);

  return {
    name: firstAndLastNames[0] + ' ' + firstAndLastNames[1],
    coatColor: getRndArrItem(COAT_COLORS),
    eyesColor: getRndArrItem(EYES_COLORS)
  };
};

var getWizardElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var insertElements = function (elements, parentElement) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  parentElement.appendChild(fragment);
};

var wizards = [];
for (var j = 0; j < SIMILAR_WIZARD_COUNT; j++) {
  wizards.push(getRndWizard());
}

var wizardElemets = [];
for (var k = 0; k < wizards.length; k++) {
  wizardElemets.push(getWizardElement(wizards[k]));
}

insertElements(wizardElemets, similarWizardList);

document.querySelector('.setup-similar').classList.remove('hidden');
document.querySelector('.setup').classList.remove('hidden');
