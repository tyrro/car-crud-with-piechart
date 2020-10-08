// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import WebpackerReact from 'webpacker-react';
import I18n from 'i18n-js';

import Car from '../components/Car';

import '../stylesheets/index.scss';

WebpackerReact.setup({ Car });
global.I18n = I18n;
