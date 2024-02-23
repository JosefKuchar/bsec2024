<script lang="ts">
    import { ComboChart } from '@carbon/charts-svelte'

  let data = [
  {
    "group": "Volné prostředky",
    "date": "2018-12-31T23:00:00.000Z",
    "value": 10000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-04T23:00:00.000Z",
    "value": 65000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 10000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-12T23:00:00.000Z",
    "value": 49213
  },
  {
    "group": "Investice",
    "date": "2019-01-16T23:00:00.000Z",
    "value": 51213
  },
  {
    "group": "Investice",
    "date": "2018-12-31T23:00:00.000Z",
    "value": 20000
  },
  {
    "group": "Investice",
    "date": "2019-01-04T23:00:00.000Z",
    "value": 25000
  },
  {
    "group": "Investice",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 60000
  },
  {
    "group": "Investice",
    "date": "2019-01-12T23:00:00.000Z",
    "value": 30213
  },
  {
    "group": "Investice",
    "date": "2019-01-16T23:00:00.000Z",
    "value": 55213
  },
]

let options = {
  "title": "Vývoj portfolia",
  "axes": {
    "left": {
      "title": "Hodnota (Kč)",
      "stacked": true,
      "mapsTo": "value",
      "titleOrientation": "right"
    },
    "bottom": {
      "scaleType": "time",
      "mapsTo": "date"
    },

  },
  "curve": "curveMonotoneX",
  "comboChartTypes": [
    {
      "type": "stacked-area",
      "options": {
        "points": {
          "enabled": false
        }
      },
      "correspondingDatasets": [
        "Investice",
        "Volné prostředky",
      ]
    },
  ],
  "color" : {
    "scale" :
        {
        "Volné prostředky" : "#3B82F6",
        "Investice" : "#EAB308"
    },
    "" : "#ffffff"
  },
  "height": "400px",
  "theme": "g100"
}
</script>

<h1 class="h1">Graf</h1>
<div class="w-3/4">
    <ComboChart style="background:transparent" {data} {options} />
</div>
<div class="p-10"></div>