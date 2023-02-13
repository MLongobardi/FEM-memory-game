<script>
    import { dialogStore } from "$stores";

	const formSections = [
		{
			title: "Select Theme",
			groupName: "theme",
			values: ["numbers", "icons"],
			labels: ["Numbers", "Icons"],
		},
		{
			title: "Number of Players",
			groupName: "players",
			values: [1, 2, 3, 4],
			labels: [1, 2, 3, 4],
		},
		{
			title: "Grid Size",
			groupName: "grid",
			values: [4, 6],
			labels: ["4x4", "6x6"],
		},
	];

	function handleSubmit(e) {
		const temp = new FormData(e.target);
		const data = {};
		for (let [key, value] of temp) {
			if (key != "theme") value = parseInt(value);
			data[key] = value;
		}
		console.log(data);

        $dialogStore.SETTINGS.close();
	}
</script>

<div class="settings">
	<span class="settings-title">memory</span>
	<form class="settings-form" on:submit|preventDefault={handleSubmit}>
		{#each formSections as section}
			<fieldset class={section.groupName}>
				<legend>{section.title}</legend>
				{#each section.values as value, i}
					<label>
						<input type="radio" name={section.groupName} {value} checked={i == 0} />{section.labels[
							i
						]}
					</label>
				{/each}
			</fieldset>
		{/each}

		<input type="submit" value="Start Game" />
	</form>
</div>

<style lang="scss">
	:global(dialog):has(> .settings)::backdrop,
	.settings {
		background: var(--color-4);
	}

	.settings {
		color: var(--color-8);
		width: minMaxSize(327px, 654px);
	}

	.settings-title {
		font-size: minMaxSize(32px, 40px);
		line-height: minMaxSize(40px, 50px);
		margin-bottom: minMaxSize(45px, 78px);
	}

	.settings-form {
		width: 100%;
		padding: minMaxSize(24px, 56px);
		box-sizing: border-box;
		background: var(--color-8);
		border-radius: minMaxSize(10px, 20px);
	}

	fieldset {
		padding: 0;
		border: none;
		margin: 0;
		display: flex;
		justify-content: space-between;
	}

	legend {
		color: var(--color-6);
		font-size: minMaxSize(15px, 20px);
		line-height: minMaxSize(19px, 25px);
	}

	label {
		background: var(--color-2);
		width: 48%;
		padding: 10px 0;
		margin-top: minMaxSize(11px, 16px);
		margin-bottom: minMaxSize(24px, 32px);
		border-radius: 26px;
		text-align: center;
		font-weight: 700;
		font-size: minMaxSize(16px, 26px);
		line-height: minMaxSize(20px, 32px);
		transition: background-color 0.3s;
	}
	label:hover {
		background: var(--color-7);
	}
	label:has(input:checked) {
		background: var(--color-3);
	}
	.players label {
		width: 22%;
	}
	.grid label {
		margin-bottom: 32px;
	}

	input[type="radio"] {
		width: 0;
	}

	input[type="submit"] {
		background: var(--color-1);
		color: inherit;
		width: 100%;
		padding: minMaxSize(13px, 15px) 0;
		border: none;
		border-radius: minMaxSize(26px, 35px);
		font-size: minMaxSize(18px, 32px);
		line-height: minMaxSize(22px, 40px);
		transition: background-color 0.3s;
	}
	input[type="submit"]:hover {
		background: #ffb84a;
	}
</style>
