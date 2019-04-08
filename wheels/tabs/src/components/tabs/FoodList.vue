<template>
    <div>
        <ul>
            <li v-for="(item, index) in data" :key="index">
                {{item.type}}: {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [{name: 1, type: 'food'}, {name: 2,  type: 'food'}, {name: 3,  type: 'food'}, {name: 4,  type: 'food'}]
        }
    }
}
</script>

<style>

</style>
