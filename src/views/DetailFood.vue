<template>
  <ListarDesayunos></ListarDesayunos>
</template>


<script>
    import ListarDesayunos from "@/components/ListarDesayunos.vue";
    export default {
      name: "Foodandrink",
      components: {
        ListarDesayunos
      }
    };
</script>

<style scoped >
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'SF UI Display';
    font-weight: normal;
    font-style: normal;
}

main{
    width: 100%;
    max-width: 1540px;
    margin: auto;
}

</style>
