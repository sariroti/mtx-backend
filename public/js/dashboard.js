function getUsers() {
  $.get('/api/user', function (response) {
    response.map((r) => {
      $('#user-list tbody').append(`
      <tr>
        <th>${r.name}</th>
        <th>${r.email ? r.email : ''}</th>
        <th>${r.logins_count}</th>
        <th>${r.last_login}</th>  
        <th>${r.created_at}</th>
        
      </tr>`);
    });
  });
}

getUsers();
