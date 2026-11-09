
<template>
    <div ref="areaMenu" class="dropdown">
        <button
            class="dropdown-botao"
            type="button"
            :aria-expanded="menuAberto"
            @click="menuAberto = !menuAberto"
        >
            Ações rápidas
            <span aria-hidden="true">▾</span>
        </button>

        <div v-if="menuAberto" class="dropdown-lista">
            <button
                v-for="opcao in opcoes"
                :key="opcao"
                type="button"
                @click="selecionar(opcao)"
            >
                {{ opcao }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropdownMenu',

    props: {
        opcoes: {
            type: Array,
            required: true
        }
    },

    emits: ['selecionar'],

    data() {
        return {
            menuAberto: false
        };
    },

    mounted() {
        document.addEventListener('click', this.fecharAoClicarFora);
    },

    beforeUnmount() {
        document.removeEventListener('click', this.fecharAoClicarFora);
    },

    methods: {
        selecionar(opcao) {
            this.$emit('selecionar', opcao);
            this.menuAberto = false;
        },

        fecharAoClicarFora(evento) {
            if (
                this.menuAberto &&
                this.$refs.areaMenu &&
                !this.$refs.areaMenu.contains(evento.target)
            ) {
                this.menuAberto = false;
            }
        }
    }
};
</script>
