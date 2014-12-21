var Browsersql = require("browsersql")
var Db = require("./db.js")
var db

var main = document.createElement("div")
main.id = "main"

var address = document.createElement("input")
address.placeholder = "WebSocket URL"
main.appendChild(address)
address.onchange = function () {
  db = Db(address.value)
  main.removeChild(address)
  main.appendChild(login)
}

var login = Browsersql.login(function (name, password, k) {
  db.authentify(name, password, function (err) {
    if (err) { return k(err) } // authentification failure
    main.removeChild(login)
    main.appendChild(Browsersql.console(db.sql))
    Browsersql.kit(db.sql, "school", function (err, kit) {
      if (err) { return main.appendChild(document.createTextNode("Could not initialize the kit: "+err)) }
      var course=kit.editor("course")
      var student=kit.editor("student")
      main.appendChild(course)
      main.appendChild(student)
      main.appendChild(kit.editor("mark", function () {
        if (course.$id && student.$id) { return {course_id:course.$id, student_id:student.$id} }
        return null
      }))
    })
  })
})

window.onload = function () { document.body.appendChild(main) }
