var auditor = require('../models').usuario;
var cartaDeCertificacion = require('../models').cartaDeCertificacion;
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
    cartaDeCertificacion.findById(req.body.id)
        .then(
            instanceBloque => {
                auditor.findById(req.body.auditorId).then(
                    auditor => {
                        instanceBloque.setAuditor(auditor).then(
                            bloque => {
                                bloque.get({json: true}).auditor=auditor;
                                var result = bloque.get({json: true});   
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
    //     cartaDeCertificacion: this.cartaDeCertificacion
    //}
    var params = req.body;
    console.log(params);
    
    seguimiento.findById(params.seguimientoId)
        .then(seguimiento => {
            upsert.upsert(cartaDeCertificacion, params.cartaDeCertificacion, { id: params.cartaDeCertificacion.id })
                .then(bloque => {
                    seguimiento.setCartaDeCertificacion(bloque).then(result => {
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