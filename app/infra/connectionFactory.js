var mysql = require('mysql');

function createDBConnection() {
	if(!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : '172.17.0.2',
			user : 'root',
			password : 'root',
			database : 'livraria'
		});
	}

	if(process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
			host : '172.17.0.2',
			user : 'root',
			password : 'root',
			database : 'livraria_test'
		});
	}

}

module.exports = function() {
	return createDBConnection;
}





// CREATE TABLE livros (
// id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
// titulo VARCHAR(255),
// descricao text,
// preco decimal(10,2)
// )


// insert into livros(titulo, descricao, preco) values ('Comecando com nodejs', 'livro sobre node', 40.00 );
// insert into livros(titulo, descricao, preco) values ('Indo alem com node javascript', 'livro sobre js', 40.00 );
// insert into livros(titulo, descricao, preco) values ('Comecando com express', 'livro sobre express', 40.00 );
// insert into livros(titulo, descricao, preco) values ('Indo alem com node javascript', 'js avancado', 39.90 );