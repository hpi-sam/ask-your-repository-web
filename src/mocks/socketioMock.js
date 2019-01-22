let EVENTS = {};

function emit(event, ...args) {
  if (EVENTS[event]) {
    EVENTS[event].forEach(func => func(...args));
  }
}

const socket = {
  on: jest.fn((event, func) => {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
    return EVENTS[event].length;
  }),
  emit: jest.fn(emit),
};

export function io() {
  return socket;
}
// Additional helpers, not included in the real socket.io-client,just for out test.
// to emulate server emit.
export const serverSocket = { emit };

// cleanup helper
export function cleanup() {
  EVENTS = {};
}
export default io;
