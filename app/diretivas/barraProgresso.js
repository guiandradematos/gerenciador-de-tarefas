angular.module('gerenciadorTarefas')
    .directive('barraProgresso', function() {

        return {
            restrict: 'E',

            scope: {
                progresso: '='
            },

            template: `
                <div class="progress-container">

                    <div class="progress-bar"
                         ng-style="{width: progresso + '%'}">
                    </div>

                </div>

                <p class="progress-text">
                    {{ progresso }}% concluído
                </p>
            `
        };

    });