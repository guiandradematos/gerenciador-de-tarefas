
angular.module('gerenciadorTarefas')
    .directive('notificacao', function($timeout) {

        return {
            restrict: 'E',

            scope: {
                mensagem: '=',
                tipo: '='
            },

            template: `
                <div class="toast-notificacao"
                     ng-show="mensagem"
                     ng-class="tipo || 'sucesso'"
                     role="alert"
                     aria-live="assertive">

                    <span class="toast-icone">
                        {{ tipo === 'erro' ? '✕' : tipo === 'aviso' ? '⚠' : '✓' }}
                    </span>

                    <span class="toast-mensagem">
                        {{ mensagem }}
                    </span>

                    <button class="toast-fechar"
                            ng-click="fechar()"
                            aria-label="Fechar notificação">
                        ×
                    </button>

                </div>
            `,

            link: function(scope) {

                var temporizador;

                scope.$watch('mensagem', function(novaMensagem) {

                    if (temporizador) {
                        $timeout.cancel(temporizador);
                    }

                    if (novaMensagem) {
                        temporizador = $timeout(function() {
                            scope.mensagem = '';
                        }, 3000);
                    }

                });

                scope.fechar = function() {
                    scope.mensagem = '';
                };

                scope.$on('$destroy', function() {
                    if (temporizador) {
                        $timeout.cancel(temporizador);
                    }
                });

            }
        };

    });
