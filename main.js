var Browsersql = require("browsersql")
var Db = require("./db.js")

var main = document.createElement("div")
main.id = "main"

var login = Browsersql.login(function (name, password, k) {
  Db.authentify(name, password, function (err) {
    if (err) { return k(err) } // authentification failure
    main.removeChild(login)
    main.appendChild(Browsersql.console(Db.sql))
    Browsersql.kit(Db.sql, "school", function (err, kit) {
      if (err) { return main.appendChild(document.createTextNode("Could not initialize the kit")) }
      main.appendChild(kit.editor("course"))
      main.appendChild(kit.editor("student"))
      main.appendChild(kit.editor("mark"))
    })
  })
})
main.appendChild(login)

window.onload = function () { document.body.appendChild(main) }
