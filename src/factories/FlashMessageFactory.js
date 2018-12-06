// @flow
import faker from 'faker';

class FlashMessageFactory {
  static createDummySuccessMessage() {
    return this.createDummyFlashMessage();
  }

  static createDummyErrorMessage() {
    return this.createDummyFlashMessage(true);
  }

  static createDummyFlashMessage(isError: boolean = false) {
    return {
      id: faker.random.uuid(),
      isError,
      message: faker.lorem.sentence(),
    };
  }
}

export default FlashMessageFactory;
