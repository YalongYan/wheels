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
            data: [{name: 1, type: 'person'}, {name: 2,  type: 'person'}, {name: 3,  type: 'person'}, {name: 4,  type: 'person'}]
        }
    }
}
</script>

<style>

</style>
