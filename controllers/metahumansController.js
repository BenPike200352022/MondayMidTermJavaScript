const Metahuman = require("../models/metahuman");

exports.new = (req, res) => {
  res.render("metahumans/new", {
    title: `New Metahuman`
  });
};

exports.index = (req, res) => {
  Metahuman.find({
    author: req.session.userId
  })
    .populate("author")
    .then(metahumans => {
      res.render("metahumans/index", {
        metahumans: metahumans,
        title: "Archive"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.show = (req, res) => {
  Metahuman.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
    .then(metahuman => {
      res.render("metahumans/show", {
        metahuman: metahuman,
        title: metahuman.title
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/metahumans");
    });
};

exports.create = (req, res) => {
  Metahuman.create(req.body.metahuman)
    .then(() => {
      req.flash("success", "Your new metahuman profile has been create successfully.");
      res.redirect("/metahumans");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.render("metahumans/new", {
        metahuman: req.body.metahuman,
        title: "New metahuman"
      });
    });
};

exports.edit = (req, res) => {
  Metahuman.findById(req.params.id)
    .then(metahuman => {
      res.render('metahumans/edit', {
        title: `Edit ${metahuman.alias}`,
        metahuman: metahuman
      })
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
}


exports.update = (req, res) => {
  Metahuman.updateOne(
    {
      _id: req.body.id,
      author: req.session.userId
    },
    req.body.metahuman,
    {
      runValidators: true
    }
  )
    .then(() => {
      req.flash("success", "Your metahuman profile was updated successfully.");
      res.redirect("/metahumans");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.render("metahumans/edit", {
        metahuman: req.body.metahuman,
        title: `Edit ${req.body.metahuman.alias}`
      });
    });
};

exports.destroy = (req, res) => {
  Metahuman.deleteOne({
    _id: req.body.id
  })
    .then(() => {
      req.flash("success", "Your metahuman was deleted successfully.");
      res.redirect("/metahumans");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/metahumans");
    });
};
