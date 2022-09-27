<template>
  <!-- <h1>Все объявления</h1> -->
  <table>
    <thead>
        <tr>
            <th>#</th>
            <th>название</th>
            <th>создано</th>
            <th>просмотр</th>
            <th>Статус</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import '../../styles/var';
    table {
        width: 100%;
        border-collapse: collapse;
        th {
            background-color: rgb(245, 241, 241);
            padding: 5px;
        }
        td {
            border-bottom: 1px solid #000;
            padding: 5px;
        }
    }
</style>