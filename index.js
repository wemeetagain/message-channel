const isNode = require('detect-node')

if (isNode) {
  try {
    const {
      MessageChannel,
      MessagePort
    } = require('worker_threads')
    exports.MessageChannel = MessageChannel
    exports.MessagePort = MessagePort
    exports.eventData = function (event) {
      return event
    }
  } catch (e) {
    throw new Error('Error requiring worker_threads module', e)
  }
} else {
  if (!MessageChannel || !MessagePort) {
    throw new Error('Error finding global MessageChannel and MessagePort objects')
  }
  exports.MessageChannel = MessageChannel
  exports.MessagePort = MessagePort
  exports.eventData = function (event) {
    return event.data
  }
}
