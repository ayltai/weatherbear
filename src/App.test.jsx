import { mount, } from 'enzyme';
import React from 'react';
import { BrowserRouter, } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { App, } from './App';

window.require = require;

describe('<App />', () => {
    it('renders correctly', () => {
        expect(renderer.create(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ).toJSON()).toMatchSnapshot();
    });

    it('mounts without error', () => {
        mount(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    });
});
