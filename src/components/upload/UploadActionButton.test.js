// @flow
import React, { Fragment } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';
import UploadActionButton from './UploadActionButton';

describe('<UploadActionButton />', () => {
  let getByTestId;
  let getByText;

  beforeEach(() => {
    ({ getByText, getByTestId } = render((
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={UploadActionButton} />
          <Route
            path="/upload"
            render={({ location: { state } }) => (
              <Fragment>
                <h1>Upload</h1>
                {state && state.files && (
                  <span data-testid="upload-files-count">
                    {state.files.length}
                  </span>
                )}
              </Fragment>
            )}
          />
        </Switch>
      </MemoryRouter>
    )));
  });

  describe('files dropped', () => {
    beforeEach(() => {
      const dropzone = getByTestId('upload-action-button-dropzone');
      fireEvent.drop(dropzone, {
        target: {
          files: [
            new File([], 'file1'),
            new File([], 'file2'),
          ],
        },
      });
    });

    it('should redirect to /upload', () => {
      expect(getByText('Upload')).toBeTruthy();
    });

    it('should pass the files to /upload', () => {
      const count = getByTestId('upload-files-count').innerHTML;
      expect(Number(count)).toEqual(2);
    });
  });
});
