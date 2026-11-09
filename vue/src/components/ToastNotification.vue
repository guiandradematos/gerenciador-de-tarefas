
<template>
    <transition name="toast">
        <div
            v-if="visivel && mensagem"
            class="toast-notificacao"
            :class="tipo"
            role="alert"
            aria-live="assertive"
        >
            <span class="toast-icone" aria-hidden="true">
                {{ icone }}
            </span>

            <span class="toast-mensagem">{{ mensagem }}</span>

            <button
                class="toast-fechar"
                type="button"
                aria-label="Fechar notificação"
                @click="$emit('fechar')"
            >
                ×
            </button>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ToastNotification',

    props: {
        mensagem: {
            type: String,
            default: ''
        },
        tipo: {
            type: String,
            default: 'sucesso'
        },
        visivel: {
            type: Boolean,
            default: false
        }
    },

    emits: ['fechar'],

    computed: {
        icone() {
            if (this.tipo === 'erro') return '✕';
            if (this.tipo === 'aviso') return '⚠';
            if (this.tipo === 'informacao') return 'ℹ';

            return '✓';
        }
    }
};
</script>
