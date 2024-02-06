<template>
  <div class="relative flex min-h-full w-full flex-col items-center bg-gray-800 p-2">
    <div class="size-full px-4 md:w-[758px]">
      <ArticleComp
        :title="'About'"
        :content="aboutHTML"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})

const aboutHTML = `
<h2 id="hello-and-welcome-to-my-website" tabindex="-1"><a class="header-anchor" href="#hello-and-welcome-to-my-website" aria-hidden="true">#</a> Hello and welcome to my website! <img class="emoji" draggable="false" alt="😄" src="https://twemoji.maxcdn.com/v/14.0.2/72x72/1f604.png"/></h2>
<p>This site is mostly about my personal blogs, notes, and other random stuff.</p>
<p>When you are reading this, the website is probably fairly bare-boned (unless I forgot to update this about page <img class="emoji" draggable="false" alt="💀" src="https://twemoji.maxcdn.com/v/14.0.2/72x72/1f480.png"/> ), but I will keep working on this site and might one day make it a real site!</p>
<h3 id="stack" tabindex="-1"><a class="header-anchor" href="#stack" aria-hidden="true">#</a> Stack</h3>
<p><a href="https://nuxt.com/">Nuxt3</a> + <a href="https://orm.drizzle.team/">DrizzleOrm</a> + <a href="https://www.mysql.com/">MySQL</a>.</p>
<p>I love how Nuxt makes full stack development so simple! <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/14.0.2/72x72/2764.png"/></p>
<p><strong>Other libraries</strong></p>
<ul>
<li>
<p><a href="https://github.com/markdown-it/markdown-it">Markdown-it</a> for <code>MD -&gt; HTML</code> parsing (what you are reading!)</p>
</li>
<li>
<p><a href="https://unocss.dev/">UnoCSS</a> for styling</p>
</li>
<li>
<p><a href="https://sidebase.io/nuxt-auth/">Nuxt-Auth</a> for basic authentication</p>
</li>
<li>
<p><a href="https://nuxt-security.vercel.app/">Nuxt-Security</a> for basic security</p>
</li>
</ul>
<p>Get the <img class="emoji" draggable="false" alt="👉" src="https://twemoji.maxcdn.com/v/14.0.2/72x72/1f449.png"/> <a href="https://github.com/smdbs01/nuxtBlog">Source code</a> <img class="emoji" draggable="false" alt="👈" src="https://twemoji.maxcdn.com/v/14.0.2/72x72/1f448.png"/> here.</p>
<h3>Contact</h3>
<ul>
<li>
<p>Discord ID: smdbs</p>
</li>
<li>
<p>Github: <a href="https://github.com/smdbs01">smdbs01</a></p>
</li>
</ul>
`

</script>