<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }"
        >
          {{ capitalize(key) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
  },
  data() {
    var sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders,
    };
  },
  computed: {
    filteredData() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.data;
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },

  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    capitalize(key) {
      return key.charAt(0).toUpperCase() + key.slice(1);
    },
  },
};
</script>

<style scoped></style>
