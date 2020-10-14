<template>
  <div class="result">
    <img class='result_thumbnail' src="../assets/logo.png"/>
    <div class='result_details'>
        <a class='result_details_title' href="https://www.youtube.com"> VIDEO </a>
        <a class='result_details_channel' href='https://www.youtube.com'> VIDEO</a>
        <p class='result_details_desc'> {{desc}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  props: {
    desc: String,
    image: String,
    title: String,
    channel: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.result{
    display:flex;
    flex-direction:row;
    width: 65%;
    margin: 10px auto;
    align-items: center;
    padding: 80px 5px 0 5px;
    .result_thumbnail{
      width: 300px;
      height: 200px;
      object-fit: cover;
    }
    .result_details{
      flex:2;
      height: 200px;
      display:flex;
      flex-direction:column;
      align-items: flex-start;
      text-align: left;
      padding: 0 10px;
      > *{
        text-decoration: none;
        font-family: verdana;
        color: grey;
      }
      .result_details_title{
        font-size: 18px;
        color: black;
        margin-bottom: 10px;
      }
      .result_details_channel{
        font-size: 12px;
      }
    }
}

$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
@media (min-width: $breakpoint-tablet) {
  h1{
      font-size: 20px;
  }
}

</style>
