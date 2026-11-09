angular.module('gerenciadorTarefas')
    .directive('acordeao', function() {

        return {
            restrict: 'E',

            scope: {
                informacoes: '='
            },

            template: `
                <div class="accordion">

                    <div class="accordion-item"
                         ng-repeat="informacao in informacoes">

                        <button class="accordion-title"
                                ng-click="alternar($index)">

                            {{ informacao.titulo }}

                        </button>

                        <div class="accordion-content"
                             ng-show="indiceAberto === $index">

                            <p>{{ informacao.conteudo }}</p>

                        </div>

                    </div>

                </div>
            `,

            link: function(scope) {

                scope.indiceAberto = -1;

                scope.alternar = function(indice) {

                    if (scope.indiceAberto === indice) {
                        scope.indiceAberto = -1;
                    } else {
                        scope.indiceAberto = indice;
                    }

                };

            }
        };

    });