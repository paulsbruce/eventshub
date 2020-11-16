const path = require('path');

module.exports = {
  devServer: {
    hot: true,
    before: function(app, server, compiler) {
      console.log("app: " + app)
      app.get('/dt.js', function(req, res) {
        var template = path.resolve('./src/ruxit.js.template');
        console.log("template: " + template)
        fs.readFile(template, 'utf8', (err, data) => {
          if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
          }

          return res.send(
            data.replace('{{ruxit_cfg}}', process.env.RUXIT_CFG)
          );
        });
      });
    }
  }
};
