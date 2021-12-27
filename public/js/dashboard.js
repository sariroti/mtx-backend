function getUsers() {
  $.get('/api/v1/user', function (response) {
    response.payload.map((r) => {
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

function getUserStatistic() {
  $.get('/api/v1/user/statistic', function (response) {
    $('#total-users').text(response.payload.totalUser);
    $('#total-users-today').text(response.payload.totalUserActiveToday);
    $('#total-users-last7day').text(response.payload.totalUserActiveLast7Day);
  });
}

getUsers();
getUserStatistic();
