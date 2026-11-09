
angular.module('gerenciadorTarefas')
    .directive('menuSuspenso', function() {

        return {
            restrict: 'E',

            scope: {
                opcoes: '=',
                aoSelecionar: '&'
            },

            template: `
                <div class="dropdown">

                    <button class="dropdown-button"
                            ng-click="menuAberto = !menuAberto">

                        Ações rápidas

                    </button>

                    <div class="dropdown-menu"
                         ng-show="menuAberto">

                        <button ng-repeat="opcao in opcoes"
                                ng-click="selecionar(opcao)">

                            {{ opcao }}

                        </button>

                    </div>

                </div>
            `,

            link: function(scope, elemento) {

                scope.menuAberto = false;

                scope.selecionar = function(opcao) {

                    scope.aoSelecionar({opcao: opcao});

                    scope.menuAberto = false;

                };

                function fecharMenu(evento) {

                    if (!elemento[0].contains(evento.target)) {
                        scope.$apply(function() {
                            scope.menuAberto = false;
                        });
                    }

                }

                document.addEventListener('click', fecharMenu);

                scope.$on('$destroy', function() {
                    document.removeEventListener('click', fecharMenu);
                });

            }
        };

    });
