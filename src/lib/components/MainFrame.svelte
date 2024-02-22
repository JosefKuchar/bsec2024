
<script lang="ts">
    import { DonutChart } from '@carbon/charts-svelte'
    import '@carbon/charts-svelte/styles.css'

    let options = {
  "title": "",
  "resizable": true,
  "legend": {
    "enabled" : false
  },
  "donut": {
    "center": {
      "label": "Kč"
    },
    "alignment": "center"
  },
  "theme": "g10",
  "toolbar" : {
    "enabled" : false
  }
}

    let data = [
  {
    "group": "2V2N 9KYPM version 1",
    "value": 20000
  },
  {
    "group": "L22I P66EP L22I P66EP L22I P66EP",
    "value": 65000
  },
  {
    "group": "JQAI 2M4L1",
    "value": 75000
  },
  {
    "group": "J9DZ F37AP",
    "value": 1200
  },
  {
    "group": "YEL48 Q6XK YEL48",
    "value": 10000
  },
  {
    "group": "Misc",
    "value": 25000
  }
]


  </script>

<div class="mt-10 bg-white h-2/5 flex rounded-3xl overflow-hidden">

    <div class=" w-1/3 h-full flex justify-center items-center">
        <div class="w-full h-4/5">
            <DonutChart class="" {data} {options} />
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