<template>
  <div>
    <Navbar />
    <HomeHeader />
    <HomeGrid />
    <FooterSection />
  </div>
</template>

<script>
import Navbar from "../components/navbar";
import HomeHeader from "../components/home/header";
import HomeGrid from "../components/home/grid";
import FooterSection from "../components/footer";

export default {
  components: {Navbar, HomeHeader, HomeGrid, FooterSection}
}
</script>
