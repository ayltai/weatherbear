import { ListItem, ListItemSecondaryAction, } from '@material-ui/core';
import { mount, shallow, } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button, } from './Button';
import { Choices, } from './Choices';

const values = [ 'Line 1', 'Line 2', ];

describe('<Choices />', () => {
    it('renders correctly', () => {
        expect(renderer.create(
            <Choices
                value={values[1]}
                values={values} />
        ).toJSON()).toMatchSnapshot();
    });

    it('mounts without error', () => {
        mount(
            <Choices
                value={values[1]}
                values={values} />
        );
    });

    it('triggers onSelect when selected', () => {
        const handleSelect = jest.fn();
        const onSelect     = () => handleSelect();

        shallow(
            <Choices
                value={values[1]}
                values={values}
                onSelect={onSelect} />)
            .find(ListItem)
            .first()
            .simulate('click');

        expect(handleSelect.mock.calls.length).toEqual(1);
    });

    it('triggers onDelete when the delete icon is clicked', () => {
        const handleDelete = jest.fn();
        const onDelete     = () => handleDelete();

        shallow(
            <Choices
                value={values[1]}
                values={values}
                onDelete={onDelete} />)
            .find(ListItem)
            .first()
            .find(ListItemSecondaryAction)
            .find(Button)
            .simulate('click');

        expect(handleDelete.mock.calls.length).toEqual(1);
    });
});
