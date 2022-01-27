<template>
    <div>
        <div class="flex">
            <SideBar />
            <div class="flex justify-center">
                <p>Message</p>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from '../components/sideBar.vue'
export default {
    name:"Messages",
    components: {
        SideBar
    }
}
</script>
<style>
    
</style>