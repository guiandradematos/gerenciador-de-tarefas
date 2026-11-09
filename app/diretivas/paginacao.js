angular.module('gerenciadorTarefas')
    .directive('paginacao', function() {

        return {
            restrict: 'E',

            scope: {
                paginaAtual: '=',
                totalPaginas: '=',
                mudarPagina: '&'
            },

            template: `
                <div class="pagination">

                    <button ng-click="mudarPagina({pagina: paginaAtual - 1})"
                            ng-disabled="paginaAtual === 1">
                        Anterior
                    </button>

                    <button ng-repeat="pagina in paginas"
                            ng-click="mudarPagina({pagina: pagina})"
                            ng-class="{active: paginaAtual === pagina}">
                        {{ pagina }}
                    </button>

                    <button ng-click="mudarPagina({pagina: paginaAtual + 1})"
                            ng-disabled="paginaAtual === totalPaginas">
                        Próxima
                    </button>

                </div>
            `,

           link: function(scope) {

    scope.paginas = [];

    scope.$watch('totalPaginas', function(novoTotal) {

        scope.paginas = [];

        for (var numero = 1; numero <= novoTotal; numero++) {
            scope.paginas.push(numero);
        }

    });

}
        };

    });