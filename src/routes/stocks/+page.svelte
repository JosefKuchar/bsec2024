<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div>
  <h1>My Blog</h1>
  <main>
    <div>
      {JSON.stringify(data.stocks)}
    </div>
  </main>
</div>
