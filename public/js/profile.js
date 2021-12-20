function saveProfile() {
  const name = $('#user-name').val();

  $.ajax({
    url: '/api/user/profile',
    type: 'PUT',
    data: { name },
    success: function (response) {
      console.log(response);
    },
  });

  alert('saved');
}
