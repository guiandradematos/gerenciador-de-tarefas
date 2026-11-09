angular.module('gerenciadorTarefas')
    .directive('painelAbas', function() {

        return {
            restrict: 'E',

            scope: {
                listaAbas: '=',
                abaSelecionada: '=',
                aoSelecionar: '&'
            },

            template: `
                <div class="tabs">

                    <div class="tabs-buttons">

                        <button ng-repeat="aba in listaAbas"
                                ng-click="aoSelecionar({titulo: aba.titulo})"
                                ng-class="{active: abaSelecionada === aba.titulo}">

                            {{ aba.titulo }}

                        </button>

                    </div>

                </div>
            `
        };

    });