import { IconButton, } from '@material-ui/core';
import { mount, shallow, } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button, } from './Button';

describe('<Button />', () => {
    it('renders correctly', () => {
        expect(renderer.create(<Button />).toJSON()).toMatchSnapshot();
    });

    it('mounts without error', () => {
        mount(<Button />);
    });

    it('triggers onClick when clicked', () => {
        const onClick = jest.fn();

        shallow(<Button onClick={onClick} />)
            .find(IconButton)
            .simulate('click');

        expect(onClick.mock.calls.length).toEqual(1);
    });
});
