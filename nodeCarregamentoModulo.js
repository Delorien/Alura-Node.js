function require(path) {
	var codigoDoSeuModulo = carregado(path);
	var funcaoDeCarregamento = function () {
		eval(codigoDoSeuModulo);
	}	
}