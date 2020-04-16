import i18next from 'i18next';
import moment from 'moment';
import 'moment/locale/zh-tw';
import React from 'react';
import { render, } from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { HashRouter, } from 'react-router-dom';

import { Preferences, } from './models/Preferences';
import messages_en from './translations/en/messages';
import messages_zh from './translations/zh/messages';
import { AppHelper, } from './utils/AppHelper';
import { App, } from './App';
import './index.css';

require('dotenv').config();

const preferences = Preferences.load();

AppHelper.setAutoLaunch(preferences.isAutoLaunch);

i18next.use(initReactI18next).init({
    lng           : preferences.locale.substr(0, 2),
    fallbackLng   : 'en',
    nsSeparator   : false,
    keySeparator  : false,
    interpolation : {
        escapeValue : false,
    },
    resources     : {
        en : {
            translation : messages_en,
        },
        zh : {
            translation : messages_zh,
        },
    },
});

moment.locale(preferences.locale.substr(0, 2));

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root'));
