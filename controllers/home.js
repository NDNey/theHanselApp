module.exports = {
  getIndex: async (req, res) => {
    try {
      console.log("hi");
      res.render('index.ejs')
    }
    catch(err) {
      console.error(err)
    }
  }
}