// @flow
import React from 'react';
import { shallow } from 'enzyme';
import TagSelector from './TagSelector';

describe('<TagSelector />', () => {
  let wrapper;
  let input;

  let addTag;
  let removeTag;
  let addMultiTag;
  let removeMultiTag;

  beforeEach(() => {
    addTag = jest.fn();
    removeTag = jest.fn();
    addMultiTag = jest.fn();
    removeMultiTag = jest.fn();

    wrapper = shallow((
      <TagSelector
        tags={[]}
        multiTags={[]}
        addTag={addTag}
        removeTag={removeTag}
        addMultiTag={addMultiTag}
        removeMultiTag={removeMultiTag}
      />
    ));

    input = wrapper.find('input');
  });

  describe('input is empty', () => {
    it('should not call addTag on enter press', () => {
      input.simulate('keyDown', { keyCode: 13 });
      expect(addTag).not.toHaveBeenCalled();
    });

    it('should not call addTag on komma press', () => {
      input.simulate('keyDown', { keyCode: 188, preventDefault: () => {} });
      expect(addTag).not.toHaveBeenCalled();
    });

    it('should call removeLastTag on return press', () => {
      wrapper.setProps({ tags: ['Example'] });
      input.simulate('keyDown', { keyCode: 8 });
      expect(removeTag).toHaveBeenCalledWith('Example');
    });
  });

  describe('input is not empty', () => {
    beforeEach(() => {
      input.simulate('change', { target: { value: 'Example' } });
    });

    it('should not call removeLastTag on return press', () => {
      input.simulate('keyDown', { keyCode: 8 });
      expect(removeTag).not.toHaveBeenCalled();
    });

    describe('hitting komma', () => {
      const event = {
        keyCode: 188,
        preventDefault: jest.fn(),
      };

      beforeEach(() => {
        input.simulate('keyDown', event);
      });

      it('should prevent the default event', () => {
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it('should call addTag', () => {
        expect(addTag).toHaveBeenCalledWith('Example');
      });
    });

    describe('hitting enter', () => {
      beforeEach(() => {
        input.simulate('keyDown', { keyCode: 13 });
      });

      it('should call addTag', () => {
        expect(addTag).toHaveBeenCalledWith('Example');
      });
    });
  });

  it('should display a typing hint if there are no tags on the input is empty', () => {
    wrapper.setProps({ tags: [] });
    expect(wrapper.text()).toEqual(expect.stringContaining('Start typing'));
  });

  it('should display a enter hint if there are no tags on the input is not empty', () => {
    wrapper.setProps({ tags: [] });
    input.simulate('change', { target: { value: 'abc' } });
    expect(wrapper.text()).toEqual(expect.stringContaining('Hit ⏎'));
  });

  it('should display a return hint if there is exactly one tag', () => {
    wrapper.setProps({ tags: ['Example'] });
    expect(wrapper.text()).toEqual(expect.stringContaining('Remove with ⌫'));
  });
});
