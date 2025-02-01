const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("contato", {
    contato: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errorsAgenda.length > 0) {
      req.flash("errorsAgenda", contato.errorsAgenda);
      req.session.save(() => res.redirect("/agenda/contato"));
      return;
    }

    req.flash("successAgenda", "Contato registrado com sucesso.");
    req.session.save(() =>
      res.redirect(`/agenda/contato/${contato.contato._id}`)
    );
    return;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  console.log(req.params.id);
  if (!req.params.id) return res.render("404");

  const contato = await Contato.buscaPorId(req.params.id);
  console.log("editIndex", contato);
  if (!contato) return res.render("404");
  res.render("contato", {
    contato,
  });
};
