browsersql-demo
===============

This is a demonstration project of the browsersql (https://github.com/lachrist/browsersql) module.
Provided that a mariaws server (https://github.com/lachrist/mariaws) is listening and forwarding requests to a database initialized with the below SQL code.
Loading `demo.html` will (hoopefully) allow you to access this database with minimal pain.

```sql
CREATE DATABASE school;

CREATE TABLE school.course (
  id    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(30)  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE school.student (
  id   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(30)  NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE school.mark (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id INT UNSIGNED NOT NULL,
  course_id  INT UNSIGNED NOT NULL,
  score      INT UNSIGNED NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id)  REFERENCES course(id)  ON DELETE CASCADE,
  PRIMARY KEY (id)
);
```

```js
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
```

![Screenshot](screenshot.png?raw=true)
