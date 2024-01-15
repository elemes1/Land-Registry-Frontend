const helpers = {
  cutText(text, length) {
    if (text.split(' ').length > 1) {
      const string = text.substring(0, length)
      const splitText = string.split(' ')
      splitText.pop()
      return splitText.join(' ') + '...'
    } else {
      return text
    }
  },
  onlyNumber(string) {
    if (string) {
      return string.replace(/\D/g, '')
    } else {
      return ''
    }
  },
  randomNumbers(from, to, length) {
    const numbers = [0]
    for (let i = 1; i < length; i++) {
      numbers.push(Math.ceil(Math.random() * (from - to) + to))
    }

    return numbers
  },
  formatTimestamp(timestamp){
    const originalDate = new Date(timestamp);

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    return originalDate.toLocaleString('en-US', options);

  }
}

const install = (app) => {
  app.config.globalProperties.$h = helpers
}


export { install as default, helpers as helper }
