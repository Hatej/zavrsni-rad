<template>
    <img :src="source" :className="className" />
</template>

<script>
    import axios from "axios";
    import { BACKEND_URL } from "../constants";

    export default {
        name: "Image",
        props: [
            'endpoint',
            'image', 
            'className'
        ],
        data() {
            return {
                'source': null
            }
        },
        mounted() {
            if(this.endpoint !== undefined){
                axios
                .get(
                    BACKEND_URL.concat(this.endpoint),
                    { responseType: 'arraybuffer'},
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.source = "data:;base64," + base64;
                });
            }
            if(this.image !== undefined){
                const base64 = btoa(
                    new Uint8Array(this.image).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.source = "data:;base64," + base64;
            }
        }
    }
</script>

<style>
    
</style>