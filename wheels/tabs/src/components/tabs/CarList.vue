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
            data: [{name: 1, type: 'car'}, {name: 2,  type: 'car'}, {name: 3,  type: 'car'}, {name: 4,  type: 'car'}]
        }
    }
}
</script>

<style>

</style>
