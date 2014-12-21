
var url = "wss://localhost:8443/ws"
var ws = new WebSocket(url)
var ks = {}
var echo = 1
var key = null

ws.onmessage = function (evt) {
  var res = JSON.parse(evt.data)
  ks[res.echo](res.error, res.data)
  delete ks[res.echo]
}

function send (data, k) {
  if (echo > Number.MAX_VALUE) { echo = 1 }
  ks[++echo] = k
  data.echo = echo
  ws.send(JSON.stringify(data))
}

exports.authentify = function (name, password, k) {
  send({user:name,password:password}, function (err, kkey) {
    if (err) { return k(err) }
    key = kkey
    k()
  })
}

exports.sql = function (querystring, k) { send({key:key, sql:querystring}, k) }

