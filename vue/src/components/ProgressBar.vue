
<template>
    <div>
        <div
            class="progress-container"
            role="progressbar"
            :aria-valuenow="progressoLimitado"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Progresso das tarefas"
        >
            <div
                class="progress-bar"
                :style="{ width: progressoLimitado + '%' }"
            ></div>
        </div>

        <p class="progress-text">
            {{ progressoLimitado }}% concluído
        </p>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',

    props: {
        progresso: {
            type: Number,
            required: true
        }
    },

    computed: {
        progressoLimitado() {
            return Math.min(100, Math.max(0, this.progresso));
        }
    }
};
</script>
