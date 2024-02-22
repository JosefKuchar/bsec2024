
<script lang="ts">
    import { DonutChart } from '@carbon/charts-svelte'
    import '@carbon/charts-svelte/styles.css'

    let options = {
  "title": "",
  "resizable": true,
  "legend": {
    "enabled" : true,
    "alignment" : "center"
  },
  "donut": {
    "center": {
      "label": "Kč"
    },
    "alignment": "center"
  },
  "theme": "g100",
  "toolbar" : {
    "enabled" : false
  },
  "color" : {
    "scale" :
        {
        "Volné prostředky" : "#3B82F6",
        "Investováno" : "#EAB308"
    },
  }
}

    let data = [
  {
    "group": "Volné prostředky",
    "value": 163500
  },
  {
    "group": "Investováno",
    "value": 50000
  }
]


  </script>

<div class="mt-10 bg-surface-700 h-2/5 flex rounded-3xl overflow-hidden">

    <div class=" w-1/3 h-full flex justify-center items-center">
        <div class="w-full h-4/5">
            <DonutChart style="color:white" {data} {options} />
        </div>
    </div>
    <div class="bg-surface-700 w-2/3 h-full flex p-10 justify-center items-center">
        <div class="bg-surface-700 h-full w-full">
            <h1 class="text-center h1">113 500 Kč</h1>
            <p class="text-center">aktuální hodnota portfolia </p>
            <div class="w-full h-full flex justify-center mt-12">
                <div class="items-center w-2/5">
                    <div class="items-center w-full">
                        <div class="flex items-center">
                            <p class="flex-col w-1/2 text-start">Volné prostředky</p>
                            <p class="flex-col h4 w-1/2 text-end">50 000  Kč</p>
                        </div>
                        <div class="flex items-center">
                            <p class="flex-col w-1/2 text-start">Investováno</p>
                            <p class="flex-col h4 w-1/2 text-end">163 500 Kč</p>
                        </div>
                    </div>
                    </div>

            </div>
            <slot/>
        </div>

    </div>
</div>