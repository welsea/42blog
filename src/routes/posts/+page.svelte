<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	export let data;
</script>

<PostList title="WRITING..." posts={data.posts}  desc="如果可以的话，写点什么吧！"/>