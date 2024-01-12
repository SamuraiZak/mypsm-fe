<script lang="ts">
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { selectedRecordId } from '$lib/stores/globalState';
   let currentEmployee = mockEmployees.filter((rec) => rec.id == $selectedRecordId)[0];
</script>

<h2>{currentEmployee.id}</h2>
<h2>{currentEmployee.name}</h2>