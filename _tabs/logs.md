---
layout: page
icon: fas fa-pencil
order: 5
---
<ul>
  {% for log in site.logs %}
    <li>
      <a href="{{ log.url }}">{% include datetime.html date=log.date %} --- {{ log.title }}</a>
    </li>
  {% endfor %}
</ul>
