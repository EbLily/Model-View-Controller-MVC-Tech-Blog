const helpers = {
    format_date: (date) => {
      return new Date(date).toLocaleDateString();
    }
  };
  
  module.exports = helpers;