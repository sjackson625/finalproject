---
pageTitle: Artist Spotlight
date: 2019-03-01
navTitle: Artist Spotlight
pageClass: blog
---

<section>
  {% for post in collections.posts %}
  <article>
    {{ post.templateContent }} 
  </article>
  {% endfor %}
</section>
