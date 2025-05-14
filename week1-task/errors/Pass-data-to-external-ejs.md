## How to pass a data to external ejs file ?

### My main ejs code part

```ejs
<div>
{data.forEach(item=>{
    <h1><%=item.title %></h1>
    <p><%= item.content %></p>
})}
<div>

<% include('external.ejs')%>
```

### I have to pass item another external ejs part od this file

I have find a way on ejs documentation site

1️⃣ Pass quote When Including the Modal
Modify the file where you include option-modal.ejs:

```ejs
<% include('partials/option-modal', { quote: quote }) %>

```

Now, inside main.ejs, you can access quote.id like this:

```ejs
<button type="button" onclick="deleteItem('<%= item.id %>')">Delete</button>
```
