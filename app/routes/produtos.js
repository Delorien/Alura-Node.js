module.exports = function(app) {

    app.get('/produtos', function(request, response, next) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(error, results) {
            if (error != null) {
                return next(error);
            }
            response.format({
                html: function() {
                    response.render('produtos/lista', {
                        lista: results
                    });
                },
                json: function() {
                    response.json({
                        results
                    });
                }
            });
        });

        connection.end();
    });

    app.get('/form', function(request, response) {
        response.render('produtos/form', {
            errosValidacao: {},
            produto: {}
        });
    });

    app.post('/produtos', function(request, response) {

        var produto = request.body;

        request.assert('titulo', 'Titulo é obrigatório').notEmpty();
        request.assert('preco', 'Formato invalido').isFloat();

        var erros = request.validationErrors();
        if (erros) {

            response.format({
                html: function() {
                    response.status(400).render('produtos/form', {
                        errosValidacao: erros,
                        produto: produto
                    })
                },
                json: function() {
                    response.status(400).json(erros);
                }
            });

            return;
        }


        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(error, results) {
            if (error != null) {
                console.log(error);
            }
            response.redirect('/produtos')
        });
    });

}