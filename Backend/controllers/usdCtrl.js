var auditor = require('../models').usuario;
var usd = require('../models').usd;
var seguimiento = require('../models').seguimiento;
var upsert = require('../services/upsert');
//peticion
/* 
    {
        "auditorId": 1,
        "id": 1
    }
*/

var revisar = function (req, res, next) {
    usd.findById(req.body.id)
        .then(
            instanceBloque => {
                auditor.findById(req.body.auditorId).then(
                    auditor => {
                        instanceBloque.setAuditor(auditor).then(
                            result => {
                                res.status(200).send({ mensaje: "Revisado con éxito", result });
                            }
                        ).catch(
                            err => {
                                res.status(500).send({ mensaje: "No se pudo revisar" });
                            }
                        )
                    }
                ).catch(
                    err => {
                        res.status(500).send({ mensaje: "No se pudo revisar" });
                    }
                )
            }
        ).catch(
            err => {
                res.status(500).send({ mensaje: "No se pudo revisar" });
            }
        )
}

var guardar = function (req, res, next) {
    //{
    //     seguimientoId: seguimiento.id,
    //     usd: this.usd
    //}
    var params = req.body;
    seguimiento.findById(params.seguimientoId)
        .then(seguimiento => {
            upsert.upsert(usd, params.usd, { id: params.usd.id })
                .then(bloque => {
                    seguimiento.setUsd(bloque).then(result => {
                        res.status(200).send({ mensaje: "Guardado con exito", seguimiento: seguimiento })
                    }).catch(error => {
                        res.status(500).send({ mensaje: "Fallo al guardar", seguimiento: seguimiento })
                    });
                }).catch(error => {
                    res.status(500).send({ mensaje: "Fallo al guardar", seguimiento: seguimiento })
                });

        })
}

module.exports = {
    revisar,
    guardar
}