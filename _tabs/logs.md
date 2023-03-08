---
layout: page
icon: fas fa-pencil
order: 5
---
<ul>
  {% for log in site.logs %}
    <li>
      <a href="{{ post.url }}">{{ log}}{% include datetime.html date=log.date %}</a>
    </li>
  {% endfor %}
</ul>
