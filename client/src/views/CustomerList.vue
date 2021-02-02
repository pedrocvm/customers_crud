<template>
  <div class='mainContainer'>
    <span class="mainTitle">ALL CUSTOMERS</span>
    <Table target="customers" class="tableComponent" />
  </div>
</template>
<script>
import Table from '@/components/Table';
export default {
  components: { Table },
};
</script>

<style lang="scss" scoped>
@import '../sass/master.scss';
.mainContainer{
  @include flexbox(column, center, center);
  margin-top: 20px;
  margin-left: -15px;
}

.tableComponent {
  width: 90%;

}
  .actionContainer{
    margin-bottom: 10px!important;
  }

.mainTitle {
  margin-bottom: 30px;
  color: $lightgrey;
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 3px #fff;
}
</style>
