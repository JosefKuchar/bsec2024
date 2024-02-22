
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

<div class="mt-10 bg-surface-700 h-2/5 flex rounded-3xl overflow-hidden">

    <div class="bg-white w-1/3 h-full flex justify-center items-center">
        <div class="w-4/5 h-4/5">
            <DonutChart class="" {data} {options} />
        </div>
    </div>
    <div class="bg-black w-2/3 h-full">
        <slot/>

    </div>
</div>